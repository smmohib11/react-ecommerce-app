import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import UserTable from "../../components/user/UserTable";
import UserModal from "../../components/user/UserModal";

import {
  getUsers,
  updateUser,
  deleteUser,
  changeRole,
  changeStatus,
} from "../../services/user.service";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  // ============================
  // Load Users
  // ============================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers();

      setUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ============================
  // Update User
  // ============================

  const handleSave = async (formData) => {
    try {
      const res = await updateUser(
        editingUser.id,
        formData
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "User Updated",
          timer: 1200,
          showConfirmButton: false,
        });

        setOpenModal(false);
        setEditingUser(null);

        loadUsers();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  // ============================
  // Delete
  // ============================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteUser(id);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1200,
          showConfirmButton: false,
        });

        loadUsers();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  // ============================
  // Change Role
  // ============================

  const handleRoleChange = async (id, role) => {
    try {
      const res = await changeRole(id, role);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          timer: 1000,
          showConfirmButton: false,
        });

        loadUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // Change Status
  // ============================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      const res = await changeStatus(
        id,
        status
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          timer: 1000,
          showConfirmButton: false,
        });

        loadUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // Edit
  // ============================

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  // ============================
  // Search
  // ============================

  const filteredUsers = users
    .filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.role?.toLowerCase().includes(keyword)
      );
    })
    .sort((a, b) => {
      const order = {
        super_admin: 1,
        admin: 2,
        manager: 3,
        customer: 4,
      };

      return (
        (order[a.role] || 99) -
        (order[b.role] || 99)
      );
    });

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-80"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow">

        {loading ? (

          <div className="h-40 flex justify-center items-center">
            Loading...
          </div>

        ) : (

          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
            onStatusChange={handleStatusChange}
          />

        )}

      </div>

      {/* Modal */}

      <UserModal
        open={openModal}
        user={editingUser}
        onClose={() => {
          setEditingUser(null);
          setOpenModal(false);
        }}
        onSave={handleSave}
      />

    </div>
  );
}

export default Users;