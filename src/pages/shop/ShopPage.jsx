import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';

const medicines = [
  {
    id: 1,
    name: 'Paracetamol',
    manufacturer: 'HealthCorp',
    price: 5,
    stock: 50,
    description: 'Used to treat pain and fever.',
    image: 'https://i.ibb.co/2c6vP8h/paracetamol.jpg',
  },
  {
    id: 2,
    name: 'Amoxicillin',
    manufacturer: 'Pharma Inc.',
    price: 12,
    stock: 30,
    description: 'Antibiotic for bacterial infections.',
    image: 'https://i.ibb.co/wLzSZxZ/amoxicillin.jpg',
  },
  {
    id: 3,
    name: 'Ibuprofen',
    manufacturer: 'MediHealth',
    price: 8,
    stock: 40,
    description: 'Pain reliever and anti-inflammatory.',
    image: 'https://i.ibb.co/71mGKnf/ibuprofen.jpg',
  },
  {
    id: 4,
    name: 'Cetirizine',
    manufacturer: 'AllergyPharma',
    price: 7,
    stock: 25,
    description: 'Antihistamine for allergies.',
    image: 'https://i.ibb.co/mFhNhvy/cetirizine.jpg',
  },
];

const ShopPage = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);

  const handleSelect = (medicine) => {
    if (cart.find((item) => item.id === medicine.id)) return;
    setCart([...cart, medicine]);
    alert(`Added "${medicine.name}" to cart.`);
  };

  const handleClose = () => setSelectedMedicine(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Shop Medicines</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">Medicine Name</th>
                <th className="border border-gray-300 px-4 py-2">Manufacturer</th>
                <th className="border border-gray-300 px-4 py-2">Shop</th>
                <th className="border border-gray-300 px-4 py-2">Price ($)</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{med.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{med.manufacturer}</td>
                  <td className="border border-gray-300 px-4 py-2">MediMart</td>
                  <td className="border border-gray-300 px-4 py-2">${med.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{med.stock}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleSelect(med)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
                      disabled={cart.find((item) => item.id === med.id)}
                      title={cart.find((item) => item.id === med.id) ? "Already in cart" : "Select"}
                      style={{ minWidth: '70px' }}
                    >
                      Select
                    </button>
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
                      title="View Details"
                      aria-label={`View details of ${med.name}`}
                    >
                      <EyeIcon className="h-5 w-5 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedMedicine && (
          <div className="fixed inset-0 bg-blue-100 bg-opacity-90 z-50 flex justify-center items-center px-4">
            <div className="bg-white border-2 border-blue-500 rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
              <button
                onClick={handleClose}
                className="absolute top-2 right-3 text-xl text-red-500 font-bold hover:text-red-700"
                aria-label="Close modal"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{selectedMedicine.name}</h2>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-48 object-cover rounded mb-4 border border-blue-200"
              />
              <p><span className="font-semibold text-blue-600">Manufacturer:</span> {selectedMedicine.manufacturer}</p>
              <p><span className="font-semibold text-blue-600">Sold by:</span> MediMart</p>
              <p><span className="font-semibold text-blue-600">Price:</span> ${selectedMedicine.price}</p>
              <p><span className="font-semibold text-blue-600">Stock:</span> {selectedMedicine.stock}</p>
              <p className="mt-2"><span className="font-semibold text-blue-600">Description:</span> {selectedMedicine.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
