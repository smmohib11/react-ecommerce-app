import { useEffect, useState } from "react";

import Hero from "../../components/home/Hero";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/product/FeaturedProducts";

import { getProducts } from "../../services/product.service";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();

      // তোমার API অনুযায়ী এটা পরিবর্তন হবে
      setProducts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Hero />

      <CategorySection />

      <FeaturedProducts
        products={products}
      />
    </>
  );
}

export default Home;