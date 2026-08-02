import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

import {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrderStatus,
  updateOrderShipping,
} from "../../services/order.service";

import OrderTable from "../../components/admin/OrderTable";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";

function Orders() {

  const [searchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Filter State
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchPhone, setSearchPhone] = useState("");

  // Load Orders
  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const status =
      searchParams.get("status") || "all";

    setStatusFilter(status);
  }, [searchParams]);

  // ===========================
  // Statistics
  // ===========================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.order_status === "pending",
  ).length;

  const confirmedOrders = orders.filter(
    (o) => o.order_status === "confirmed",
  ).length;

  const processingOrders = orders.filter(
    (o) => o.order_status === "processing",
  ).length;

  const shippingOrders = orders.filter(
    (o) => o.order_status === "shipping",
  ).length;

  const completedOrders = orders.filter(
    (o) => o.order_status === "completed" || o.order_status === "delivered",
  ).length;

  const cancelledOrders = orders.filter(
    (o) => o.order_status === "cancelled",
  ).length;

  // ===========================
  // Filter Orders
  // ===========================

  const filteredOrders = orders.filter((order) => {
    // Status Filter
    let statusMatch = true;

    if (statusFilter !== "all") {
      if (statusFilter === "completed") {
        statusMatch =
          order.order_status === "completed" ||
          order.order_status === "delivered";
      } else {
        statusMatch =
          order.order_status === statusFilter;
      }
    }

    // Search (Phone / Name / Order Number)

    const keyword = searchPhone
      .trim()
      .toLowerCase();

    const phoneMatch =
      (order.customer_phone || "")
        .toLowerCase()
        .includes(keyword) ||

      (order.customer_name || "")
        .toLowerCase()
        .includes(keyword) ||

      String(order.order_number || "")
        .toLowerCase()
        .includes(keyword);

    return statusMatch && phoneMatch;
  });

  // ===========================
  // View Order
  // ===========================

  const handleView = async (id) => {
    try {
      const res = await getOrder(id);

      setSelectedOrder(res.data);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Delete Order
  // ===========================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteOrder(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Update Status
  // ===========================

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      loadOrders();

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // Update Delivery Charge
  // ===========================

  const handleUpdateShipping = async (id, shipping_cost) => {
    try {
      await updateOrderShipping(id, shipping_cost);

      loadOrders();

      if (selectedOrder?.id === id) {
        const res = await getOrder(id);
        setSelectedOrder(res.data);
      }

      Swal.fire({
        icon: "success",
        title: "Delivery Charge Updated",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Phone, Customer Name or Order Number..."
          value={searchPhone}
          onChange={(e) =>
            setSearchPhone(e.target.value)
          }
          className="w-full md:w-96 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      {/* Statistics */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5 mb-8">
        {/* All */}

        <div
          onClick={() => setStatusFilter("all")}
          className={`cursor-pointer rounded-xl shadow p-5 transition ${
            statusFilter === "all" ? "bg-indigo-600 text-white" : "bg-white"
          }`}
        >
          <p>Total Orders</p>

          <h2 className="text-3xl font-bold">{totalOrders}</h2>
        </div>

        {/* Pending */}

        <div
          onClick={() => setStatusFilter("pending")}
          className={`cursor-pointer rounded-xl shadow p-5 ${
            statusFilter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-yellow-50"
          }`}
        >
          <p>Pending</p>

          <h2 className="text-3xl font-bold">{pendingOrders}</h2>
        </div>

        {/* Confirmed */}

        <div
          onClick={() => setStatusFilter("confirmed")}
          className={`cursor-pointer rounded-xl shadow p-5 ${
            statusFilter === "confirmed"
              ? "bg-blue-600 text-white"
              : "bg-blue-50"
          }`}
        >
          <p>Confirmed</p>

          <h2 className="text-3xl font-bold">{confirmedOrders}</h2>
        </div>

        {/* Processing */}

        <div
          onClick={() => setStatusFilter("processing")}
          className={`cursor-pointer rounded-xl shadow p-5 ${
            statusFilter === "processing"
              ? "bg-purple-600 text-white"
              : "bg-purple-50"
          }`}
        >
          <p>Processing</p>

          <h2 className="text-3xl font-bold">{processingOrders}</h2>
        </div>

        {/* Shipping */}

        <div
          onClick={() => setStatusFilter("shipping")}
          className={`cursor-pointer rounded-xl shadow p-5 ${
            statusFilter === "shipping"
              ? "bg-cyan-600 text-white"
              : "bg-cyan-50"
          }`}
        >
          <p>Shipping</p>

          <h2 className="text-3xl font-bold">{shippingOrders}</h2>
        </div>

        {/* Completed */}

        <div
          onClick={() => setStatusFilter("completed")}
          className={`cursor-pointer rounded-xl shadow p-5 ${
            statusFilter === "completed"
              ? "bg-green-600 text-white"
              : "bg-green-50"
          }`}
        >
          <p>Completed</p>

          <h2 className="text-3xl font-bold">{completedOrders}</h2>
        </div>

        {/* Cancelled */}

        <div
          onClick={() => setStatusFilter("cancelled")}
          className={`cursor-pointer rounded-xl shadow p-5 ${
            statusFilter === "cancelled" ? "bg-red-600 text-white" : "bg-red-50"
          }`}
        >
          <p>Cancelled</p>

          <h2 className="text-3xl font-bold">{cancelledOrders}</h2>
        </div>
      </div>

      <OrderTable
        orders={filteredOrders}
        onView={handleView}
        onDelete={handleDelete}
        onStatusChange={handleStatus}
        onUpdateShipping={handleUpdateShipping}
      />

      {/* Modal */}

      {openModal && (
        <OrderDetailsModal
          open={openModal}
          order={selectedOrder}
          onUpdateShipping={handleUpdateShipping}
          onClose={() => {
            setOpenModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default Orders;