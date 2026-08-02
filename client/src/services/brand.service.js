import api from "./api";

// Get All
export const getBrands = async () => {
  const res = await api.get("/brands");
  return res.data;
};

// Get One
export const getBrand = async (id) => {
  const res = await api.get(`/brands/${id}`);
  return res.data;
};

// Create
export const createBrand = async (formData) => {
  const res = await api.post("/brands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Update
export const updateBrand = async (id, formData) => {
  const res = await api.put(`/brands/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Delete
export const deleteBrand = async (id) => {
  const res = await api.delete(`/brands/${id}`);
  return res.data;
};