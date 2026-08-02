import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function UserTable({
  users = [],
  onEdit = () => {},
  onDelete = () => {},
  onRoleChange = () => {},
  onStatusChange = () => {},
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-3 text-left">Id</th>
            <th className="px-5 py-3 text-left">User</th>
            <th className="px-5 py-3 text-left">Email</th>
            <th className="px-5 py-3 text-center">Role</th>
            <th className="px-5 py-3 text-center">Status</th>
            <th className="px-5 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (

            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No Users Found
              </td>
            </tr>

          ) : (

            users.map((user, index) => (

              <tr
                key={user.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4">
                  {index + 1}
                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        user.image ||
                        "https://ui-avatars.com/api/?name=" +
                          user.name
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>

                      <div className="font-semibold">
                        {user.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        #{user.id}
                      </div>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-4">
                  {user.email}
                </td>

                <td className="px-5 py-4 text-center">

                 <select
    value={user.role}
    onChange={(e) =>
        onRoleChange(user.id, e.target.value)
    }
    className="border rounded-lg px-3 py-2"
>
    <option value="customer">Customer</option>
    <option value="manager">Manager</option>
    <option value="admin">Admin</option>
    <option value="super_admin">Super Admin</option>
</select>
                </td>

                <td className="px-5 py-4 text-center">

                  <select
                    value={user.status}
                    onChange={(e) =>
                      onStatusChange(
                        user.id,
                        Number(e.target.value)
                      )
                    }
                    className="border rounded-lg px-3 py-1"
                  >
                    <option value={1}>
                      Active
                    </option>

                    <option value={0}>
                      Inactive
                    </option>

                  </select>

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        onEdit(user)
                      }
                      className="text-blue-600"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(user.id)
                      }
                      className="text-red-600"
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

export default UserTable;