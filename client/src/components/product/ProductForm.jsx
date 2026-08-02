import { useEffect, useState } from "react";

function ProductForm({
  onSubmit,
  categories = [],
  brands = [],
  product = null,
  loading = false,
}) {

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    brand_id: "",
    sku: "",
    price: "",
    sale_price: "",
    stock: "",
    short_description: "",
    description: "",
    status: "active",
    featured: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category_id: product.category_id || "",
        brand_id: product.brand_id || "",
        sku: product.sku || "",
        price: product.price || "",
        sale_price: product.sale_price || "",
        stock: product.stock || "",
        short_description: product.short_description || "",
        description: product.description || "",
        status: product.status || "active",
        featured: product.featured || false,
      });
    }
  }, [product]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    onSubmit(data);
  };

  return (

<form
onSubmit={handleSubmit}
className="space-y-6"
>

<div className="grid grid-cols-2 gap-6">

<div>

<label>Name</label>

<input
type="text"
name="name"
value={form.name}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>SKU</label>

<input
type="text"
name="sku"
value={form.sku}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>Category</label>

<select
name="category_id"
value={form.category_id}
onChange={handleChange}
className="w-full border rounded-lg p-2"
>

<option value="">
Select Category
</option>

{categories.map(cat=>(
<option
key={cat.id}
value={cat.id}
>
{cat.name}
</option>
))}

</select>

</div>

<div>

<label>Brand</label>

<select
name="brand_id"
value={form.brand_id}
onChange={handleChange}
className="w-full border rounded-lg p-2"
>

<option value="">
Select Brand
</option>

{brands.map(item=>(
<option
key={item.id}
value={item.id}
>
{item.name}
</option>
))}

</select>

</div>

<div>

<label>Price</label>

<input
type="number"
name="price"
value={form.price}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>Sale Price</label>

<input
type="number"
name="sale_price"
value={form.sale_price}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>Stock</label>

<input
type="number"
name="stock"
value={form.stock}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>Status</label>

<select
name="status"
value={form.status}
onChange={handleChange}
className="w-full border rounded-lg p-2"
>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>

</select>

</div>

</div>

<div>

<label>Short Description</label>

<textarea
rows="3"
name="short_description"
value={form.short_description}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>Description</label>

<textarea
rows="6"
name="description"
value={form.description}
onChange={handleChange}
className="w-full border rounded-lg p-2"
/>

</div>

<div>

<label>Thumbnail</label>

<input
type="file"
accept="image/*"
onChange={(e)=>
setThumbnail(
e.target.files[0]
)
}
/>

</div>

<div>

<label>Gallery Images</label>

<input
type="file"
multiple
accept="image/*"
onChange={(e)=>
setImages(e.target.files)
}
/>

</div>

<div>

<label className="flex gap-2">

<input
type="checkbox"
name="featured"
checked={form.featured}
onChange={handleChange}
/>

Featured Product

</label>

</div>

<button
type="submit"
disabled={loading}
className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
>

{loading
? "Saving..."
: product
? "Update Product"
: "Create Product"}

</button>

</form>

  );
}

export default ProductForm;