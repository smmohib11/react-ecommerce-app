import { useState } from "react";

function CategoryModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: 1,
  });

  const [image, setImage] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("status", form.status);

    if (image) {
      formData.append("image", image);
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-125 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Add Category
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Category Name"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="file"
            className="w-full border p-3 rounded mb-4"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <select
            name="status"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CategoryModal;