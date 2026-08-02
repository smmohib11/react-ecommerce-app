import { FiEye, FiTrash2 } from "react-icons/fi";

import OrderDetailsModal from "../admin/OrderDetailsModal";
function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "confirmed":
      return "bg-blue-100 text-blue-700";

    case "processing":
      return "bg-indigo-100 text-indigo-700";

    case "shipping":
      return "bg-purple-100 text-purple-700";

    case "delivered":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function OrderTable({
  orders = [],
  onView,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">Order</th>

              <th className="px-4 py-3 text-left">Customer</th>

              <th className="px-4 py-3 text-left">Phone</th>

              <th className="px-4 py-3 text-right">Total</th>

              <th className="px-4 py-3 text-left">Payment</th>

              <th className="px-4 py-3 text-left">Status</th>

              <th className="px-4 py-3 text-left">Date</th>

              <th className="px-4 py-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="text-center py-12 text-gray-500"
                >
                  No Orders Found
                </td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-4 font-semibold whitespace-nowrap">
                    {order.order_number}
                  </td>

                  <td className="px-4 py-4">
                    {order.customer_name}
                  </td>

                  <td className="px-4 py-4">
                    {order.customer_phone}
                  </td>

                  <td className="px-4 py-4 text-right font-semibold">
                    ৳{Number(order.total).toFixed(2)}
                  </td>

                  <td className="px-4 py-4">
                    {order.payment_method}
                  </td>

                  <td className="px-4 py-4">

                    <div className="flex items-center gap-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          order.order_status
                        )}`}
                      >
                        {order.order_status}
                      </span>

                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          onStatusChange?.(
                            order.id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipping">
                          Shipping
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </div>

                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          onView?.(order.id)
                        }
                        className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      >
                        <FiEye className="mx-auto" />
                      </button>

                      <button
                        onClick={() =>
                          onDelete?.(order.id)
                        }
                        className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                      >
                        <FiTrash2 className="mx-auto" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrderTable;