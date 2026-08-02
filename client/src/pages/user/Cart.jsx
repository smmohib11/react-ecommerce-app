import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";
import { getShippingList } from "../../services/shipping.service";
import {
  resolveInitialShipping,
  saveShippingId,
} from "../../services/shippingPreference";

function Cart() {

  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const [shippingList, setShippingList] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(true);

  // ===========================
  // Load Shipping Zones
  // ===========================

  useEffect(() => {
    loadShipping();
  }, []);

  const loadShipping = async () => {
    try {
      setShippingLoading(true);

      const res = await getShippingList();

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setShippingList(data);

      const initial = resolveInitialShipping(data);
      if (initial) {
        setSelectedShipping(initial);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setShippingLoading(false);
    }
  };

  // ===========================
  // Shipping Charge Calculation
  // ===========================

  let shippingCharge = 0;

  if (selectedShipping) {
    if (
      selectedShipping.free_shipping == 1 &&
      cartTotal >= selectedShipping.min_order
    ) {
      shippingCharge = 0;
    } else {
      shippingCharge = Number(selectedShipping.charge || 0);
    }
  }

  const total = cartTotal + shippingCharge;

  // ===========================
  // Handlers
  // ===========================

  const handleQtyChange = (item, value) => {
    let qty = Number(value);

    if (!qty || qty < 1) qty = 1;

    if (item.stock && qty > item.stock) qty = item.stock;

    updateQuantity(item.id, qty);
  };

  const handleRemove = async (item) => {
    const result = await Swal.fire({
      title: "Remove Item?",
      text: `${item.name} will be removed from your cart.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Remove",
    });

    if (!result.isConfirmed) return;

    removeFromCart(item.id);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Your Cart is Empty
        </h2>

        <Link
          to="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-6 border-b p-6 last:border-none"
            >

              <img
                src={item.thumbnail || item.thumbnail_url || "/no-image.png"}
                className="w-24 h-24 object-cover rounded-lg border"
                alt={item.name}
              />

              <div className="flex-1">

                <h2 className="font-semibold">
                  {item.name}
                </h2>

                <p className="text-red-600 mt-2">
                  ৳{(item.discount_price || item.price).toLocaleString()}
                </p>

              </div>

              <input
                type="number"
                min="1"
                max={item.stock || undefined}
                value={item.quantity}
                onChange={(e) =>
                  handleQtyChange(item, e.target.value)
                }
                className="border rounded w-20 px-2 py-1 text-center"
              />

              <div className="w-24 text-right font-semibold">
                ৳
                {(
                  (item.discount_price || item.price) * item.quantity
                ).toLocaleString()}
              </div>

              <button
                onClick={() => handleRemove(item)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>

            </div>

          ))}

        </div>

        {/* Right */}

        <div className="bg-white rounded-xl shadow p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {/* Delivery Area */}

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Delivery Charge & Area
            </label>

            {shippingLoading ? (
              <p className="text-sm text-gray-400">
                Loading delivery options...
              </p>
            ) : shippingList.length === 0 ? (
              <p className="text-sm text-red-500">
                No delivery areas available.
              </p>
            ) : (
              <select
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedShipping?.id || ""}
                onChange={(e) => {
                  const zone = shippingList.find(
                    (x) => x.id == e.target.value
                  );

                  setSelectedShipping(zone);
                  saveShippingId(zone?.id);
                }}
              >
                {shippingList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.courier_name}) - ৳{item.charge}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-between mb-3">

            <span>Subtotal</span>

            <span>
              ৳{cartTotal.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between mb-3">

            <span>Delivery Charge</span>

            <span>
              {shippingCharge === 0
                ? "FREE"
                : `৳${shippingCharge.toLocaleString()}`}
            </span>

          </div>

          {selectedShipping?.free_shipping == 1 &&
            shippingCharge > 0 && (
              <p className="text-xs text-green-600 mb-3">
                Free shipping on orders above ৳
                {Number(selectedShipping.min_order).toLocaleString()}
              </p>
            )}

          <hr className="my-4"/>

          <div className="flex justify-between font-bold text-xl">

            <span>Total</span>

            <span>
              ৳{total.toLocaleString()}
            </span>

          </div>

          <Link
            to="/checkout"
            className="block mt-6 bg-blue-600 hover:bg-blue-700 text-center text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;