import React, { useState } from 'react';

const AskForAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      name: 'Napa Extra',
      image: 'https://i.ibb.co/GJx7PRf/napa.jpg',
      description: 'Fast relief from headache and fever.',
      status: 'not used',
    },
    {
      id: 2,
      name: 'Seclo 20mg',
      image: 'https://i.ibb.co/X5Yvddc/seclo.jpg',
      description: 'Best for gastric pain and acid.',
      status: 'used',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAd, setNewAd] = useState({
    name: '',
    image: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setNewAd({ ...newAd, [e.target.name]: e.target.value });
  };

  const handleAddAd = () => {
    const newAdvertisement = {
      id: advertisements.length + 1,
      ...newAd,
      status: 'not used',
    };
    setAdvertisements([...advertisements, newAdvertisement]);
    setShowModal(false);
    setNewAd({ name: '', image: '', description: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ask For Advertisement</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Advertisement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Medicine Image</th>
              <th className="p-3 border">Medicine Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((ad, index) => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  <img src={ad.image} alt={ad.name} className="w-20 h-12 object-cover rounded" />
                </td>
                <td className="p-3 border font-medium">{ad.name}</td>
                <td className="p-3 border">{ad.description}</td>
                <td className="p-3 border">
                  <span
                    className={
                      ad.status === 'used'
                        ? 'text-green-600 font-semibold'
                        : 'text-yellow-600 font-semibold'
                    }
                  >
                    {ad.status}
                  </span>
                </td>
              </tr>
            ))}
            {advertisements.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No advertisement requests submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Advertisement</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newAd.name}
                onChange={handleInputChange}
                placeholder="Medicine Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="image"
                value={newAd.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                value={newAd.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAd}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskForAdvertisement;
