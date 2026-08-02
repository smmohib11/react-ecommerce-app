import { FiEdit2, FiTrash2 } from "react-icons/fi";

function AttributeValueTable({
  values = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Attribute</th>
            <th className="p-3 text-left">Value</th>
            <th className="p-3 text-left">Slug</th>
            <th className="p-3 text-center">Sort</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {values.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-10 text-gray-500"
              >
                No Attribute Values Found
              </td>
            </tr>
          ) : (
            values.map((item, index) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-medium">
                  {item.attribute_name}
                </td>

                <td className="p-3">{item.value}</td>

                <td className="p-3 text-gray-600">
                  {item.slug}
                </td>

                <td className="p-3 text-center">
                  {item.sort_order}
                </td>

                <td className="p-3 text-center">
                  {Number(item.status) === 1 ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
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

export default AttributeValueTable;