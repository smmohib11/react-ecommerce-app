import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Truck,
} from "lucide-react";
import {
  getShippingList,
  deleteShipping,
  changeShippingStatus,
} from "../../../services/shipping.service";

function ShippingList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadShipping();
  }, []);

  const loadShipping = async () => {
  try {
    setLoading(true);

    const res = await getShippingList();

    const list = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    setShipping(list);

  } catch (err) {
    console.log(err);
    setShipping([]);
  } finally {
    setLoading(false);
  }
};
  // ===========================
  // Edit
  // ===========================

  const handleEdit = (id) => {
    navigate(`/admin/shipping/edit/${id}`);
  };

  // ===========================
  // Delete
  // ===========================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Shipping Method?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteShipping(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadShipping();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const filteredData = Array.isArray(shipping)
  ? shipping.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
  : [];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Shipping Charges
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Courier & Delivery Charges
          </p>
        </div>

        <Link
          to="/admin/shipping/add"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          <Plus size={18} />
          Add Shipping
        </Link>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow border p-4">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search courier..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-3"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-4">Courier</th>
              <th className="p-4">Inside City</th>
              <th className="p-4">Outside City</th>
              <th className="p-4">Free Shipping</th>
              <th className="p-4">Delivery Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredData.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400"
                >
                  No Shipping Found
                </td>

              </tr>

            ) : (

              filteredData.map((item) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                        <Truck
                          size={18}
                          className="text-blue-600"
                        />

                      </div>

                      <div>

                        <div className="font-semibold">
                          {item.name}
                        </div>

                        <div className="text-sm text-gray-500">
                          {item.courier_name}
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    ৳ {item.inside_city}
                  </td>

                  <td className="p-4">
                    ৳ {item.outside_city}
                  </td>

                  <td className="p-4">

                    {item.free_shipping == 1
                      ? `Above ৳${item.min_order}`
                      : "No"}

                  </td>

                  <td className="p-4">
                    {item.delivery_days} Days
                  </td>

                  <td className="p-4">

                    {item.status == 1 ? (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>

                    ) : (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Inactive
                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleEdit(item.id)}
                        className="w-9 h-9 rounded bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-9 h-9 rounded bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ShippingList;