import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import { Search, Heart, User, ShoppingCart } from "lucide-react";

function Header() {
  const { settings } = useSettings();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {settings?.logo ? (
              <img
                src={`http://localhost:5000/${settings.logo}`}
                alt={settings?.website_name || "Logo"}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-3xl font-bold text-blue-600">
                {settings?.website_name || "MyShop"}
              </span>
            )}
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-xl mx-10 relative"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full border rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
            >
              <Search size={22} />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <Heart size={24} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={26} />

              {cartCount > 0 && (
                <span
                  className="
                  absolute 
                  -top-2 
                  -right-2 
                  bg-red-600 
                  text-white 
                  w-5 
                  h-5 
                  rounded-full 
                  text-xs 
                  flex 
                  items-center 
                  justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link to="/profile">
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto h-14 px-4 flex items-center gap-8">
          <Link to="/">Home</Link>

          <Link to="/shop">Shop</Link>

          <Link to="/categories">Categories</Link>

          <Link to="/brands">Brands</Link>

          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
