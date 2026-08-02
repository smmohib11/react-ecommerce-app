import { Pencil, Trash2 } from "lucide-react";

function BrandTable({ brands, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Logo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Slug</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>

          {brands.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-10 text-gray-500"
              >
                No Brands Found
              </td>
            </tr>
          ) : (
            brands.map((brand) => (
              <tr
                key={brand.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={
                      brand.logo
                        ? `http://localhost:5000${brand.logo}`
                        : "https://placehold.co/60x60?text=Logo"
                    }
                    alt={brand.name}
                    className="w-14 h-14 rounded object-cover border"
                  />
                </td>

                <td className="p-3 font-medium">
                  {brand.name}
                </td>

                <td className="p-3 text-gray-500">
                  {brand.slug}
                </td>

                <td className="p-3 text-center">
                  {brand.status == 1 ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(brand)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(brand.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
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

export default BrandTable;