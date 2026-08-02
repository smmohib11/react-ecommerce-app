import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ShoppingCart,
  Zap,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { getShippingList } from "../../services/shipping.service";
import {
  resolveInitialShipping,
  saveShippingId,
} from "../../services/shippingPreference";

function ProductActions({
  product,
  variation,
  settings,
  disabled,
}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);

  const [shippingList, setShippingList] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const stock = variation ? variation.stock : product.stock;

  const price =
    variation?.discount_price ||
    variation?.price ||
    product.discount_price ||
    product.price;

  const outOfStock = stock <= 0;

  useEffect(() => {
    loadShipping();
  }, []);

  const loadShipping = async () => {
    try {
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
    }
  };

  const increase = () => {
    if (qty < stock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const changeQty = (e) => {
    let value = Number(e.target.value);

    if (value < 1) value = 1;

    if (value > stock) value = stock;

    setQty(value);
  };

  const subtotal = price * qty;

  let shippingCharge = 0;

  if (selectedShipping) {
    if (
      selectedShipping.free_shipping == 1 &&
      subtotal >= selectedShipping.min_order
    ) {
      shippingCharge = 0;
    } else {
      shippingCharge = Number(selectedShipping.charge);
    }
  }

  const total = subtotal + shippingCharge;

  // ===========================
  // Add To Cart
  // ===========================

  const buildCartItem = () => ({
    ...product,
    quantity: qty,
    variation: variation || null,
    variation_id: variation?.id || null,
    price: variation?.price || product.price,
    discount_price: variation?.discount_price || product.discount_price,
    shipping_id: selectedShipping?.id || null,
  });

  const handleAddCart = () => {
    if (outOfStock || disabled) return;

    if (product.variations?.length > 0 && !variation) {
      Swal.fire({
        icon: "warning",
        title: "Please select a variation",
        text: "Choose an option above before adding to cart.",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    if (shippingList.length > 0 && !selectedShipping) {
      Swal.fire({
        icon: "warning",
        title: "Please select a delivery area",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    addToCart(buildCartItem());

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart`,
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // ===========================
  // Buy Now
  // ===========================

  const handleBuyNow = () => {
    if (outOfStock || disabled) return;

    if (product.variations?.length > 0 && !variation) {
      Swal.fire({
        icon: "warning",
        title: "Please select a variation",
        text: "Choose an option above before proceeding.",
        timer: 1800,
        showConfirmButton: false,
      });
      return;
    }

    if (shippingList.length > 0 && !selectedShipping) {
      Swal.fire({
        icon: "warning",
        title: "Please select a delivery area",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setActionLoading(true);

      addToCart(buildCartItem());

      navigate("/checkout");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 mt-6">

      <h3 className="text-2xl font-bold mb-6">
        Order Now
      </h3>

      {/* Quantity */}

      <div className="flex justify-between items-center">

        <span className="font-semibold">
          Quantity
        </span>

        <div className="flex border rounded-lg overflow-hidden">

          <button
            onClick={decrease}
            disabled={outOfStock}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>

          <input
            type="number"
            value={qty}
            onChange={changeQty}
            className="w-16 text-center outline-none"
          />

          <button
            onClick={increase}
            disabled={outOfStock}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>

        </div>

      </div>

      {/* Shipping */}

      <div className="mt-5">

        <label className="font-semibold block mb-2">
          Delivery Charge (Shipping Zone)
        </label>

        <select
          className="w-full border rounded-lg p-3"
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
            <option
              key={item.id}
              value={item.id}
            >

              {item.name} ({item.courier_name}) - ৳{item.charge}
            </option>
          ))}
        </select>

      </div>

      {/* Summary */}

      <div className="mt-6 bg-gray-50 rounded-xl border p-4 space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>

          <strong>
            ৳ {subtotal.toLocaleString()}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charge</span>

          <strong>

            {shippingCharge === 0
              ? "FREE"
              : `৳ ${shippingCharge}`}

          </strong>

        </div>

        <hr />

        <div className="flex justify-between text-xl">

          <strong>Total</strong>

          <strong className="text-red-600">
            ৳ {total.toLocaleString()}
          </strong>

        </div>

      </div>

      {selectedShipping?.free_shipping == 1 && (

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700">

          🚚 Free Shipping Above ৳
          {selectedShipping.min_order}

        </div>

      )}

      {/* Stock */}

      <div className="mt-5">

        <div className="flex justify-between">

          <span>Stock</span>

          <strong>{stock}</strong>

        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">

          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${Math.min(
                (stock / 100) * 100,
                100
              )}%`,
            }}
          />

        </div>

        <div className="mt-2">

          {outOfStock ? (
            <span className="text-red-600">
              Out Of Stock
            </span>
          ) : (
            <span className="text-green-600">
              Available
            </span>
          )}

        </div>

      </div>

      <div className="mt-4 flex items-center gap-2 text-green-600">

        <ShieldCheck size={18} />

        Cash On Delivery Available

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <button
          disabled={disabled || outOfStock || actionLoading}
          onClick={handleAddCart}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add To Cart
        </button>

        <button
          disabled={disabled || outOfStock || actionLoading}
          onClick={handleBuyNow}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Zap size={18} />
          {actionLoading ? "Processing..." : "Buy Now"}
        </button>

      </div>

      {/* Contact */}

      <div className="grid grid-cols-3 gap-3 mt-6">

        <a
          href={`tel:${settings?.phone}`}
          className="bg-slate-700 text-white rounded-xl py-3 flex justify-center"
        >
          <Phone size={20} />
        </a>

        <a
          href={`https://wa.me/${settings?.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 text-white rounded-xl py-3 flex justify-center"
        >
          <MessageCircle size={20} />
        </a>

        <a
          href={settings?.messenger}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white rounded-xl py-3 flex justify-center"
        >
          <Truck size={20} />
        </a>

      </div>

    </div>
  );
}

export default ProductActions;