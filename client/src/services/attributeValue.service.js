import api from "./api";

// ==============================
// Get All
// ==============================
export const getAttributeValues = async () => {
  const { data } = await api.get("/attribute-values");
  return data;
};

// ==============================
// Get Single
// ==============================
export const getAttributeValue = async (id) => {
  const { data } = await api.get(`/attribute-values/${id}`);
  return data;
};

// ==============================
// Create
// ==============================
export const createAttributeValue = async (formData) => {
  const { data } = await api.post(
    "/attribute-values",
    formData
  );

  return data;
};

// ==============================
// Update
// ==============================
export const updateAttributeValue = async (
  id,
  formData
) => {
  const { data } = await api.put(
    `/attribute-values/${id}`,
    formData
  );

  return data;
};

// ==============================
// Delete
// ==============================
export const deleteAttributeValue = async (id) => {
  const { data } = await api.delete(
    `/attribute-values/${id}`
  );

  return data;
};

// // ==============================
// // Get All Attribute Values
// // ==============================
// export const getAttributeValues = async (attributeId) => {
//   const res = await api.get(`/attribute-values/${attributeId}`);
//   return res.data;
// };