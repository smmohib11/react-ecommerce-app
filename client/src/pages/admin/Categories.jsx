import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../components/layout/AdminLayout";
import CategoryTable from "../../components/category/CategoryTable";
import CategoryModal from "../../components/category/CategoryModal";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../services/category.service";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Load Categories
  const loadCategories = async () => {
    try {
      setLoading(true);

      const res = await getCategories();

      // Change this if your API response is different
      setCategories(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Add Category
  const handleSave = async (formData) => {
    try {
      const res = await createCategory(formData);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Category Created",
          timer: 1500,
          showConfirmButton: false,
        });

        setOpenModal(false);
        loadCategories();
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Create Failed",
        text: error.message,
      });
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteCategory(id);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        loadCategories();
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message,
      });
    }
  };

  // Search Filter
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <>
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
        Categories
      </h1>

      <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        + Add Category
      </button>
    </div>

    {/* Search */}
    <div className="mb-5">
      <input
        type="text"
        placeholder="Search Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 w-80"
      />
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl shadow">
      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onEdit={(item) => console.log(item)}
          onDelete={handleDelete}
        />
      )}
    </div>

    <CategoryModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSave={handleSave}
    />
  </>
);
}

export default Categories;