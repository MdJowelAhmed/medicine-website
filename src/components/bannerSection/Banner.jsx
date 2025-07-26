import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from 'lucide-react';
import useAxiosSecure from '../hook/useAxiosSecure';

const SmartBanner = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

  const [bannerAds, setBannerAds] = useState([
    {
      _id: '687fcda3031072cecfa47218',
      product: {
        _id: 'product1',
        name: 'Herbal Cold Relief Syrup',
        description:
          'Soothes throat, clears nasal congestion, and boosts immunity with natural ingredients.',
        price: 14.99,
        ratings: 4.5,
        image: 'https://i.ibb.co/YcjYtc9/kids-medicine.webp',
      },
    },
    {
      _id: '687fcda3031072cecfa47219',
      product: {
        _id: 'product2',
        name: 'Organic Digestive Tablets',
        description:
          'Promotes healthy digestion and relieves bloating using herbal extracts.',
        price: 9.99,
        ratings: 4.2,
        image: 'https://i.ibb.co/zZV08Tw/medicine-green.webp',
      },
    },
  ]);

    useEffect(() => {
      fetchBanner();
    }, []);
  
    const fetchBanner = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axiosSecure.get('/products');
        if (response.data.success) {
          setBannerAds(response.data.data);
        } else {
          setError(response.message || 'Failed to fetch medicines');
        }
      } catch (err) {
        setError('Error connecting to server: ' + err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerAds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerAds.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bannerAds.length) % bannerAds.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerAds.length);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-teal-600 to-green-600 text-white flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-7xl px-4 md:px-12 relative">
        {bannerAds.map((ad, index) => (
          <div
            key={ad._id}
            className={`transition-opacity duration-700 ${
              index === currentIndex
                ? 'opacity-100 relative'
                : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
              {/* Text Content */}
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-snug">
                  {ad.product.name}
                </h1>
                <p className="text-white/90 text-lg">{ad.product.description}</p>
                <div className="flex items-center gap-2 text-white/90">
                  <span className="text-2xl font-bold text-yellow-400">
                    {ad.product.ratings}
                  </span>
                  <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-sm">from verified buyers</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <button className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-5 py-2 transition-all">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now - ${ad.product.price}
                  </button>
                  <span className="text-xs bg-white/10 px-2 py-1">
                    Limited Time Offer
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={ad.product.image}
                  alt={ad.product.name}
                  className="w-40 md:w-52 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={goToPrevious}
            className="bg-white/20 text-white p-2 hover:bg-white/30 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="bg-white/20 text-white p-2 hover:bg-white/30 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartBanner;
