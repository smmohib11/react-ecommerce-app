import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function OrderStatusChart({ dashboard }) {
  const data = [
    {
      name: "Pending",
      value: dashboard.pendingOrders,
    },
    {
      name: "Confirmed",
      value: dashboard.confirmedOrders,
    },
    {
      name: "Shipping",
      value: dashboard.shippingOrders,
    },
    {
      name: "Completed",
      value: dashboard.completedOrders,
    },
    {
      name: "Cancelled",
      value: dashboard.cancelledOrders,
    },
  ];

  const colors = [
    "#f59e0b",
    "#2563eb",
    "#06b6d4",
    "#16a34a",
    "#dc2626",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-[400px]">
      <h2 className="text-xl font-bold mb-5">
        Order Status
      </h2>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((item, index) => (
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderStatusChart;