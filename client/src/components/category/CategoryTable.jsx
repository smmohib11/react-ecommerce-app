import { FiEdit2, FiTrash2 } from "react-icons/fi";

function CategoryTable({
  categories,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Image</th>

            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Slug</th>

            <th className="p-3 text-left">Status</th>

            <th className="p-3 text-left">Created</th>

            <th className="p-3 text-center">Action</th>

          </tr>

        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >
                No Categories Found
              </td>

            </tr>

          ) : (

            categories.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border"
                  />

                </td>

                <td className="p-3 font-medium">
                  {item.name}
                </td>

                <td className="p-3">
                  {item.slug}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status == 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status == 1
                      ? "Active"
                      : "Inactive"}
                  </span>

                </td>

                <td className="p-3">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600"
                    >
                      <FiEdit2 size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600"
                    >
                      <FiTrash2 size={18} />
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

export default CategoryTable;