import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiGrid,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
  FiPackage,
  FiBox,
} from "react-icons/fi";

import { getDashboard } from "../../services/dashboard.service";

import SalesChart from "../../components/admin/SalesChart";
import OrderStatusChart from "../../components/admin/OrderStatusChart";
import RecentOrders from "../../components/admin/RecentOrders";
import LowStockProducts from "../../components/admin/LowStockProducts";
import LatestCustomers from "../../components/admin/LatestCustomers";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dashboard || !dashboard.success) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Products",
      value: dashboard.totalProducts,
      icon: <FiShoppingBag size={28} />,
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      title: "Categories",
      value: dashboard.totalCategories,
      icon: <FiGrid size={28} />,
      color: "bg-indigo-500",
      link: "/admin/categories",
    },
    {
      title: "Customers",
      value: dashboard.totalCustomers,
      icon: <FiUsers size={28} />,
      color: "bg-pink-500",
      link: "/admin/customers",
    },
    {
      title: "Orders",
      value: dashboard.totalOrders,
      icon: <FiPackage size={28} />,
      color: "bg-orange-500",
      filter: "all",
    },
    {
      title: "Revenue",
      value: `৳${dashboard.totalRevenue}`,
      icon: <FiDollarSign size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Pending",
      value: dashboard.pendingOrders,
      icon: <FiClock size={28} />,
      color: "bg-yellow-500",
      filter: "pending",
    },
    {
      title: "Confirmed",
      value: dashboard.confirmedOrders,
      icon: <FiCheckCircle size={28} />,
      color: "bg-blue-600",
      filter: "confirmed",
    },
    {
      title: "Shipping",
      value: dashboard.shippingOrders,
      icon: <FiTruck size={28} />,
      color: "bg-cyan-600",
      filter: "shipping",
    },
    {
      title: "Completed",
      value: dashboard.completedOrders,
      icon: <FiBox size={28} />,
      color: "bg-green-700",
      filter: "completed",
    },
    {
      title: "Cancelled",
      value: dashboard.cancelledOrders,
      icon: <FiXCircle size={28} />,
      color: "bg-red-600",
      filter: "cancelled",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back Admin 👋
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => {
              if (card.filter) {
                navigate(`/admin/orders?status=${card.filter}`);
              } else if (card.link) {
                navigate(card.link);
              }
            }}
            className={`bg-white rounded-2xl shadow p-5 flex justify-between items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              card.filter || card.link
                ? "cursor-pointer"
                : ""
            }`}
          >
            <div>
              <p className="text-gray-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} text-white rounded-xl p-4`}
            >
              {card.icon}
            </div>
          </div>
        ))}

      </div>

      {/* Today */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-gray-600">
            Today's Orders
          </h3>

          <h1 className="text-5xl font-bold mt-4">
            {dashboard.todayOrders}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-gray-600">
            Today's Revenue
          </h3>

          <h1 className="text-5xl font-bold mt-4 text-green-600">
            ৳{dashboard.todayRevenue}
          </h1>
        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-3 gap-6">

        <SalesChart data={dashboard.salesChart} />

        <OrderStatusChart dashboard={dashboard} />

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-6">

        <RecentOrders
          orders={dashboard.recentOrders}
        />

        <LowStockProducts
          products={dashboard.lowStockProducts}
        />

      </div>

      <LatestCustomers
        customers={dashboard.latestCustomers}
      />

    </div>
  );
}

export default Dashboard;
