import { useEffect, useState } from "react";
import { getBrands } from "../../services/brand.service";
import AdminLayout from "../../components/layout/AdminLayout";
import ProductTable from "../../components/product/ProductTable";
import ProductModal from "../../components/product/ProductModal";
import Swal from "sweetalert2";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/product.service";

import { getCategories } from "../../services/category.service";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadProducts();

    loadCategories();
    loadBrands();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setEditingProduct(null);
    setOpenModal(false);
  };

  // =============================
  // Load Products
  // =============================
  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();

      // Change if your API response is different
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Load Categories
  // =============================
  const loadCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =============================
  // Create Product
  // =============================

  const handleSave = async (formData) => {
    try {
      let res;

      if (editingProduct) {
        // Update Product
        res = await updateProduct(editingProduct.id, formData);
      } else {
        // Create Product
        res = await createProduct(formData);
      }

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: editingProduct ? "Product Updated" : "Product Created",
          timer: 1500,
          showConfirmButton: false,
        });

        setOpenModal(false);
        setEditingProduct(null);

        await loadProducts();

        // important
        return res;
      }

      return null;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.message,
      });

      throw error;
    }
  };

  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((item) =>
    (item.name || "").toLowerCase().includes(search.toLowerCase()),
  );
  // =============================
  // Delete Product
  // =============================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteProduct(id);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        loadProducts();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message,
      });
    }
  };

  //////Load BArand
  const loadBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setOpenModal(false);
  };

  // =============================
  // First Load
  // =============================

  return (
    <>
      {/* ================= Header ================= */}
      <div className="bg-white rounded-xl border p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>

            <p className="text-gray-500 mt-1">
              Manage all your products from here.
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* ================= Statistics ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <Card title="Total Products" value={products.length} />

        <Card title="Active" value={products.filter((x) => x.status).length} />

        <Card
          title="Featured"
          value={products.filter((x) => x.featured).length}
        />

        <Card
          title="Out Of Stock"
          value={products.filter((x) => x.stock === 0).length}
        />
      </div>

      {/* ================= Search & Filter ================= */}
      <div className="bg-white border rounded-xl p-5 mb-6">
        {/* Search + Filter Row */}
      </div>

      {/* ================= Product Table ================= */}
      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ================= Modal ================= */}
      <ProductModal
        open={openModal}
        onClose={handleClose}
        onSave={handleSave}
        product={editingProduct}
        categories={categories}
        brands={brands}
        loading={loading}
      />
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </div>
  );
}
export default Products;
