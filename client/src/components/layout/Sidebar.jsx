


import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  Tags,
  Package,
  Boxes,
  Layers3,
  ShoppingCart,
  Truck,
  Users,
  UserCog,
  BarChart3,
  Palette,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";



const menuGroups = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
    ],
  },

  {
    title: "Catalog",
    items: [
      {
        name: "Products",
        icon: ShoppingBag,
        path: "/admin/products",
      },
      {
        name: "Categories",
        icon: FolderTree,
        path: "/admin/categories",
      },
      {
        name: "Brands",
        icon: Tags,
        path: "/admin/brands",
      },
      {
        name: "Attributes",
        icon: Package,
        path: "/admin/attributes",
      },
      {
        name: "Attribute Values",
        icon: Boxes,
        path: "/admin/attribute-values",
      },
      {
        name: "Variations",
        icon: Layers3,
        path: "/admin/variations",
      },
    ],
  },

  {
    title: "Sales",
    items: [
      {
        name: "Orders",
        icon: ShoppingCart,
        path: "/admin/orders",
      },
      {
        name: "Shipping",
        icon: Truck,
        path: "/admin/shipping",
      },
      {
        name: "Customers",
        icon: Users,
        path: "/admin/customers",
      },
    ],
  },

  {
    title: "Management",
    items: [
      {
        name: "Users",
        icon: UserCog,
        path: "/admin/users",
      },
      {
        name: "Reports",
        icon: BarChart3,
        path: "/admin/reports",
      },
    ],
  },

  {
    title: "Website",
    items: [
      {
        name: "Appearance",
        icon: Palette,
        path: "/admin/appearance",
      },
      {
        name: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
];

function Sidebar() {

  



  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col sticky top-0">

      {/* Logo */}

      <div className="h-16 flex items-center justify-center border-b border-slate-800">

        <h2 className="text-2xl font-bold tracking-wide">
          ADMIN PANEL
        </h2>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto py-4">

        {menuGroups.map((group) => (

          <div key={group.title} className="mb-5">

            <h4 className="px-5 mb-2 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              {group.title}
            </h4>

            {group.items.map((menu) => {

              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  className={({ isActive }) =>
                    `mx-3 mb-1 flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{menu.name}</span>
                </NavLink>
              );

            })}

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4 space-y-2">

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <User size={20} />
          <span>My Profile</span>
        </NavLink>

        <button
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;