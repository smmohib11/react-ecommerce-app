import api from "./api";

// Generate Variations
export const generateVariations = async (data) => {
  const res = await api.post("/variations/generate", data);
  return res.data;
};

// Get Product Variations
export const getVariations = async (productId) => {
  const res = await api.get(`/variations/${productId}`);
  return res.data;
};

// Delete Variation
export const deleteVariation = async (id) => {
  const res = await api.delete(`/variations/${id}`);
  return res.data;
};
// Save Variations
export const saveVariations = async (data) => {
  const res = await api.post("/variations/save", data);
  return res.data;
};
