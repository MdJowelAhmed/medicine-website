import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const medicineData = [
  {
    id: 1,
    name: 'Paracetamol',
    type: 'Tablet',
    price: 30,
    image: 'https://i.ibb.co/sb9GQqD/paracetamol.jpg',
    description: 'Used to treat pain and fever.',
    stock: 20,
    manufacturer: 'Square Pharma',
    shopName: 'MediPlus Pharmacy'
  },
  {
    id: 2,
    name: 'Ibuprofen',
    type: 'Tablet',
    price: 40,
    image: 'https://i.ibb.co/mhW54P2/ibuprofen.jpg',
    description: 'Effective pain relief and anti-inflammatory.',
    stock: 35,
    manufacturer: 'ACI Limited',
    shopName: 'HealthCare Mart'
  },
  {
    id: 3,
    name: 'Aspirin',
    type: 'Tablet',
    price: 35,
    image: 'https://i.ibb.co/0Mrvq2F/heart-care.jpg',
    description: 'Used for mild to moderate pain relief.',
    stock: 25,
    manufacturer: 'Beximco Pharma',
    shopName: 'Bhalo Drug Store'
  },
  {
    id: 4,
    name: 'Cough Syrup',
    type: 'Syrup',
    price: 15,
    image: 'https://i.ibb.co/DfLcRjZ/cough-syrup.jpg',
    description: 'Relieves cough symptoms effectively.',
    stock: 30,
    manufacturer: 'Opsonin Pharma',
    shopName: 'MediHouse'
  },
  {
    id: 5,
    name: 'Cold Flu Tablets',
    type: 'Tablet',
    price: 25,
    image: 'https://i.ibb.co/FmF5X06/cold-flu.jpg',
    description: 'For relief from cold and flu symptoms.',
    stock: 40,
    manufacturer: 'Renata Ltd.',
    shopName: 'Wellness Pharmacy'
  },
  {
    id: 6,
    name: 'Nasal Spray',
    type: 'Spray',
    price: 18,
    image: 'https://i.ibb.co/6ZR7D6m/nasal-spray.jpg',
    description: 'Decongestant nasal spray.',
    stock: 50,
    manufacturer: 'GSK',
    shopName: 'Doctor’s Hub'
  },
  {
    id: 7,
    name: 'Insulin',
    type: 'Injection',
    price: 450,
    image: 'https://i.ibb.co/WVcGcbd/insulin.jpg',
    description: 'Regulates blood sugar levels.',
    stock: 10,
    manufacturer: 'Novo Nordisk',
    shopName: 'InsuLife Pharmacy'
  },
  {
    id: 8,
    name: 'Metformin',
    type: 'Tablet',
    price: 60,
    image: 'https://i.ibb.co/3rsTqpp/metformin.jpg',
    description: 'Oral medication for type 2 diabetes.',
    stock: 40,
    manufacturer: 'Sanofi Aventis',
    shopName: 'GlucoCare'
  },
  {
    id: 9,
    name: 'Glipizide',
    type: 'Tablet',
    price: 55,
    image: 'https://i.ibb.co/YjpQ3nB/glipizide.jpg',
    description: 'Helps control blood sugar levels.',
    stock: 35,
    manufacturer: 'Ziska Pharma',
    shopName: 'SugarFree Pharma'
  },
  {
    id: 10,
    name: 'Aspirin (Heart)',
    type: 'Tablet',
    price: 50,
    image: 'https://i.ibb.co/0Mrvq2F/heart-care.jpg',
    description: 'Used for heart-related conditions.',
    stock: 15,
    manufacturer: 'Incepta',
    shopName: 'CardioMedic Store'
  },
  {
    id: 11,
    name: 'Atorvastatin',
    type: 'Tablet',
    price: 80,
    image: 'https://i.ibb.co/nCK8zXz/atorvastatin.jpg',
    description: 'Lowers cholesterol to prevent heart disease.',
    stock: 25,
    manufacturer: 'Acme Laboratories',
    shopName: 'HeartWell'
  },
  {
    id: 12,
    name: 'Beta Blocker',
    type: 'Tablet',
    price: 70,
    image: 'https://i.ibb.co/8mTfNs6/beta-blocker.jpg',
    description: 'Controls heart rate and blood pressure.',
    stock: 20,
    manufacturer: 'Drug International',
    shopName: 'HeartLine Drugs'
  },
  {
    id: 13,
    name: 'Fish Oil',
    type: 'Capsule',
    price: 55,
    image: 'https://i.ibb.co/Rb0pyqR/fish-oil.jpg',
    description: 'Supports heart and brain health.',
    stock: 30,
    manufacturer: 'Sundarban Pharma',
    shopName: 'WellnessZone'
  },
];

const CategoryDetailsPage = () => {
  const { categoryName } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [modalMedicine, setModalMedicine] = useState(null);

  useEffect(() => {
    const filtered = medicineData.filter(
      (med) => med.type.toLowerCase() === categoryName.toLowerCase()
    );
    setMedicines(filtered);
  }, [categoryName]);

  const handleSelect = (medicine) => {
    alert(`${medicine.name} added to cart!`);
  };

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
                <th className="p-3">Shop</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr
                  key={med.id}
                  className="border-t text-center hover:bg-gray-100 align-middle"
                  style={{ verticalAlign: 'middle' }}
                >
                  <td className="p-2">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-2 font-semibold">{med.name}</td>
                  <td className="p-2">{med.manufacturer}</td>
                  <td className="p-2">{med.shopName}</td>
                  <td className="p-2">৳{med.price}</td>
                  <td className="p-2">{med.stock}</td>
                  <td className="p-2 mt-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleSelect(med)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1"
                    >
                      Select
                    </button>
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
              src={modalMedicine.image}
              alt={modalMedicine.name}
              className="w-full h-48 object-cover rounded mb-4 border"
            />
            <p><strong>Type:</strong> {modalMedicine.type}</p>
            <p><strong>Manufacturer:</strong> {modalMedicine.manufacturer}</p>
            <p><strong>Shop:</strong> {modalMedicine.shopName}</p>
            <p><strong>Price:</strong> ৳{modalMedicine.price}</p>
            <p><strong>Stock:</strong> {modalMedicine.stock}</p>
            <p className="mt-2">{modalMedicine.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailsPage;
