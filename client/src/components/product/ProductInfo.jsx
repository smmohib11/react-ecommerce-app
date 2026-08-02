 import {
  Star,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
} from "lucide-react";

function ProductInfo({ product, variation }) {

  const originalPrice = Number(
    variation?.price || product.price
  );

  const sellingPrice =
    variation?.discount_price &&
    Number(variation.discount_price) > 0
      ? Number(variation.discount_price)
      : product.discount_price &&
        Number(product.discount_price) > 0
      ? Number(product.discount_price)
      : originalPrice;

  const stock =
    variation?.stock ?? product.stock;

  const sku =
    variation?.sku || product.sku;

  const save = originalPrice - sellingPrice;

  const discount =
    save > 0
      ? Math.round((save / originalPrice) * 100)
      : 0;

  return (
    <div className="space-y-5">

      {/* Product Title */}

      <h1 className="text-3xl font-bold leading-snug">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="flex items-center gap-3 text-sm">

        <div className="flex text-yellow-500">
          {[1,2,3,4,5].map((i)=>(
            <Star
              key={i}
              size={18}
              fill="currentColor"
            />
          ))}
        </div>

        <span className="text-gray-500">
          (124 Reviews)
        </span>

      </div>

      {/* Product Information */}

      <div className="grid grid-cols-2 gap-y-3 text-sm">

        <div className="text-gray-500">
          Brand
        </div>

        <div className="font-medium">
          {product.brand_name || "-"}
        </div>

        <div className="text-gray-500">
          Category
        </div>

        <div>
          {product.category_name}
        </div>

        <div className="text-gray-500">
          SKU
        </div>

        <div>
          {sku}
        </div>

        <div className="text-gray-500">
          Stock
        </div>

        <div
          className={`font-semibold ${
            stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {stock > 0
            ? `${stock} Available`
            : "Out Of Stock"}
        </div>

      </div>

      <hr />

      {/* Price */}

      <div>

        <div className="flex items-center gap-3 flex-wrap">

          <span className="text-4xl font-bold text-red-600">
            ৳ {sellingPrice.toLocaleString()}
          </span>

          {save > 0 && (
            <>
              <span className="text-xl text-gray-400 line-through">
                ৳ {originalPrice.toLocaleString()}
              </span>

              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {discount}% OFF
              </span>
            </>
          )}

        </div>

        {save > 0 && (
          <div className="mt-2 text-green-600 font-semibold">
            You Save ৳ {save.toLocaleString()}
          </div>
        )}

      </div>

      <hr />

      {/* Delivery */}

      <div className="space-y-3">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={20}
            className="text-green-600"
          />

          <span>
            Cash On Delivery Available
          </span>

        </div>

      </div>

      <hr />

      {/* Wishlist */}

      <div className="flex gap-3">

        <button className="flex-1 border rounded-lg py-3 flex justify-center items-center gap-2 hover:bg-gray-100">

          <Heart size={18} />

          Wishlist

        </button>

        <button className="flex-1 border rounded-lg py-3 flex justify-center items-center gap-2 hover:bg-gray-100">

          <Share2 size={18} />

          Share

        </button>

      </div>

    </div>
  );
}

export default ProductInfo;