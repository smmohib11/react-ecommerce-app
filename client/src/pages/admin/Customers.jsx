import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getCustomers } from "../../services/customer.service";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const res = await getCustomers();

      const data = res.data || [];

      setCustomers(data);
      setFiltered(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      customers.filter(
        (item) =>
          item.name?.toLowerCase().includes(keyword) ||
          item.email?.toLowerCase().includes(keyword) ||
          item.phone?.toLowerCase().includes(keyword)
      )
    );
  }, [search, customers]);

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <div className="relative">

          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 border rounded-lg w-80"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Orders</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-center">Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10"
                >
                  Loading...
                </td>
              </tr>

            ) : filtered.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10"
                >
                  No Customers Found
                </td>
              </tr>

            ) : (

              filtered.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4 font-medium">
                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.email}
                  </td>

                  <td className="p-4">
                    {item.phone}
                  </td>

                  <td className="p-4">
                    {item.total_orders || 0}
                  </td>

                  <td className="p-4">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    {item.status == 1 ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                        Inactive
                      </span>
                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Customers;