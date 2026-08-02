import { useState } from "react";
import {
  FiEye,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";

function OrderTable({
  orders,
  onView,
  onDelete,
  onStatusChange,
  onUpdateShipping,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (order) => {
    setEditingId(order.id);
    setEditValue(order.shipping_cost ?? 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = (order) => {
    const value = Number(editValue);

    if (!isNaN(value) && value >= 0) {
      onUpdateShipping(order.id, value);
    }

    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Order</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Total</th>

              <th className="p-4 text-left">Delivery Charge</th>

              <th className="p-4 text-left">Payment</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center py-10"
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

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          order.thumbnail ||
                          order.items?.[0]?.thumbnail ||
                          order.items?.[0]?.product_thumbnail ||
                          "/no-image.png"
                        }
                        alt={order.order_number}
                        className="w-12 h-12 rounded-lg object-cover border shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/no-image.png";
                        }}
                      />
                      <span className="font-semibold whitespace-nowrap">
                        {order.order_number}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    {order.customer_name}
                  </td>

                  <td className="p-4">
                    {order.customer_phone}
                  </td>

                  <td className="p-4 font-semibold">
                    ৳{order.total}
                  </td>

                  <td className="p-4">
                    {editingId === order.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={editValue}
                          onChange={(e) =>
                            setEditValue(e.target.value)
                          }
                          className="w-20 border rounded-lg px-2 py-1 text-sm"
                          autoFocus
                        />

                        <button
                          onClick={() => saveEdit(order)}
                          className="text-green-600 hover:text-green-700"
                          title="Save"
                        >
                          <FiCheck size={18} />
                        </button>

                        <button
                          onClick={cancelEdit}
                          className="text-gray-400 hover:text-gray-600"
                          title="Cancel"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>৳{order.shipping_cost ?? 0}</span>

                        <button
                          onClick={() => startEdit(order)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit Delivery Charge"
                        >
                          <FiEdit2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {order.payment_method}
                  </td>

                  <td className="p-4">

                    <select
                      value={order.order_status}
                      onChange={(e) =>
                        onStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2"
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

                  </td>

                  <td className="p-4">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          onView(order.id)
                        }
                        className="text-blue-600"
                      >
                        <FiEye size={20} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(order.id)
                        }
                        className="text-red-600"
                      >
                        <FiTrash2 size={20} />
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