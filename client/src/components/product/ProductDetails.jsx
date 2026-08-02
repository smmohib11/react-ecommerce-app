import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ChevronRight, PackageX, Loader2 } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import Breadcrumb from "./Breadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductVariation from "./ProductVariation";
import ProductActions from "./ProductActions";

import { getProductDetails } from "../../services/product.service";
import { addToCart } from "../../services/cart.service";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [variations, setVariations] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);

  // ===============================
  // Load Product
  // ===============================

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getProductDetails(id);

      const data = res.data;

      setProduct(data);
      setImages(data.images || []);
      setVariations(data.variations || []);
      setSpecifications(data.specifications || []);
      setSelectedVariation(null);
    } catch (error) {
      console.error("Load Product Error:", error);

      setProduct(null);
      setImages([]);
      setVariations([]);
      setSpecifications([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadProduct]);

  // ===============================
  // Add To Cart
  // ===============================

  const handleAddCart = async (qty) => {
    // Require variation selection if variations exist
    if (variations.length > 0 && !selectedVariation) {
      Swal.fire({
        icon: "warning",
        title: "Please select a variation first",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setActionLoading(true);

      await addToCart({
        product_id: product.id,
        variation_id: selectedVariation?.id || null,
        quantity: qty,
      });

      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Could not add to cart",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // Buy Now
  // ===============================

  const handleBuyNow = async (qty) => {
    if (variations.length > 0 && !selectedVariation) {
      Swal.fire({
        icon: "warning",
        title: "Please select a variation first",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setActionLoading(true);

      await addToCart({
        product_id: product.id,
        variation_id: selectedVariation?.id || null,
        quantity: qty,
      });

      navigate("/checkout");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Could not process order",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3 text-gray-500">
        <Loader2 className="animate-spin" size={36} />
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  // ===============================
  // Not Found
  // ===============================

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center px-4">
        <PackageX size={56} className="text-red-400" />

        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>

        <p className="text-gray-500 max-w-sm">
          The product you're looking for doesn't exist or may have been removed.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // ===============================
  // Page
  // ===============================

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}

      <Breadcrumb category={product.category_name} product={product.name} />

      {/* Product Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 lg:p-8">
        {/* Left - Gallery */}

        <div className="lg:sticky lg:top-24 self-start">
          <ProductGallery
            thumbnail={selectedVariation?.image || product.thumbnail}
            images={images}
          />
        </div>

        {/* Right - Info */}

        <div className="space-y-6">
          <ProductInfo product={product} variation={selectedVariation} />

          {variations.length > 0 && (
            <div className="border-t pt-6">
              <ProductVariation
    variations={variations}
    selectedVariation={selectedVariation}
    onChange={setSelectedVariation}
/>
            </div>
          )}

          <div className="border-t pt-6">
            <ProductActions
    product={product}
    variation={selectedVariation}
    settings={settings || {}}
    disabled={actionLoading}
    onAddCart={handleAddCart}
    onBuyNow={handleBuyNow}
/>
          </div>
        </div>
      </div>

      {/* Description */}

      <section className="mt-10 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 lg:p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
          <ChevronRight size={20} className="text-blue-600" />
          Product Description
        </h2>

        <div className="text-gray-600 whitespace-pre-line leading-8">
          {product.description || "No description available."}
        </div>
      </section>

      {/* Specifications */}

      <section className="mt-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 lg:p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
          <ChevronRight size={20} className="text-blue-600" />
          Specifications
        </h2>

        {specifications.length === 0 ? (
          <p className="text-gray-400 text-sm">No specification available.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <tbody>
                {specifications.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="w-60 py-3 px-4 font-semibold text-gray-700 border-r border-gray-100">
                      {item.title}
                    </td>

                    <td className="py-3 px-4 text-gray-600">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductDetails;

///previus code

// import { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";

// import Breadcrumb from "../../components/product/Breadcrumb";
// import ProductGallery from "../../components/product/ProductGallery";
// import ProductInfo from "../../components/product/ProductInfo";
// import ProductVariation from "../../components/product/ProductVariation";
// import ProductActions from "../../components/product/ProductActions";

// import { getProductDetails } from "../../services/product.service";

// function ProductDetails() {
//   const { id } = useParams();

//   const [loading, setLoading] = useState(true);

//   const [product, setProduct] = useState(null);
//   const [images, setImages] = useState([]);
//   const [variations, setVariations] = useState([]);
//   const [specifications, setSpecifications] = useState([]);
//   const [selectedVariation, setSelectedVariation] = useState(null);

//   // ===============================
//   // Load Product
//   // ===============================

//   const loadProduct = useCallback(async () => {
//     try {
//       setLoading(true);

//       const res = await getProductDetails(id);

//       const data = res.data;

//       setProduct(data);
//       setImages(data.images || []);
//       setVariations(data.variations || []);
//       setSpecifications(data.specifications || []);
//       setSelectedVariation(null);
//     } catch (error) {
//       console.error("Load Product Error:", error);

//       setProduct(null);
//       setImages([]);
//       setVariations([]);
//       setSpecifications([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     loadProduct();
//   }, [loadProduct]);

//   // ===============================
//   // Loading
//   // ===============================

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <h2 className="text-xl font-semibold">
//           Loading Product...
//         </h2>
//       </div>
//     );
//   }

//   // ===============================
//   // Not Found
//   // ===============================

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <h2 className="text-2xl font-bold text-red-500">
//           Product Not Found
//         </h2>
//       </div>
//     );
//   }

//   // ===============================
//   // Page
//   // ===============================

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">

//       {/* Breadcrumb */}

//       <Breadcrumb
//         category={product.category_name}
//         product={product.name}
//       />

//       {/* Product Section */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">

//         {/* Left */}

//         <ProductGallery
//           thumbnail={product.thumbnail}
//           images={images}
//         />

//         {/* Right */}

//         <div className="space-y-6">

//           <ProductInfo
//             product={product}
//           />

//           <ProductVariation
//             variations={variations}
//             onChange={setSelectedVariation}
//           />

//           <ProductActions
//             product={product}
//             variation={selectedVariation}
//             onAddCart={(qty) => {
//               console.log("Add To Cart:", qty);
//             }}
//             onBuyNow={(qty) => {
//               console.log("Buy Now:", qty);
//             }}
//           />

//         </div>

//       </div>

//       {/* Description */}

//       <section className="mt-12 bg-white border rounded-xl p-6">

//         <h2 className="text-2xl font-bold mb-4">
//           Product Description
//         </h2>

//         <div className="text-gray-700 whitespace-pre-line leading-8">
//           {product.description || "No description available."}
//         </div>

//       </section>

//       {/* Specifications */}

//       <section className="mt-10 bg-white border rounded-xl p-6">

//         <h2 className="text-2xl font-bold mb-4">
//           Specifications
//         </h2>

//         {specifications.length === 0 ? (

//           <p className="text-gray-500">
//             No specification available.
//           </p>

//         ) : (

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <tbody>

//                 {specifications.map((item) => (

//                   <tr
//                     key={item.id}
//                     className="border-b last:border-none"
//                   >

//                     <td className="w-60 py-3 font-semibold bg-gray-50 px-3">
//                       {item.title}
//                     </td>

//                     <td className="py-3 px-3 text-gray-700">
//                       {item.value}
//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//         )}

//       </section>

//     </div>
//   );
// }

// export default ProductDetails;
