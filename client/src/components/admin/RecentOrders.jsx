function RecentOrders({ orders }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Orders
      </h2>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Order
            </th>

            <th className="p-3 text-left">
              Customer
            </th>

            <th className="p-3">
              Total
            </th>

            <th className="p-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-b"
            >

              <td className="p-3">
                {order.order_number}
              </td>

              <td className="p-3">
                {order.customer_name}
              </td>

              <td className="text-center">
                ৳{order.total}
              </td>

              <td className="text-center capitalize">
                {order.order_status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentOrders;