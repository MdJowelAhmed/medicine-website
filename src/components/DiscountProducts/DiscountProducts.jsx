import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';


import { Navigation } from 'swiper/modules';

const products = [
  {
    id: 1,
    name: 'Paracetamol',
    image: 'https://i.ibb.co/j63dfW9/pain-relief.jpg',
    price: 100,
    discountPrice: 80,
  },
  {
    id: 2,
    name: 'Cough Syrup',
    image: 'https://i.ibb.co/0q5HtnN/cold-fever.jpg',
    price: 150,
    discountPrice: 120,
  },
  {
    id: 3,
    name: 'Vitamin C',
    image: 'https://i.ibb.co/2N0vL6V/supplements.jpg',
    price: 250,
    discountPrice: 180,
  },
  {
    id: 4,
    name: 'Insulin',
    image: 'https://i.ibb.co/HVjMhZX/diabetes.jpg',
    price: 600,
    discountPrice: 500,
  },
  {
    id: 5,
    name: 'Heart Tablet',
    image: 'https://i.ibb.co/0Mrvq2F/heart-care.jpg',
    price: 300,
    discountPrice: 250,
  },
];

const DiscountProducts = () => {
  const discounted = products.filter(p => p.discountPrice < p.price);

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
          {discounted.map(product => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border  hover:shadow-lg transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Special Offer</p>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-lg">
                      ৳{product.discountPrice}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      ৳{product.price}
                    </span>
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
