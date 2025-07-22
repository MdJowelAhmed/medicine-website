import React from 'react';

const vendors = [
  {
    id: 1,
    name: 'HealthPlus Pharmacy',
    banner: 'https://i.ibb.co/V0cqWH2x/gettyimages-1089913166-612x612.jpg',
    rating: 4.9,
    location: 'Dhaka, BD',
  },
  {
    id: 2,
    name: 'MediCare Store',
    banner: 'https://i.ibb.co/xt65X1vc/gettyimages-1386962536-612x612.jpg',
    rating: 4.7,
    location: 'Chattogram, BD',
  },
  {
    id: 3,
    name: 'Green Pharma',
    banner: 'https://i.ibb.co/mr6FZ4Sz/gettyimages-1090255620-612x612.jpg',
    rating: 4.8,
    location: 'Sylhet, BD',
  },
  {
    id: 4,
    name: 'Blue Pharma',
    banner: 'https://i.ibb.co/Xf2PCbyw/gettyimages-1352489961-612x612.jpg',
    rating: 4.8,
    location: 'Rangpur, BD',
  },
];

const FeaturedVendors = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-red-500">
          🏥 Trusted Vendor Partners
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={vendor.banner}
                alt={vendor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800">{vendor.name}</h3>
                <p className="text-sm text-gray-500">{vendor.location}</p>
                <p className="text-yellow-500 font-semibold mt-2">⭐ {vendor.rating} / 5.0</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
