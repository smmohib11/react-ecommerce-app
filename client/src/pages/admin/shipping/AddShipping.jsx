import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../services/api";

function AddShipping() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    courier_name: "",
    inside_city: "",
    outside_city: "",
    charge: "",
    min_order: "",
    free_shipping: 0,
    delivery_days: "",
    sort_order: 0,
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked ? 1 : 0
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      return Swal.fire(
        "Warning",
        "Shipping Name Required",
        "warning"
      );
    }

    try {
      setLoading(true);

      await api.post("/shipping", form);

      Swal.fire({
        icon: "success",
        title: "Shipping Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/shipping");

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Something went wrong",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-xl shadow border">

        <div className="border-b px-6 py-4">

          <h1 className="text-2xl font-bold">
            Add Shipping
          </h1>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-medium">
                Shipping Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Inside Dhaka"
              />
            </div>

            <div>
              <label className="font-medium">
                Courier Name
              </label>

              <input
                name="courier_name"
                value={form.courier_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="SteadFast"
              />
            </div>

            <div>
              <label className="font-medium">
                Inside City Charge
              </label>

              <input
                type="number"
                name="inside_city"
                value={form.inside_city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Outside City Charge
              </label>

              <input
                type="number"
                name="outside_city"
                value={form.outside_city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Default Charge
              </label>

              <input
                type="number"
                name="charge"
                value={form.charge}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Free Shipping Minimum Order
              </label>

              <input
                type="number"
                name="min_order"
                value={form.min_order}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Delivery Days
              </label>

              <input
                type="number"
                name="delivery_days"
                value={form.delivery_days}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Sort Order
              </label>

              <input
                type="number"
                name="sort_order"
                value={form.sort_order}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

          </div>

          <div className="flex gap-8">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                name="free_shipping"
                checked={form.free_shipping}
                onChange={handleChange}
              />

              Free Shipping

            </label>

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.checked ? 1 : 0,
                  })
                }
              />

              Active

            </label>

          </div>

          <div className="flex gap-4">

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Saving..." : "Save Shipping"}
            </button>

            <button
              type="reset"
              className="border px-8 py-3 rounded-lg"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddShipping;

// function AddShipping() {
//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold">
//         Add Shipping
//       </h1>

//     </div>
//   );
// }

// export default AddShipping;