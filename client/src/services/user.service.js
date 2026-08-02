import api from "./api";

// ==============================
// Get All Users
// ==============================
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// ==============================
// Get Single User
// ==============================
export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// ==============================
// Update User
// ==============================
export const updateUser = async (id, data) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

// ==============================
// Delete User
// ==============================
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// ==============================
// Change Role
// ==============================
export const changeRole = async (id, role) => {
  const res = await api.put(`/users/${id}/role`, {
    role,
  });

  return res.data;
};

// ==============================
// Change Status
// ==============================
export const changeStatus = async (id, status) => {
  const res = await api.put(`/users/${id}/status`, {
    status,
  });

  return res.data;
};