import { Link } from "react-router-dom";
import heroImg from "../../assets/hero-banner.png";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">

              🔥 New Collection 2026

            </span>

            <h1 className="text-5xl font-extrabold mt-6 leading-tight">

              Shop Smarter

              <br />

              Live Better

            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8">

              Discover thousands of premium products at unbeatable
              prices with fast delivery across Bangladesh.

            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/shop"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
              >
                Shop Now
              </Link>

              <Link
    to="/shop"
    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl"
>
    Browse Categories
</Link>

            </div>

          </div>

          {/* Right */}

          <div>

            <img
              src={heroImg}
              alt="Hero Banner"
              className="w-full"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;