function LowStockProducts({ products }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5 text-red-600">
        Low Stock Products
      </h2>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Product
            </th>

            <th className="p-3">
              Stock
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((item) => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="p-3">
                {item.name}
              </td>

              <td className="text-center font-bold text-red-600">
                {item.stock}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LowStockProducts;