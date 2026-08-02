import { useEffect, useState } from "react";
import VariationGenerator from "./VariationGenerator";
import ProductForm from "./ProductForm";
import { saveVariations } from "../../services/variation.service";

function ProductModal({
  open,
  onClose,
  onSave,
  categories = [],
  brands = [],
  product = null,
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category_id: "",
    price: "",
    discount_price: "",
    stock: "",
    sku: "",
    featured: 0,
    status: 1,
    description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [variations, setVariations] = useState([]);
  const [specifications, setSpecifications] = useState([
    {
      spec_name: "",
      spec_value: "",
    },
  ]);
  const [saving, setSaving] = useState(false);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  useEffect(() => {
    if (!open) return;

    if (product) {
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        category_id: product.category_id || "",
        brand_id: product.brand_id || "",
        price: product.price || "",
        discount_price: product.discount_price || "",
        stock: product.stock || "",
        sku: product.sku || "",
        featured: product.featured ?? 0,
        status: product.status ?? 1,
        description: product.description || "",
      });

      setThumbnailPreview(product.thumbnail_url || "");

      // Preload previously saved variations so they stay
      // selected/visible when reopening an existing product.
      if (product.variations?.length > 0) {
        setVariations(
          product.variations.map((v) => ({
            id: v.id,
            sku: v.sku || "",
            price: v.price ?? form.price,
            discount_price: v.discount_price ?? "",
            stock: v.stock ?? 0,
            status: v.status ?? 1,
            image: null,
            image_url: v.image_url || v.image || null,
            attributes: v.attributes || [],
          }))
        );
      } else {
        setVariations([]);
      }

      if (product.specifications?.length > 0) {
        setSpecifications(
          product.specifications.map((s) => ({
            spec_name: s.spec_name || s.title || "",
            spec_value: s.spec_value || s.value || "",
          }))
        );
      } else {
        setSpecifications([{ spec_name: "", spec_value: "" }]);
      }
    } else {
      setForm({
        name: "",
        slug: "",
        category_id: "",
        brand_id: "",
        price: "",
        discount_price: "",
        stock: "",
        sku: "",
        featured: 0,
        status: 1,
        description: "",
      });

      setThumbnailPreview("");
      setVariations([]);
      setSpecifications([{ spec_name: "", spec_value: "" }]);
    }

    setThumbnail(null);
    setImages([]);
    setImagePreview([]);
  }, [open, product]);

  if (!open) return null;

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnail(null);
      setThumbnailPreview("");
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!form.category_id) {
      alert("Select Category");
      return;
    }

    if (!form.price) {
      alert("Price is required");
      return;
    }

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      setSaving(true);

      // Save Product
      const savedProduct = await onSave(data);

      const productId =
        savedProduct?.id ||
        savedProduct?.data?.id ||
        savedProduct?.product?.id ||
        product?.id;

      // Save Variations
      if (variations.length > 0 && productId) {
        await saveVariations({
          product_id: productId,
          variations,
        });
      }

      alert("Saved Successfully");

      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Save Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  // Generate Variations
  const handleGenerateVariations = (rows) => {
    const generated = rows.map((row) => ({
      sku: row
        .map((x) => x.value)
        .join("-")
        .toUpperCase(),

      price: form.price,

      discount_price: form.discount_price,

      stock: form.stock,

      status: 1,

      image: null,

      attributes: row,
    }));

    setVariations(generated);
  };

  // Add Specification
  const addSpecification = () => {
    setSpecifications([
      ...specifications,
      {
        spec_name: "",
        spec_value: "",
      },
    ]);
  };

  // Remove Specification
  const removeSpecification = (index) => {
    const list = [...specifications];
    list.splice(index, 1);
    setSpecifications(list);
  };

  // Update Specification
  const updateSpecification = (index, field, value) => {
    const list = [...specifications];

    list[index][field] = value;

    setSpecifications(list);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[700px] max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-5">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="brand_id"
            value={form.brand_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Brand</option>

            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              min="0"
              step="0.01"
              name="discount_price"
              value={form.discount_price}
              onChange={handleChange}
              placeholder="Discount Price"
              className="border rounded-lg p-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={form.sku}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-medium">Thumbnail</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt=""
                className="w-32 h-32 mt-3 rounded-lg border object-cover"
              />
            )}
          </div>

          <div>
            <label className="font-medium">Gallery Images</label>

            <input
              multiple
              accept="image/*"
              type="file"
              onChange={handleImagesChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

            <div className="flex gap-3 flex-wrap mt-3">
              {imagePreview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-24 h-24 rounded-lg border object-cover"
                />
              ))}
            </div>
          </div>

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="border rounded-xl p-5">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-bold">
                Product Specifications
              </h2>

              <button
                type="button"
                onClick={addSpecification}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                + Add
              </button>

            </div>

            {specifications.map((item, index) => (

              <div
                key={index}
                className="grid grid-cols-5 gap-3 mb-3"
              >

                <input
                  className="border rounded-lg p-2 col-span-2"
                  placeholder="Specification Name"
                  value={item.spec_name}
                  onChange={(e) =>
                    updateSpecification(
                      index,
                      "spec_name",
                      e.target.value
                    )
                  }
                />

                <input
                  className="border rounded-lg p-2 col-span-2"
                  placeholder="Specification Value"
                  value={item.spec_value}
                  onChange={(e) =>
                    updateSpecification(
                      index,
                      "spec_value",
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    removeSpecification(index)
                  }
                  className="bg-red-500 text-white rounded"
                >
                  X
                </button>

              </div>

            ))}

          </div>

          <VariationGenerator onGenerate={handleGenerateVariations} />

          {variations.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Generated Variations</h2>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Variation</th>
                      <th className="border p-2">Image</th>
                      <th className="border p-2">SKU</th>

                      <th className="border p-2">Price</th>

                      <th className="border p-2">Discount</th>

                      <th className="border p-2">Stock</th>

                      <th className="border p-2">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {variations.map((item, index) => (
                      <tr key={index}>
                        <td className="border p-2">
                          {item.attributes.map((x) => x.value).join(" / ")}
                        </td>
                        <td className="border p-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];

                              if (!file) return;

                              const list = [...variations];

                              list[index].image = file;

                              setVariations(list);
                            }}
                          />

                          {item.image ? (
                            <img
                              src={URL.createObjectURL(item.image)}
                              alt=""
                              className="w-16 h-16 mt-2 rounded border object-cover"
                            />
                          ) : item.image_url ? (
                            <img
                              src={item.image_url}
                              alt=""
                              className="w-16 h-16 mt-2 rounded border object-cover"
                            />
                          ) : null}
                        </td>

                        <td className="border p-2">
                          <input
                            className="border rounded px-2 py-1 w-full"
                            value={item.sku}
                            onChange={(e) => {
                              const list = [...variations];
                              list[index].sku = e.target.value;
                              setVariations(list);
                            }}
                          />
                        </td>

                        <td className="border p-2">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            value={item.price}
                            onChange={(e) => {
                              const list = [...variations];
                              list[index].price = Number(e.target.value);
                              setVariations(list);
                            }}
                          />
                        </td>

                        <td className="border p-2">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            value={item.discount_price}
                            onChange={(e) => {
                              const list = [...variations];
                              list[index].discount_price = Number(e.target.value);
                              setVariations(list);
                            }}
                          />
                        </td>

                        <td className="border p-2">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            value={item.stock}
                            onChange={(e) => {
                              const list = [...variations];
                              list[index].stock = Number(e.target.value);
                              setVariations(list);
                            }}
                          />
                        </td>

                        <td className="border p-2">
                          <select
                            value={item.status}
                            className="border rounded px-2 py-1 w-full"
                            onChange={(e) => {
                              const list = [...variations];
                              list[index].status = Number(e.target.value);
                              setVariations(list);
                            }}
                          >
                            <option value={1}>Active</option>

                            <option value={0}>Inactive</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <select
              name="featured"
              value={form.featured}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value={1}>Featured</option>
              <option value={0}>Not Featured</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

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
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 disabled:bg-gray-400 text-white"
            >
              {saving
                ? "Saving..."
                : product
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;