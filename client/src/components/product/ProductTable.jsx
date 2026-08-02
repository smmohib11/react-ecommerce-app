import {
  FiEdit2,
  FiTrash2,
  FiStar,
} from "react-icons/fi";

const NO_IMAGE =
  "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">

      <table className="min-w-full">

        <thead className="bg-gray-100 text-gray-700">

          <tr>

            <th className="p-4 w-12">
              <input type="checkbox" />
            </th>

            <th className="p-4 text-left">
              Product
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-center">
              Price
            </th>

            <th className="p-4 text-center">
              Stock
            </th>

            <th className="p-4 text-center">
              Status
            </th>

            <th className="p-4 text-center">
              Featured
            </th>

            <th className="p-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {products.length === 0 ? (

            <tr>

              <td
                colSpan={8}
                className="py-20 text-center text-gray-500"
              >
                No Products Found
              </td>

            </tr>

          ) : (

            products.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-blue-50 transition"
              >

                {/* Checkbox */}

                <td className="p-4">

                  <input type="checkbox" />

                </td>

                {/* Product */}

                <td className="p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={item.thumbnail || NO_IMAGE}
                      onError={(e) => {
                        e.target.src = NO_IMAGE;
                      }}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl border object-cover"
                    />

                    <div>

                      <h3 className="font-semibold text-gray-800">

                        {item.name}

                      </h3>

                      <p className="text-xs text-gray-500 mt-1">

                        SKU :
                        <span className="font-medium ml-1">

                          {item.sku || "-"}

                        </span>

                      </p>

                    </div>

                  </div>

                </td>

                {/* Category */}

                <td className="p-4">

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                    {item.category_name || "-"}

                  </span>

                </td>

                {/* Price */}

                <td className="p-4 text-center">

                  {item.discount_price ? (

                    <>

                      <div className="font-bold text-red-600">

                        ৳{item.discount_price}

                      </div>

                      <div className="text-xs line-through text-gray-400">

                        ৳{item.price}

                      </div>

                    </>

                  ) : (

                    <span className="font-semibold">

                      ৳{item.price}

                    </span>

                  )}

                </td>

                {/* Stock */}

                <td className="p-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      item.stock > 20
                        ? "bg-green-100 text-green-700"
                        : item.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {item.stock}

                  </span>

                </td>

                {/* Status */}

                <td className="p-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      item.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {item.status
                      ? "Active"
                      : "Inactive"}

                  </span>

                </td>

                {/* Featured */}

                <td className="p-4 text-center">

                  {item.featured ? (

                    <FiStar
                      size={20}
                      className="mx-auto text-yellow-500"
                    />

                  ) : (

                    <span className="text-gray-400">

                      —

                    </span>

                  )}

                </td>

                {/* Action */}

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(item)}
                      className="w-9 h-9 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
                    >

                      <FiEdit2 />

                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="w-9 h-9 rounded-lg bg-red-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition"
                    >

                      <FiTrash2 />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;