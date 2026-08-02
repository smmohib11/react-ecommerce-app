import api from "./api";

// Get All Shipping
export const getShippingList = () => {
  return api.get("/shipping");
};

// Get Single Shipping
export const getShipping = (id) => {
  return api.get(`/shipping/${id}`);
};

// Add Shipping
export const addShipping = (data) => {
  return api.post("/shipping", data);
};

// Update Shipping
export const updateShipping = (id, data) => {
  return api.put(`/shipping/${id}`, data);
};

// Delete Shipping
export const deleteShipping = (id) => {
  return api.delete(`/shipping/${id}`);
};

// Change Status
export const changeShippingStatus = (id) => {
  return api.patch(`/shipping/status/${id}`);
};