import { Link } from "react-router-dom";

function Breadcrumb({ category, product }) {
  return (
    <div className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
      <Link to="/" className="hover:text-blue-600">
        Home
      </Link>

      <span>/</span>

      <Link to={`/category/${category}`} className="hover:text-blue-600">
        {category}
      </Link>

      <span>/</span>

      <span className="text-gray-800 font-medium">
        {product}
      </span>
    </div>
  );
}

export default Breadcrumb;