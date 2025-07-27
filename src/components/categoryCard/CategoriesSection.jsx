import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../hook/useAxiosSecure';

const CategoriesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axiosSecure.get('/categories');
      const result = response.data;
      console.log(result);

      if (result.success) {
        setCategories(result.data);
      } else {
        setError(result.message || 'Failed to fetch categories');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const allCategories = categories.slice(0, 6) || [];

  const handleCategoryClick = (category) => {
    // Navigate using category ID instead of slug
    navigate(`/category/${category._id || category.id}`);
  };

  if (loading) {
    return (
      <section className="w-full py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-40">
            <div className="text-lg text-gray-500">Loading categories...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-40">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-red-500">Medicine Types</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <div
              key={category._id || category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-blue-100"
              title={`View all ${category.name.toLowerCase()} medicines`}
            >
              <img
                src={category.imageURL}
                alt={category.name}
                className="w-full h-40 object-cover rounded-t-xl"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Fallback image
                }}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-blue-600">{category.name}</h3>
                {/* <p className="text-sm text-gray-500">
                  {category.medicineCount || 0} medicines
                </p> */}
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