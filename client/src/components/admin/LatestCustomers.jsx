function LatestCustomers({ customers }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Latest Customers
      </h2>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3">
              Joined
            </th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr
              key={customer.id}
              className="border-b"
            >

              <td className="p-3">
                {customer.name}
              </td>

              <td className="p-3">
                {customer.email}
              </td>

              <td className="text-center">
                {new Date(
                  customer.created_at
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LatestCustomers;