import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Search,
  ShoppingCart,
  Eye,
  Star,
} from "lucide-react";

import { getProducts } from "../../services/product.service";
import { getCategories } from "../../services/category.service";
import { useCart } from "../../context/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${item.name} has been added to your cart`,
      toast: true,
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category ? item.category_id == category : true
    )
    .sort((a, b) => {
      if (sort === "low")
        return a.price - b.price;

      if (sort === "high")
        return b.price - a.price;

      if (sort === "name")
        return a.name.localeCompare(b.name);

      return 0;
    });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero */}

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-10">

          <h1 className="text-4xl font-bold">
            Shop
          </h1>

          <p className="text-gray-500 mt-2">
            Browse all products
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-4 gap-6">

        {/* Sidebar */}

        <div className="bg-white rounded-xl shadow p-5 h-fit">

          <h2 className="font-bold text-xl mb-5">
            Filters
          </h2>

          {/* Search */}

          <div className="relative mb-5">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Product..."
              className="w-full border rounded-lg pl-10 pr-3 py-2"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Category */}

          <select
            className="w-full border rounded-lg p-3 mb-5"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sort */}

          <select
            className="w-full border rounded-lg p-3"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="">
              Sort By
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

            <option value="name">
              Name A-Z
            </option>

          </select>

        </div>

        {/* Products */}

        <div className="lg:col-span-3">

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredProducts.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >

                <div className="relative">

                  <img
                    src={
                      item.thumbnail ||
                      "/no-image.png"
                    }
                    alt={item.name}
                    className="w-full h-60 object-cover"
                  />

                  {item.discount_price > 0 && (

                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">

                      {Math.round(
                        ((item.price -
                          item.discount_price) /
                          item.price) *
                          100
                      )}
                      % OFF

                    </span>

                  )}

                </div>

                <div className="p-5">

                  <h3 className="font-bold text-lg line-clamp-2">

                    {item.name}

                  </h3>

                  <div className="flex items-center gap-1 mt-2">

                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm">
                      4.8
                    </span>

                  </div>

                  <div className="mt-3 flex items-center gap-2">

                    {item.discount_price > 0 ? (
                      <>
                        <span className="text-xl font-bold text-blue-600">

                          ৳
                          {item.discount_price}

                        </span>

                        <span className="line-through text-gray-400">

                          ৳{item.price}

                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-blue-600">

                        ৳{item.price}

                      </span>
                    )}

                  </div>

                  <div className="mt-5 flex gap-2">

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700"
                    >

                      <ShoppingCart size={18} />

                      Cart

                    </button>

                    <Link
                      to={`/product/${item.id}`}
                      className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                    >
                      <Eye size={20} />
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Shop;