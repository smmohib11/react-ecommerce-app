import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { getCategories } from "../../services/category.service";

function CategorySection() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {

    try {

      const res = await getCategories();

      setCategories(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <section className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-3xl font-bold">
            Shop By Category
          </h2>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {categories.map(category => (

            <CategoryCard
              key={category.id}
              category={category}
            />

          ))}

        </div>

      </div>

    </section>

  );

}

export default CategorySection;