import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../components/layout/AdminLayout";
import BrandTable from "../../components/brand/BrandTable";
import BrandModal from "../../components/brand/BrandModal";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../services/brand.service";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [search, setSearch] = useState("");

  // ===============================
  // Load Brands
  // ===============================

  const loadBrands = async () => {
    try {
      setLoading(true);

      const res = await getBrands();

      setBrands(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  // ===============================
  // Search
  // ===============================

  const filteredBrands = brands.filter((item) =>
    (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ===============================
  // Edit
  // ===============================

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setOpenModal(true);
  };

  // ===============================
  // Close Modal
  // ===============================

  const handleClose = () => {
    setEditingBrand(null);
    setOpenModal(false);
  };

  // ===============================
  // Save
  // ===============================

  const handleSave = async (formData) => {
    try {

      let res;

      if (editingBrand) {
        res = await updateBrand(editingBrand.id, formData);
      } else {
        res = await createBrand(formData);
      }

      if (res.success) {

        Swal.fire({
          icon: "success",
          title: editingBrand
            ? "Brand Updated"
            : "Brand Created",
          timer: 1500,
          showConfirmButton: false,
        });

        handleClose();

        loadBrands();
      }

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: err.message,
      });

    }
  };

  // ===============================
  // Delete
  // ===============================

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete Brand?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {

      const res = await deleteBrand(id);

      if (res.success) {

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        loadBrands();
      }

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message,
      });

    }
  };

  return (
    <>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search Brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-80"
        />

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Brand
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow">

        {loading ? (

          <div className="flex justify-center items-center h-40">
            <div className="text-lg animate-pulse">
              Loading Brands...
            </div>
          </div>

        ) : (

          <BrandTable
            brands={filteredBrands}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        )}

      </div>

      {/* Modal */}

      <BrandModal
        open={openModal}
        onClose={handleClose}
        onSave={handleSave}
        brand={editingBrand}
      />

    </>
  );
}

export default Brands;