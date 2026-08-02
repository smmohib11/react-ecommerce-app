import api from "./api";

// Get All
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

// Get One
export const getCategory = async (id) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

// Create
export const createCategory = async (formData) => {
  const res = await api.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Update
export const updateCategory = async (id, formData) => {
  const res = await api.put(`/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Delete
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};