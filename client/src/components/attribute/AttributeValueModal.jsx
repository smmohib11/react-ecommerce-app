import { useEffect, useState } from "react";

function AttributeValueModal({
  open,
  onClose,
  onSave,
  attributes = [],
  attributeValue = null,
}) {
  const [form, setForm] =useState({
    attribute_id: "",
    value: "",
    slug: "",
    status: 1,
    sort_order: 0,
  });

  useEffect(() => {
    if (!open) return;

    if (attributeValue) {
      setForm({
        attribute_id: attributeValue.attribute_id || "",
        value: attributeValue.value || "",
        slug: attributeValue.slug || "",
        status: attributeValue.status ?? 1,
        sort_order: attributeValue.sort_order ?? 0,
      });
    } else {
      setForm({
        attribute_id: "",
        value: "",
        slug: "",
        status: 1,
        sort_order: 0,
      });
    }
  }, [open, attributeValue]);

  if (!open) return null;

  // Auto Generate Slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[520px] p-6">

        <h2 className="text-2xl font-bold mb-5">
          {attributeValue ? "Edit Attribute Value" : "Add Attribute Value"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            className="w-full border p-3 rounded"
            value={form.attribute_id}
            onChange={(e) =>
              setForm({
                ...form,
                attribute_id: Number(e.target.value),
              })
            }
            required
          >
            <option value="">Select Attribute</option>

            {attributes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Value"
            className="w-full border p-3 rounded"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: e.target.value,
                slug: generateSlug(e.target.value),
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Slug"
            className="w-full border p-3 rounded"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Sort Order"
            className="w-full border p-3 rounded"
            value={form.sort_order}
            onChange={(e) =>
              setForm({
                ...form,
                sort_order: Number(e.target.value),
              })
            }
          />

          <select
            className="w-full border p-3 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: Number(e.target.value),
              })
            }
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white"
            >
              {attributeValue ? "Update" : "Save"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AttributeValueModal;