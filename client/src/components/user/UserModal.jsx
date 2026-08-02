import { useEffect, useState } from "react";

function UserModal({
  open,
  onClose,
  onSave,
  user,
}) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    role: "customer",
    status: 1,
    image: "",
  });

  useEffect(() => {

    if (user) {

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        role: user.role || "customer",
        status: user.status ?? 1,
        image: user.image || "",
      });

    }

  }, [user]);

  if (!open) return null;

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave(form);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-lg"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-lg"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-3 rounded-lg"
          />

          <div className="col-span-2">

            <textarea
              rows={3}
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-3 rounded-lg w-full"
            />

          </div>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="customer">
              Customer
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="super_admin">
              Super Admin
            </option>

          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value={1}>
              Active
            </option>

            <option value={0}>
              Inactive
            </option>

          </select>

          <div className="col-span-2 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Update User
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default UserModal;