import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/order.service";
import { getShippingList } from "../../services/shipping.service";
import {
  resolveInitialShipping,
  saveShippingId,
} from "../../services/shippingPreference";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [shippingList, setShippingList] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(true);

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    shipping_address: "",
    payment_method: "Cash On Delivery",
  });

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

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
  // Place Order
  // ===========================

  const handleOrder = async () => {
    if (cart.length === 0) {
      return Swal.fire(
        "Cart Empty",
        "Please add some products first.",
        "warning"
      );
    }

    if (!form.customer_name.trim()) {
      return Swal.fire(
        "Required",
        "Please enter your full name.",
        "warning"
      );
    }

    if (!form.customer_phone.trim()) {
      return Swal.fire(
        "Required",
        "Please enter your phone number.",
        "warning"
      );
    }

    if (!form.shipping_address.trim()) {
      return Swal.fire(
        "Required",
        "Please enter your address.",
        "warning"
      );
    }

    if (!selectedShipping) {
      return Swal.fire(
        "Required",
        "Please select a delivery area.",
        "warning"
      );
    }

    try {
      setLoading(true);

      const orderData = {
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        shipping_address: form.shipping_address,
        payment_method: "Cash On Delivery",
        shipping_id: selectedShipping.id,
        shipping_cost: shippingCharge,

        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      console.log("Sending Order:", orderData);

      const res = await createOrder(orderData);

      console.log("Order Response:", res);

      await Swal.fire({
        icon: "success",
        title: "Order Placed Successfully",
        text: "Thank you for your purchase.",
        confirmButtonColor: "#2563eb",
      });

      clearCart();

      navigate("/my-orders");

    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text:
          err.response?.data?.message ||
          "Something went wrong.",
      });

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              Customer Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="customer_phone"
                  value={form.customer_phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Full Address
                </label>

                <textarea
                  rows="5"
                  name="shipping_address"
                  value={form.shipping_address}
                  onChange={handleChange}
                  placeholder="House, Road, Area, District"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Delivery Area
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

              <div>

                <label className="block mb-3 font-medium">
                  Payment Method
                </label>

                <div className="border rounded-xl p-4 bg-gray-50">

                  <label className="flex items-center gap-3">

                    <input
                      type="radio"
                      checked
                      readOnly
                    />

                    <span className="font-semibold">
                      Cash On Delivery
                    </span>

                  </label>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {cart.length === 0 ? (

              <p className="text-gray-500">
                Your cart is empty.
              </p>

            ) : (

              <>

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-3 border-b pb-4"
                    >

                      <img
                        src={
                          item.thumbnail ||
                          item.thumbnail_url ||
                          "/no-image.png"
                        }
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />

                      <div className="flex-1">

                        <h4 className="font-semibold line-clamp-2">
                          {item.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <div className="font-semibold whitespace-nowrap">
                        ৳
                        {(item.discount_price || item.price) *
                          item.quantity}
                      </div>

                    </div>

                  ))}

                </div>

                <div className="mt-6 space-y-3">

                  <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>
                      ৳{cartTotal}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Delivery Charge</span>

                    <span>
                      {shippingCharge === 0
                        ? "FREE"
                        : `৳${shippingCharge}`}
                    </span>

                  </div>

                  {selectedShipping?.free_shipping == 1 &&
                    shippingCharge > 0 && (
                      <p className="text-xs text-green-600">
                        Free shipping on orders above ৳
                        {selectedShipping.min_order}
                      </p>
                    )}

                  <hr />

                  <div className="flex justify-between text-xl font-bold">

                    <span>Total</span>

                    <span className="text-blue-600">
                      ৳
                      {total}
                    </span>

                  </div>

                </div>

                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-bold transition"
                >
                  {loading
                    ? "Placing Order..."
                    : "Place Order"}
                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;