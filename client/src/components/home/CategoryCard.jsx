import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-110 transition">

          <img
            src={category.image}
            alt={category.name}
            className="w-12 h-12 object-contain"
          />

        </div>

        <h3 className="mt-4 font-semibold text-gray-800">
          {category.name}
        </h3>

      </div>
    </Link>
  );
}

export default CategoryCard;