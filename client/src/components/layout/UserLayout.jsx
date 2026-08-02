import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function UserLayout() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default UserLayout;