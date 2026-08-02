import api from "./api";

// ==============================
// Get Profile
// ==============================
export const getProfile = () => {
  return api.get("/profile");
};

export const updateProfile = (data) =>
  api.put("/profile", data);

export const changePassword = (data) =>
  api.put("/profile/password", data);

// // ==============================
// // Update Profile
// // ==============================
// export const updateProfile = async (data) => {
//   const res = await api.put("/profile", data);
//   return res.data;
// };

// // ==============================
// // Change Password
// // ==============================
// export const changePassword = async (data) => {
//   const res = await api.put("/profile/password", data);
//   return res.data;
// };

// // ==============================
// // Upload Profile Image
// // ==============================
// export const uploadProfileImage = async (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   const res = await api.post("/profile/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return res.data;
// };