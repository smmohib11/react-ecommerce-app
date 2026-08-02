import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  getAttributeValues,
  deleteAttributeValue,
  createAttributeValue,
  updateAttributeValue,
} from "../../services/attributeValue.service";


import { getAttributes } from "../../services/attribute.service";

import AttributeValueTable from "../../components/attribute/AttributeValueTable";
import AttributeValueModal from "../../components/attribute/AttributeValueModal";

function AttributeValues() {
  const [attributeValues, setAttributeValues] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // ===========================
  // Load Attribute Values
  // ===========================
  const loadAttributeValues = async () => {
    try {
      const res = await getAttributeValues();
      setAttributeValues(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Load Attributes
  // ===========================
  const loadAttributes = async () => {
    try {
      const res = await getAttributes();
      setAttributes(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAttributeValues();
    loadAttributes();
  }, []);

  // ===========================
  // Save
  // ===========================
  const handleSave = async (form) => {
    try {
      if (editingData) {
        await updateAttributeValue(editingData.id, form);

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        await createAttributeValue(form);

        Swal.fire({
          icon: "success",
          title: "Created Successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      }

      setOpenModal(false);
      setEditingData(null);

      loadAttributeValues();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  // ===========================
  // Delete
  // ===========================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete?",
      text: "You won't be able to recover this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAttributeValue(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadAttributeValues();
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Search
  // ===========================
  const filtered = attributeValues.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.attribute_name?.toLowerCase().includes(keyword) ||
      item.value?.toLowerCase().includes(keyword) ||
      item.slug?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Attribute Values</h1>

        <button
          onClick={() => {
            setEditingData(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Attribute Value
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-3 w-80 mb-6"
      />

      <AttributeValueTable
        values={filtered}
        onEdit={(item) => {
          setEditingData(item);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      <AttributeValueModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingData(null);
        }}
        onSave={handleSave}
        attributes={attributes}
        attributeValue={editingData}
      />
    </div>
  );
}

export default AttributeValues;