import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hook/useAxiosSecure';

const CategoryDetailsPage = () => {
const  {id}  = useParams(); // Get category ID from URL
  const [medicines, setMedicines] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalMedicine, setModalMedicine] = useState(null);
  const axiosSecure = useAxiosSecure();
  console.log(medicines)
  console.log(id);

  useEffect(() => {
    if (id) {
      fetchMedicinesByCategory();
    }
  }, [id]);

  const fetchMedicinesByCategory = async () => {
    try {
      // setLoading(true);
      setError('');

      const response = await axiosSecure.get(`/products/category/${id}`);
      const result = response.data;
      console.log('Medicines by category:', result);

      if (result.success) {
        setMedicines(result.data || []);
        // Set category name from first medicine or from API response
        if (result.data && result.data.length > 0) {
          setCategoryName(result.data[0].type || result.categoryName || 'Category');
        } else {
          setCategoryName(result.categoryName || 'Category');
        }
      } else {
        setError(result.message || 'Failed to fetch medicines');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (medicine) => {
    // Here you can implement actual cart functionality
    alert(`${medicine.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading medicines...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-red-500 mb-6 capitalize text-center">
        {categoryName}
      </h2>

      {medicines.length === 0 ? (
        <p className="text-center text-gray-500">No medicines found in this category.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded shadow-sm table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Manufacturer</th>
                {/* <th className="p-3">Shop</th> */}
                <th className="p-3">Price</th>
                {/* <th className="p-3">Stock</th> */}
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr
                  key={med._id || med.id}
                  className="border-t text-center hover:bg-gray-100 align-middle"
                  style={{ verticalAlign: 'middle' }}
                >
                  <td className="p-2">
                    <img
                      src={med.image || med.imageURL}
                      alt={med.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-medicine.jpg'; // Fallback image
                      }}
                    />
                  </td>
                  <td className="p-2 font-semibold">{med.name}</td>
                  <td className="p-2">{med.company}</td>
                  {/* <td className="p-2">{med.shopName || med.shop}</td> */}
                  <td className="p-2">৳{med.price}</td>
                  {/* <td className="p-2">{med.stock}</td> */}
                  <td className="p-2 mt-4 flex items-center justify-center gap-2">
                    {/* <button
                      onClick={() => handleSelect(med)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                    >
                      Select
                    </button> */}
                    <button
                      onClick={() => setModalMedicine(med)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative border-2 border-blue-500">
            <button
              onClick={() => setModalMedicine(null)}
              className="absolute top-3 right-3 text-xl text-red-600 hover:text-red-800"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-600">{modalMedicine.name}</h3>
            <img
              src={modalMedicine.image || modalMedicine.imageURL}
              alt={modalMedicine.name}
              className="w-full h-48 object-cover rounded mb-4 border"
              onError={(e) => {
                e.target.src = '/placeholder-medicine.jpg'; // Fallback image
              }}
            />
            <p><strong>Type:</strong> {modalMedicine.type}</p>
            <p><strong>Manufacturer:</strong> {modalMedicine.manufacturer}</p>
            {/* <p><strong>Shop:</strong> {modalMedicine.shopName || modalMedicine.shop}</p> */}
            <p><strong>Price:</strong> ৳{modalMedicine.price}</p>
            {/* <p><strong>Stock:</strong> {modalMedicine.stock}</p> */}
            {modalMedicine.description && (
              <p className="mt-2">{modalMedicine.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailsPage;