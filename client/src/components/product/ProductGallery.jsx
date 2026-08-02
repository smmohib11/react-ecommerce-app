import { useState, useEffect } from "react";

const DEFAULT_IMAGE =
  "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png";

function ProductGallery({ thumbnail, images = [] }) {
  // Thumbnail + Gallery Images
  const allImages = [
    thumbnail,
    ...images.map((item) => item.image),
  ]
    .filter(Boolean)
    .filter((img, index, self) => self.indexOf(img) === index);

  const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (allImages.length > 0) {
      setActiveImage(allImages[0]);
    } else {
      setActiveImage(DEFAULT_IMAGE);
    }
  }, [thumbnail, images]);

  return (
    <div className="lg:sticky lg:top-24">

      {/* Main Image */}

      <div className="border rounded-xl bg-white p-5 shadow-sm">

        <img
          src={activeImage || DEFAULT_IMAGE}
          alt="Product"
          className="w-full aspect-square object-contain"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />

      </div>

      {/* Thumbnails */}

      <div className="flex gap-3 mt-4 overflow-x-auto">

        {(allImages.length ? allImages : [DEFAULT_IMAGE]).map((img, index) => (

          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`border rounded-lg overflow-hidden min-w-[80px] transition-all duration-200
              ${
                activeImage === img
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-gray-300 hover:border-blue-400"
              }`}
          >

            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover"
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE;
              }}
            />

          </button>

        ))}

      </div>

    </div>
  );
}

export default ProductGallery;