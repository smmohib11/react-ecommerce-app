import api from "./api";

export const getCart = async (userId) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const addToCart = async (data) => {
  const response = await api.post("/cart", data);
  return response.data;
};

export const updateCart = async (id, data) => {
  const response = await api.put(`/cart/${id}`, data);
  return response.data;
};

export const removeCart = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};