import api from "./api";

// Get All Products
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

// Get Single Product
export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// Create Product
export const createProduct = async (formData) => {
  const res = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Update Product
export const updateProduct = async (id, formData) => {
  const res = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
// Get Product Details  

export async function getProductDetails(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}