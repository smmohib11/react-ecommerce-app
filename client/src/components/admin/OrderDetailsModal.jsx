import { useState } from "react";
import { FiX, FiEdit2, FiCheck } from "react-icons/fi";

const NO_IMAGE = "/no-image.png";

function OrderDetailsModal({ open, onClose, order, onUpdateShipping }) {
  const [editingShipping, setEditingShipping] = useState(false);
  const [shippingValue, setShippingValue] = useState(0);

  if (!open || !order) return null;

  const getStatusColor = (status) => {
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

      case "completed":
        return "bg-emerald-100 text-emerald-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const startEditShipping = () => {
    setShippingValue(order.shipping_cost ?? 0);
    setEditingShipping(true);
  };

  const cancelEditShipping = () => {
    setEditingShipping(false);
  };

  const saveShipping = () => {
    const value = Number(shippingValue);

    if (!isNaN(value) && value >= 0 && onUpdateShipping) {
      onUpdateShipping(order.id, value);
    }

    setEditingShipping(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            Order Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}

        <div className="p-6">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="space-y-2">

              <p>
                <strong>Order No :</strong>{" "}
                {order.order_number}
              </p>


              <p>
                <strong>Customer :</strong>{" "}
                {order.customer_name}
              </p>

              <p>
                <strong>Phone :</strong>{" "}
                {order.customer_phone}
              </p>

              <p>
                <strong>Address :</strong>{" "}
                {order.shipping_address}
              </p>

              {order.district && (
                <p>
                  <strong>District :</strong>{" "}
                  {order.district}
                </p>
              )}

              {order.area && (
                <p>
                  <strong>Area :</strong>{" "}
                  {order.area}
                </p>
              )}

            </div>

            <div className="space-y-2">

              <p>
                <strong>Payment :</strong>{" "}
                {order.payment_method}
              </p>

              <p>
                <strong>Subtotal :</strong>{" "}
                ৳{Number(order.subtotal ?? 0).toFixed(2)}
              </p>

              <div className="flex items-center gap-2">
                <strong>Delivery Charge :</strong>

                {editingShipping ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      value={shippingValue}
                      onChange={(e) =>
                        setShippingValue(e.target.value)
                      }
                      className="w-24 border rounded-lg px-2 py-1 text-sm"
                      autoFocus
                    />

                    <button
                      onClick={saveShipping}
                      className="text-green-600 hover:text-green-700"
                      title="Save"
                    >
                      <FiCheck size={18} />
                    </button>

                    <button
                      onClick={cancelEditShipping}
                      className="text-gray-400 hover:text-gray-600"
                      title="Cancel"
                    >
                      <FiX size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      ৳{Number(order.shipping_cost ?? 0).toFixed(2)}
                    </span>

                    {onUpdateShipping && (
                      <button
                        onClick={startEditShipping}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit Delivery Charge"
                      >
                        <FiEdit2 size={14} />
                      </button>
                    )}
                  </>
                )}
              </div>

              <p>
                <strong>Total :</strong>{" "}
                <span className="font-bold text-green-600">
                  ৳{Number(order.total).toFixed(2)}
                </span>
              </p>

              <p>
                <strong>Status :</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.order_status
                  )}`}
                >
                  {order.order_status}
                </span>
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

            </div>

          </div>

          {/* Products */}

          <div className="mt-8">

            <h3 className="text-xl font-bold mb-4">
              Ordered Products
            </h3>

            <div className="overflow-x-auto">

              <table className="w-full border">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-3 text-left">
                      Product
                    </th>

                    <th className="p-3 text-center">
                      Qty
                    </th>

                    <th className="p-3 text-center">
                      Price
                    </th>

                    <th className="p-3 text-center">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {order.items?.length > 0 ? (

                    order.items.map((item) => (

                      <tr
                        key={item.id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* Product (Image + Name) */}
                        <td className="p-3">

                          <div className="flex items-center gap-4">

                            {/* <img
                              src={
                                item.thumbnail
                                  ? item.thumbnail
                                  : item.thumbnail_url
                                    ? item.thumbnail_url
                                    : NO_IMAGE

                              }
                              alt={item.product_name}
                              className="w-16 h-16 rounded-xl border object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = NO_IMAGE;
                              }}
                            /> */}

                            <div>

                              <h3 className="font-semibold text-gray-800">
                                {item.product_name}
                              </h3>

                              {item.sku && (
                                <p className="text-xs text-gray-500 mt-1">
                                  SKU :
                                  <span className="font-medium ml-1">
                                    {item.sku}
                                  </span>
                                </p>
                              )}

                            </div>

                          </div>

                        </td>


                        {/* Quantity */}
                        <td className="text-center">
                          {item.quantity}
                        </td>


                        {/* Price */}
                        <td className="text-center">
                          ৳{Number(item.price).toFixed(2)}
                        </td>


                        {/* Total */}
                        <td className="text-center font-semibold">
                          ৳{Number(item.total).toFixed(2)}
                        </td>


                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center p-6 text-gray-500"
                      >
                        No Products Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderDetailsModal;