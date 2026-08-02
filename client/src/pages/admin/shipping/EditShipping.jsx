import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowLeft, Save } from "lucide-react";

import {
  getShipping,
  updateShipping,
} from "../../../services/shipping.service";

function EditShipping() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    courier_name: "",
    inside_city: "",
    outside_city: "",
    charge: "",
    min_order: "",
    free_shipping: 0,
    delivery_days: "",
    sort_order: 1,
    status: 1,
  });

  useEffect(() => {
    loadShipping();
  }, []);

  const loadShipping = async () => {
    try {
      const res = await getShipping(id);

      const data = res.data.data || res.data;

      setForm({
        name: data.name || "",
        courier_name: data.courier_name || "",
        inside_city: data.inside_city || "",
        outside_city: data.outside_city || "",
        charge: data.charge || "",
        min_order: data.min_order || "",
        free_shipping: Number(data.free_shipping),
        delivery_days: data.delivery_days || "",
        sort_order: data.sort_order || 1,
        status: Number(data.status),
      });
    } catch (err) {
      console.log(err);

      Swal.fire(
        "Error",
        "Shipping data not found.",
        "error"
      );

      navigate("/admin/shipping");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateShipping(id, form);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/shipping");
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.message ||
          err.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Edit Shipping
          </h1>

          <p className="text-gray-500">
            Update shipping information
          </p>

        </div>

        <Link
          to="/admin/shipping"
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow border p-8 space-y-6"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium">
              Shipping Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-medium">
              Courier Name
            </label>

            <input
              type="text"
              name="courier_name"
              value={form.courier_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
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
              className="w-full border rounded-lg px-4 py-3 mt-2"
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
              className="w-full border rounded-lg px-4 py-3 mt-2"
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
              className="w-full border rounded-lg px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Free Shipping Above
            </label>

            <input
              type="number"
              name="min_order"
              value={form.min_order}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
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
              className="w-full border rounded-lg px-4 py-3 mt-2"
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
              className="w-full border rounded-lg px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Free Shipping
            </label>

            <select
              name="free_shipping"
              value={form.free_shipping}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
            >
              <option value={1}>Enabled</option>
              <option value={0}>Disabled</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

        </div>

        <div className="pt-4">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2"
          >
            <Save size={18} />
            Update Shipping
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditShipping;