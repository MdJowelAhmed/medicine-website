import React, { useEffect, useState } from 'react';

const ManageBanner = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Expanded dummy medicine data
    const dummyMedicines = [
      {
        _id: '1',
        name: 'Paracetamol',
        description: 'Effective pain relief medicine.',
        sellerEmail: 'seller1@example.com',
        image: 'https://i.ibb.co/2sNfXhx/paracetamol.jpg',
        inSlider: false,
      },
      {
        _id: '2',
        name: 'Vitamin C',
        description: 'Boosts immunity and energy levels.',
        sellerEmail: 'seller2@example.com',
        image: 'https://i.ibb.co/fSjLjJx/vitamin-c.jpg',
        inSlider: true,
      },
      {
        _id: '3',
        name: 'Cough Syrup',
        description: 'Relieves cough and soothes throat.',
        sellerEmail: 'seller3@example.com',
        image: 'https://i.ibb.co/fX0DgBx/cough-syrup.jpg',
        inSlider: false,
      },
      {
        _id: '4',
        name: 'Amoxicillin',
        description: 'Antibiotic for bacterial infections.',
        sellerEmail: 'seller4@example.com',
        image: 'https://i.ibb.co/FHf7pZv/amoxicillin.jpg',
        inSlider: false,
      },
      {
        _id: '5',
        name: 'Ibuprofen',
        description: 'Anti-inflammatory pain reliever.',
        sellerEmail: 'seller5@example.com',
        image: 'https://i.ibb.co/7Qm1mLw/ibuprofen.jpg',
        inSlider: true,
      },
      {
        _id: '6',
        name: 'Metformin',
        description: 'Used for type 2 diabetes management.',
        sellerEmail: 'seller6@example.com',
        image: 'https://i.ibb.co/z2Wcq2P/metformin.jpg',
        inSlider: false,
      },
      {
        _id: '7',
        name: 'Loratadine',
        description: 'Allergy relief medication.',
        sellerEmail: 'seller7@example.com',
        image: 'https://i.ibb.co/s2rN0Gh/loratadine.jpg',
        inSlider: true,
      },
      {
        _id: '8',
        name: 'Omeprazole',
        description: 'Reduces stomach acid.',
        sellerEmail: 'seller8@example.com',
        image: 'https://i.ibb.co/5KF7p2Z/omeprazole.jpg',
        inSlider: false,
      },
      {
        _id: '9',
        name: 'Azithromycin',
        description: 'Antibiotic used to treat infections.',
        sellerEmail: 'seller9@example.com',
        image: 'https://i.ibb.co/kJbP7P9/azithromycin.jpg',
        inSlider: false,
      },
      {
        _id: '10',
        name: 'Hydrocortisone Cream',
        description: 'Used to treat skin irritations.',
        sellerEmail: 'seller10@example.com',
        image: 'https://i.ibb.co/vX8x4cY/hydrocortisone.jpg',
        inSlider: true,
      },
    ];
    setMedicines(dummyMedicines);
  }, []);

  const toggleSliderStatus = (id) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med._id === id ? { ...med, inSlider: !med.inSlider } : med
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Manage Banner Advertise
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-red-100 text-gray-800">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Medicine Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Seller Email</th>
              <th className="p-3 border">Toggle Slide</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No advertised medicines found.
                </td>
              </tr>
            ) : (
              medicines.map((med) => (
                <tr key={med._id} className="border-t">
                  <td className="p-3 border">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="h-14 w-14 object-cover rounded mx-auto"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-3 border font-semibold">{med.name}</td>
                  <td className="p-3 border text-sm text-gray-700">{med.description}</td>
                  <td className="p-3 border">{med.sellerEmail}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => toggleSliderStatus(med._id)}
                      className={`px-4 py-2 rounded font-medium text-white transition-colors duration-200 ${
                        med.inSlider
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                      aria-label={med.inSlider ? 'Remove from slider' : 'Add to slider'}
                    >
                      {med.inSlider ? 'Remove from Slider' : 'Add to Slider'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBanner;
