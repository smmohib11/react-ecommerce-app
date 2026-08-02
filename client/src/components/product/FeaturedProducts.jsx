import ProductCard from "../product/ProductCard";

function FeaturedProducts({ products }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
  key={product.id}
  item={product}
/>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;