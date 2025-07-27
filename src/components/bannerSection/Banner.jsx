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
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [bannerAds, setBannerAds] = useState([]);
  console.log(bannerAds);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only active banners
  const activeBanners = bannerAds.filter(banner => banner.isActive === true);

  useEffect(() => {
    if (activeBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [activeBanners.length]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axiosSecure.get('/banners');
      const result = response.data;
      console.log(result);

      if (result.success) {
        setBannerAds(result.data);
      } else {
        setError(result.message || 'Failed to fetch banners');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + activeBanners.length) % activeBanners.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length);
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-teal-600 to-green-600 text-white flex items-center justify-center">
        <div className="text-xl">Loading banners...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-teal-600 to-green-600 text-white flex items-center justify-center">
        <div className="text-xl text-red-300">Error: {error}</div>
      </div>
    );
  }

  if (activeBanners.length === 0) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-teal-600 to-green-600 text-white flex items-center justify-center">
        <div className="text-xl">No active banners available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-teal-600 to-green-600 text-white flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-7xl px-4 md:px-12 relative">
        {activeBanners.map((ad, index) => (
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
                  {ad.product?.name || 'Product Banner'}
                </h1>
                <p className="text-white/90 text-lg">
                  {ad.description || ad.product?.description || 'No description available'}
                </p>
                
                {/* Product Details */}
                <div className="space-y-2">
                  {ad.product?.genericName && (
                    <div className="text-white/80 text-sm">
                      Generic: <span className="font-medium">{ad.product.genericName}</span>
                    </div>
                  )}
                  {ad.product?.company && (
                    <div className="text-white/80 text-sm">
                      Company: <span className="font-medium">{ad.product.company}</span>
                    </div>
                  )}
                  {ad.product?.massUnit && (
                    <div className="text-white/80 text-sm">
                      Unit: <span className="font-medium">{ad.product.massUnit}</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                {ad.product?.price && (
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-3xl font-bold text-yellow-400">
                      ৳{ad.product.price}
                    </span>
                    {ad.product?.discount > 0 && (
                      <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                        {ad.product.discount}% OFF
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 mt-4">
                  {/* <button className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-5 py-2 transition-all">
                    <ShoppingCart className="w-4 h-4" />
                    View Product
                  </button> */}
                  <span className="text-xs bg-white/10 px-2 py-1">
                    Available Now
                  </span>
                </div>
                
                <div className="text-sm text-white/70">
                  Seller: {ad.seller?.email || 'Unknown'}
                </div>
              </div>

              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={ad.image || ad.product?.image}
                  alt={ad.product?.name || 'Product'}
                  className="w-40 md:w-52 object-contain drop-shadow-xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
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
        )}

        {/* Dots indicator */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartBanner;