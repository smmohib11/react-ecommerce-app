import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

// ================= Auth =================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ResetPassword from "../pages/auth/ResetPassword";

// ================= User =================
import Home from "../pages/user/Home";
import Shop from "../pages/user/Shop";
import ProductDetails from "../components/product/ProductDetails";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import MyOrders from "../pages/user/MyOrders";
import UserProfile from "../pages/user/Profile";

// ================= Admin =================
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Brands from "../pages/admin/Brands";
import Attributes from "../pages/admin/Attributes";
import AttributeValues from "../pages/admin/AttributeValues";
import Variations from "../pages/admin/Variations";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import Appearance from "../pages/admin/Appearance";
import Settings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/Profile";
import ShippingList from "../pages/admin/shipping/ShippingList";
import AddShipping from "../pages/admin/shipping/AddShipping";
import EditShipping from "../pages/admin/shipping/EditShipping";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= USER ================= */}

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* ================= LOGIN ================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}

        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/brands" element={<Brands />} />
          <Route path="/admin/attributes" element={<Attributes />} />
          <Route path="/admin/attribute-values" element={<AttributeValues />} />
          <Route path="/admin/variations" element={<Variations />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/appearance" element={<Appearance />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/shipping" element={<ShippingList />} />

          <Route path="/admin/shipping/add" element={<AddShipping />} />
          <Route path="/admin/shipping/edit/:id" element={<EditShipping />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
