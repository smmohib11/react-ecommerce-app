import api from "./api";

// ==========================
// Get All
// ==========================
export const getAttributes = async () => {
  const { data } = await api.get("/attributes");
  return data;
};

// ==========================
// Get Single
// ==========================
export const getAttribute = async (id) => {
  const { data } = await api.get(`/attributes/${id}`);
  return data;
};

// ==========================
// Create
// ==========================
export const createAttribute = async (formData) => {
  const { data } = await api.post("/attributes", formData);
  return data;
};

// ==========================
// Update
// ==========================
export const updateAttribute = async (id, formData) => {
  const { data } = await api.put(`/attributes/${id}`, formData);
  return data;
};

// ==========================
// Delete
// ==========================
export const deleteAttribute = async (id) => {
  const { data } = await api.delete(`/attributes/${id}`);
  return data;
};
// ==========================
// Get All Attributes
// ==========================
export const getAllAttributes = async () => {
  const res = await api.get("/attributes");
  return res.data;
};