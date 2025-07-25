import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import useAxiosSecure from '../hook/useAxiosSecure';

const DiscountProducts = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axiosSecure.get("/products");
      const result = response.data;
      console.log(result);
      
      if (result.success) {
        // Filter products where discount > 0 (show all discounted products)
        const filteredProducts = result.data
          .filter(product => product.discount > 0);
        
        setDiscountProducts(filteredProducts);
      } else {
        setError(result.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("Discount Products:", discountProducts);

  // Show loading state
  if (loading) {
    return (
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-red-500 text-center">
            Discounted Products
          </h2>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-red-500 text-center">
            Discounted Products
          </h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  // Don't render if no discount products
  if (discountProducts.length === 0) {
    return (
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-red-500 text-center">
            Discounted Products
          </h2>
          <div className="text-center text-gray-500">No discount products available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-red-500 text-center">
          Discounted Products
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          modules={[Navigation]}
        >
          {discountProducts.map(product => (
            <SwiperSlide key={product._id}>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border hover:shadow-lg transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.genericName}</p>
                  <p className="text-xs text-gray-400 mb-2">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-lg">
                      ৳{product.price - product.discount}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ৳{product.price}
                    </span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      ৳{product.discount} OFF
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-blue-600">{product.company}</span>
                    <span className="text-xs text-gray-500 ml-2">{product.massUnit}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DiscountProducts;