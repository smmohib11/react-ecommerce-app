import {
  Bell,
  Search,
  Menu,
  UserCircle2,
} from "lucide-react";

function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">

      <div className="h-16 px-6 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Sidebar Button */}

          <button
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Search */}

          <div className="hidden md:flex items-center border rounded-lg px-3 h-10 w-80">

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none px-3"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          {/* Notification */}

          <button className="relative">

            <Bell size={22} />

            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
              3
            </span>

          </button>

          {/* User */}

          <div className="flex items-center gap-3 cursor-pointer">

            <UserCircle2
              size={38}
              className="text-gray-500"
            />

            <div className="hidden md:block">

              <h4 className="font-semibold">
                Admin
              </h4>

              <p className="text-sm text-gray-500">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;