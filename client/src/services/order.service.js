import api from "./api";

// Create Order
export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// Get All Orders
export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// Get Single Order
export const getOrder = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

// Update Order Status
export const updateOrderStatus = async (id, status) => {
  const res = await api.put(`/orders/${id}/status`, {
    order_status: status,
  });

  return res.data;
};

// Delete Order
export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

// Update Order Shipping Cost

export const updateOrderShipping = (id, shipping_cost) =>
  api.patch(`/orders/shipping/${id}`, { shipping_cost });