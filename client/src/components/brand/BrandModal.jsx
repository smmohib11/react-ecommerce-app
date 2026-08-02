import { useEffect, useState } from "react";

function BrandModal({
  open,
  onClose,
  onSave,
  brand,
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: 1,
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!open) return;

    if (brand) {
      setForm({
        name: brand.name || "",
        slug: brand.slug || "",
        status: brand.status ?? 1,
      });

      setPreview(
        brand.logo
          ? `http://localhost:5000${brand.logo}`
          : ""
      );
    } else {
      setForm({
        name: "",
        slug: "",
        status: 1,
      });

      setPreview("");
    }

    setLogo(null);

  }, [open, brand]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setForm({
        ...form,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-"),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogo(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("slug", form.slug);
    data.append("status", form.status);

    if (logo) {
      data.append("logo", logo);
    }

    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[500px] p-6">

        <h2 className="text-2xl font-bold mb-5">
          {brand ? "Edit Brand" : "Add Brand"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Brand Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div>

            <label className="font-medium">
              Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogo}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          {preview && (
            <div>
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded border"
              />
            </div>
          )}

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              {brand ? "Update Brand" : "Save Brand"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BrandModal;