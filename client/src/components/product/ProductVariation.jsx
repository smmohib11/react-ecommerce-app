import { useEffect, useState } from "react";

function ProductVariation({
  variations = [],
  onChange,
}) {
  const [selected, setSelected] = useState(null);

  // Stable key built from variation ids — only changes when the
  // actual set of variations changes, not on every re-render where
  // the parent passes a new array reference with the same content.
  const variationKey = variations.map((v) => v.id).join(",");

  useEffect(() => {
    if (variations.length > 0) {
      setSelected(variations[0]);

      if (onChange) {
        onChange(variations[0]);
      }
    } else {
      setSelected(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variationKey]);

  if (variations.length === 0) {
    return null;
  }

  const handleSelect = (variation) => {
    setSelected(variation);

    if (onChange) {
      onChange(variation);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6 mt-6">

      <h3 className="text-xl font-bold mb-4">
        Select Variation
      </h3>

      <div className="flex flex-wrap gap-3">

        {variations.map((variation) => (

          <button
            key={variation.id}
            type="button"
            onClick={() => handleSelect(variation)}
            className={`border rounded-lg px-4 py-3 transition

            ${
              selected?.id === variation.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-500"
            }
            `}
          >

            <div className="font-semibold">

              {variation.attributes
                ?.map((item) => item.value)
                .join(" / ")}

            </div>

            <div className="text-sm text-gray-500 mt-1">

              Stock :
              {" "}
              {variation.stock}

            </div>

          </button>

        ))}

      </div>

      {selected && (

        <div className="mt-5 border-t pt-5">

          <div className="text-lg font-bold text-red-600">

            ৳ {selected.discount_price || selected.price}

          </div>

          {selected.discount_price > 0 && (

            <div className="line-through text-gray-400">

              ৳ {selected.price}

            </div>

          )}

          <div className="mt-2 text-sm">

            SKU :
            {" "}
            {selected.sku}

          </div>

          <div className="mt-2">

            {selected.stock > 0 ? (

              <span className="text-green-600 font-semibold">
                In Stock
              </span>

            ) : (

              <span className="text-red-600 font-semibold">
                Out of Stock
              </span>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default ProductVariation;


// import { useEffect, useState } from "react";

// function ProductVariation({
//   variations = [],
//   onChange,
// }) {
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     if (variations.length > 0) {
//       setSelected(variations[0]);

//       if (onChange) {
//         onChange(variations[0]);
//       }
//     }
//   }, [variations]);

//   if (variations.length === 0) {
//     return null;
//   }

//   const handleSelect = (variation) => {
//     setSelected(variation);

//     if (onChange) {
//       onChange(variation);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border p-6 mt-6">

//       <h3 className="text-xl font-bold mb-4">
//         Select Variation
//       </h3>

//       <div className="flex flex-wrap gap-3">

//         {variations.map((variation) => (

//           <button
//             key={variation.id}
//             type="button"
//             onClick={() => handleSelect(variation)}
//             className={`border rounded-lg px-4 py-3 transition

//             ${
//               selected?.id === variation.id
//                 ? "border-blue-600 bg-blue-50"
//                 : "border-gray-300 hover:border-blue-500"
//             }
//             `}
//           >

//             <div className="font-semibold">

//               {variation.attributes
//                 ?.map((item) => item.value)
//                 .join(" / ")}

//             </div>

//             <div className="text-sm text-gray-500 mt-1">

//               Stock :
//               {" "}
//               {variation.stock}

//             </div>

//           </button>

//         ))}

//       </div>

//       {selected && (

//         <div className="mt-5 border-t pt-5">

//           <div className="text-lg font-bold text-red-600">

//             ৳ {selected.discount_price || selected.price}

//           </div>

//           {selected.discount_price > 0 && (

//             <div className="line-through text-gray-400">

//               ৳ {selected.price}

//             </div>

//           )}

//           <div className="mt-2 text-sm">

//             SKU :
//             {" "}
//             {selected.sku}

//           </div>

//           <div className="mt-2">

//             {selected.stock > 0 ? (

//               <span className="text-green-600 font-semibold">
//                 In Stock
//               </span>

//             ) : (

//               <span className="text-red-600 font-semibold">
//                 Out of Stock
//               </span>

//             )}

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default ProductVariation;

