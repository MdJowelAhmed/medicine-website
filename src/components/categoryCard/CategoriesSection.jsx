import React from 'react';
import { useNavigate } from 'react-router';

const categories = [
  {
    name: 'Tablet',
    slug: 'tablet',
    image: 'https://i.ibb.co/3BhV6Fg/tablet.jpg',
    medicineCount: 35,
  },
  {
    name: 'Syrup',
    slug: 'syrup',
    image: 'https://i.ibb.co/HBSw8t3/syrup.jpg',
    medicineCount: 22,
  },
  {
    name: 'Capsule',
    slug: 'capsule',
    image: 'https://i.ibb.co/jyMZ2f4/capsule.jpg',
    medicineCount: 28,
  },
  {
    name: 'Injection',
    slug: 'injection',
    image: 'https://i.ibb.co/Ln4htLK/injection.jpg',
    medicineCount: 16,
  },
  {
    name: 'Others',
    slug: 'others',
    image: 'https://i.ibb.co/QF3v9mt/others.jpg',
    medicineCount: 14,
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-red-500">Medicine Types</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              onClick={() => navigate(`/category/${category.slug}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-blue-100"
              title={`View all ${category.name.toLowerCase()} medicines`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-blue-600">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.medicineCount} medicines</p>
                <button className="mt-3 px-4 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
