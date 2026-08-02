import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminHeader() {
  return (
    <header className="bg-white shadow h-16 px-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        Admin Dashboard
      </h2>

      <div>
        Admin
      </div>
    </header>
  );
}

export default AdminHeader;