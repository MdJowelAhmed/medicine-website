import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ShoppingCart, Star } from 'lucide-react';

const SmartBanner = () => {
  // Sample data based on your API response
  const [bannerAds, setBannerAds] = useState([
    {
      "_id": "687fcda3031072cecfa47218",
      "product": {
        "_id": "687e949f52dac9e233f09656",
        "name": "Napa Extra",
        "genericName": "Paracetamol + Caffeine",
        "description": "Fast relief for fever, headache and body pain",
        "image": "https://www.netmeds.com/images/product-v1/400x400/1093954/medi_650_tablet_10s_782293_1_0.webp",
        "category": "Pain Relief",
        "company": "Beximco Pharma",
        "massUnit": "500mg + 65mg",
        "price": 7,
        "discount": 15,
        "rating": 4.5,
        "createdAt": "2025-07-21T19:27:27.182Z"
      },
      "image": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&h=400",
      "description": "Premium quality medicine for effective pain relief",
      "seller": {
        "_id": "687e6955c5f98fbe579c039f",
        "email": "john@gmail.com",
        "role": "user"
      },
      "isActive": true,
      "createdAt": "2025-07-22T17:42:59.242Z"
    },
    {
      "_id": "688134013776d03c19052236",
      "product": {
        "_id": "687e949f52dac9e233f09657",
        "name": "Vitamin D3",
        "genericName": "Cholecalciferol",
        "description": "Essential vitamin for bone health and immunity",
        "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&h=300",
        "category": "Vitamins",
        "company": "Square Pharma",
        "massUnit": "1000 IU",
        "price": 12,
        "discount": 20,
        "rating": 4.8,
        "createdAt": "2025-07-21T19:27:27.182Z"
      },
      "image": "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&h=400",
      "description": "Boost your immunity with premium vitamin supplements",
      "seller": {
        "_id": "687fe7c859de45eb6d83a946",
        "email": "signupaddnetwork@gmail.com"
      },
      "isActive": true,
      "createdAt": "2025-07-23T19:12:01.650Z"
    },
    {
      "_id": "687fcda3031072cecfa47219",
      "product": {
        "_id": "687e949f52dac9e233f09658",
        "name": "Omega 3 Plus",
        "genericName": "Fish Oil Capsules",
        "description": "Heart healthy omega-3 fatty acids supplement",
        "image": "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=300&h=300",
        "category": "Supplements",
        "company": "ACI Pharma",
        "massUnit": "1000mg",
        "price": 25,
        "discount": 10,
        "rating": 4.6,
        "createdAt": "2025-07-21T19:27:27.182Z"
      },
      "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&h=400",
      "description": "Premium fish oil for cardiovascular health",
      "seller": {
        "_id": "687e6955c5f98fbe579c039f",
        "email": "john@gmail.com",
        "role": "user"
      },
      "isActive": true,
      "createdAt": "2025-07-22T17:42:59.242Z"
    }
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Filter only active banner ads
  const activeAds = bannerAds.filter(ad => ad.isActive);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && activeAds.length > 1 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % activeAds.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, activeAds.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % activeAds.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + activeAds.length) % activeAds.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount / 100) : price;
  };

  if (activeAds.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-600 text-lg font-medium">No banner advertisements available</p>
        </div>
      </div>
    );
  }

  const currentAd = activeAds[currentSlide];

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-white">
      {/* Progress Bar */}
      {isAutoPlay && activeAds.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white bg-opacity-20 z-30">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-100 ease-linear"
            style={{ 
              width: `${((currentSlide + 1) / activeAds.length) * 100}%`,
              animation: isHovered ? 'paused' : 'none'
            }}
          />
        </div>
      )}

      {/* Main Slider */}
      <div 
        className="flex transition-all duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {activeAds.map((ad, index) => (
          <div key={ad._id} className="min-w-full h-full relative group">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-8 rounded-full blur-lg animate-pulse delay-500"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-8 flex items-center gap-8 max-w-7xl">
                
                {/* Left Content */}
                <div className="flex-1 text-white max-w-2xl">
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-sm font-semibold text-white border border-white border-opacity-30">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      {ad.product.category}
                    </span>
                    {ad.product.discount > 0 && (
                      <span className="px-3 py-1 bg-red-500 rounded-full text-xs font-bold text-white animate-bounce">
                        {ad.product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
                    {ad.product.name}
                  </h1>

                  {/* Generic Name */}
                  <p className="text-lg text-blue-100 mb-3 font-medium">
                    {ad.product.genericName}
                  </p>

                  {/* Description */}
                  <p className="text-base text-white text-opacity-90 mb-4 leading-relaxed">
                    {ad.product.description}
                  </p>

                  {/* Rating */}
                  {ad.product.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(ad.product.rating) ? 'text-yellow-400 fill-current' : 'text-white text-opacity-30'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-white text-opacity-90 font-medium text-sm">
                        {ad.product.rating} ({Math.floor(Math.random() * 500) + 100} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-yellow-300">
                        ৳{calculateDiscountedPrice(ad.product.price, ad.product.discount).toFixed(0)}
                      </span>
                      {ad.product.discount > 0 && (
                        <span className="text-lg text-white text-opacity-60 line-through">
                          ৳{ad.product.price}
                        </span>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded-lg text-xs font-medium">
                      {ad.product.massUnit}
                    </span>
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center gap-6 mb-5">
                    <div className="text-xs text-white text-opacity-80">
                      <span className="font-semibold">Company:</span> {ad.product.company}
                    </div>
                    <div className="text-xs text-white text-opacity-80">
                      <span className="font-semibold">Trusted Seller</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-bold text-base rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
                    <span>Order Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
                  </button>
                </div>

                {/* Right Product Image */}
                <div className="flex-shrink-0 relative">
                  <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-white to-blue-200 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Product Container */}
                    <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                      <img 
                        src={ad.product.image} 
                        alt={ad.product.name}
                        className="w-48 h-48 object-contain drop-shadow-2xl"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300/6366f1/ffffff?text=Product';
                        }}
                      />
                      
                      {/* Floating Badge */}
                      {ad.product.discount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                          SAVE ৳{(ad.product.price * ad.product.discount / 100).toFixed(0)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {activeAds.length > 1 && (
        <>
          {/* Arrow Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            {activeAds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? 'w-8 h-3 bg-white shadow-lg' 
                    : 'w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-125'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-opacity-30 border border-white border-opacity-30"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAutoPlay ? 'Auto' : 'Manual'}</span>
          </button>
        </>
      )}

      {/* Slide Counter */}
      {activeAds.length > 1 && (
        <div className="absolute bottom-6 right-6 px-3 py-1 bg-black bg-opacity-30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {currentSlide + 1} / {activeAds.length}
        </div>
      )}
    </div>
  );
};

export default SmartBanner;