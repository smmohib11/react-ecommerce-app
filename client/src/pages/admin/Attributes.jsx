import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../components/layout/AdminLayout";
import AttributeTable from "../../components/attribute/AttributeTable";
import AttributeModal from "../../components/attribute/AttributeModal";

import {
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../../services/attribute.service";

function Attributes() {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingAttribute, setEditingAttribute] = useState(null);

  // ============================
  // Load Attributes
  // ============================

  const loadAttributes = async () => {
    try {
      setLoading(true);

      const res = await getAttributes();

      setAttributes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Save
  // ============================

  const handleSave = async (formData) => {
    try {
      let res;

      if (editingAttribute) {
        res = await updateAttribute(
          editingAttribute.id,
          formData
        );
      } else {
        res = await createAttribute(formData);
      }

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: editingAttribute
            ? "Attribute Updated"
            : "Attribute Created",
          timer: 1500,
          showConfirmButton: false,
        });

        setOpenModal(false);
        setEditingAttribute(null);

        loadAttributes();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: err.message,
      });
    }
  };

  // ============================
  // Delete
  // ============================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Attribute?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteAttribute(id);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        loadAttributes();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message,
      });
    }
  };

  // ============================
  // Edit
  // ============================

  const handleEdit = (item) => {
    setEditingAttribute(item);
    setOpenModal(true);
  };

  // ============================
  // Close Modal
  // ============================

  const handleClose = () => {
    setEditingAttribute(null);
    setOpenModal(false);
  };

  // ============================

  useEffect(() => {
    loadAttributes();
  }, []);

  // ============================

  const filteredAttributes = attributes.filter((item) =>
    (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  <>

    <div className="flex justify-between items-center mb-6">

      <input
        type="text"
        placeholder="Search Attribute..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 w-80"
      />

      <button
        onClick={() => {
          setEditingAttribute(null);
          setOpenModal(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        + Add Attribute
      </button>

    </div>

    <div className="bg-white rounded-xl shadow">

      {loading ? (

        <div className="flex justify-center items-center h-40">

          <div className="text-lg animate-pulse">
            Loading...
          </div>

        </div>

      ) : (

        <AttributeTable
          attributes={filteredAttributes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

    </div>

    <AttributeModal
      open={openModal}
      onClose={handleClose}
      onSave={handleSave}
      attribute={editingAttribute}
    />

  </>
);
}

export default Attributes;