// import { Link } from "react-router-dom";
// import { FiHeart, FiEye } from "react-icons/fi";
// import { useCart } from "../../context/CartContext";


// function ProductCard({ item }) {

//   const { addToCart } = useCart();

//   const image = item.thumbnail || item.thumbnail_url || "/no-image.png";

//   const discount =
//     item.discount_price > 0
//       ? Math.round(((item.price - item.discount_price) / item.price) * 100)
//       : 0;

//   return (
//     <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
//       {/* Image */}

//       <div className="relative overflow-hidden">
//         <Link to={`/product/${item.id}`}>
//           <img
//             src={image}
//             alt={item.name}
//             className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
//           />
//         </Link>

//         {/* Discount */}

//         {discount > 0 && (
//           <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
//             -{discount}%
//           </span>
//         )}

//         {/* Hover Buttons */}

//         <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
//           <button className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
//             <FiHeart />
//           </button>

//           <button className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
//             <FiEye />
//           </button>
//         </div>
//       </div>

//       {/* Content */}

//       <div className="p-5">
//         <Link
//           to={`/product/${item.id}`}
//           className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 h-12"
//         >
//           {item.name}
//         </Link>

//         {/* Rating */}

//         <div className="flex items-center gap-1 text-yellow-500 text-sm mt-3">
//           ⭐⭐⭐⭐⭐
//           <span className="text-gray-500 ml-2">(4.8)</span>
//         </div>

//         {/* Price */}

//         <div className="mt-3">
//           {item.discount_price > 0 ? (
//             <div className="flex items-center gap-3">
//               <span className="text-red-600 text-2xl font-bold">
//                 ৳{item.discount_price}
//               </span>

//               <span className="line-through text-gray-400">৳{item.price}</span>
//             </div>
//           ) : (
//             <span className="text-red-600 text-2xl font-bold">
//               ৳{item.price}
//             </span>
//           )}
//         </div>

//         {/* Button */}

//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             addToCart(item);
//           }}
//           className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;


import { Link } from "react-router-dom";
import { FiHeart, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";


function ProductCard({ item }) {

  const { addToCart } = useCart();

  const image = item.thumbnail || item.thumbnail_url || "/no-image.png";

  const discount =
    item.discount_price > 0
      ? Math.round(((item.price - item.discount_price) / item.price) * 100)
      : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();

    addToCart(item);

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${item.name} has been added to your cart`,
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image */}

      <div className="relative overflow-hidden">
        <Link to={`/product/${item.id}`}>
          <img
            src={image}
            alt={item.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
          />
        </Link>

        {/* Discount */}

        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            -{discount}%
          </span>
        )}

        {/* Hover Buttons */}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
            <FiHeart />
          </button>

          <button className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
            <FiEye />
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <Link
          to={`/product/${item.id}`}
          className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 h-12"
        >
          {item.name}
        </Link>

        {/* Rating */}

        <div className="flex items-center gap-1 text-yellow-500 text-sm mt-3">
          ⭐⭐⭐⭐⭐
          <span className="text-gray-500 ml-2">(4.8)</span>
        </div>

        {/* Price */}

        <div className="mt-3">
          {item.discount_price > 0 ? (
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-2xl font-bold">
                ৳{item.discount_price}
              </span>

              <span className="line-through text-gray-400">৳{item.price}</span>
            </div>
          ) : (
            <span className="text-red-600 text-2xl font-bold">
              ৳{item.price}
            </span>
          )}
        </div>

        {/* Button */}

        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;