import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function AttributeTable({
  attributes,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-5 py-3 text-left">#</th>

            <th className="px-5 py-3 text-left">
              Name
            </th>

            <th className="px-5 py-3 text-left">
              Slug
            </th>

            <th className="px-5 py-3 text-center">
              Sort
            </th>

            <th className="px-5 py-3 text-center">
              Status
            </th>

            <th className="px-5 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {attributes.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >
                No Attributes Found
              </td>

            </tr>

          ) : (

            attributes.map((item, index) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4">
                  {index + 1}
                </td>

                <td className="px-5 py-4 font-medium">
                  {item.name}
                </td>

                <td className="px-5 py-4">
                  {item.slug}
                </td>

                <td className="px-5 py-4 text-center">
                  {item.sort_order}
                </td>

                <td className="px-5 py-4 text-center">

                  {item.status == 1 ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Inactive
                    </span>

                  )}

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
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

export default AttributeTable;