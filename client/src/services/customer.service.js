import api from "./api";

export const getCustomers = async () => {
  const res = await api.get("/customers");
  return res.data;
};