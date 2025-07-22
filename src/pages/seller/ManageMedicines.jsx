import React, { useState, useEffect } from 'react';

const dummyCategories = [
  'Tablet',
  'Syrup',
  'Capsule',
  'Injection',
  'Others',
];

const dummyCompanies = [
  'Beximco',
  'Square',
  'Incepta',
  'Eskayef',
];

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    itemName: '',
    genericName: '',
    description: '',
    image: '',
    category: '',
    company: '',
    massUnit: 'Mg',
    price: '',
    discount: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Load dummy medicines - replace with API fetch in real app
    const dummy = [
      {
        id: '1',
        itemName: 'Paracetamol',
        genericName: 'Acetaminophen',
        description: 'Used for pain relief',
        image: 'https://i.ibb.co/VVfMzhB/tablet.jpg',
        category: 'Tablet',
        company: 'Beximco',
        massUnit: 'Mg',
        price: 10,
        discount: 5,
      },
      {
        id: '2',
        itemName: 'Cough Syrup',
        genericName: 'Dextromethorphan',
        description: 'Relieves cough',
        image: 'https://i.ibb.co/mTcmQFv/syrup.jpg',
        category: 'Syrup',
        company: 'Square',
        massUnit: 'ML',
        price: 50,
        discount: 0,
      },
    ];
    setMedicines(dummy);
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewMedicine(prev => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Add new medicine
  const handleAddMedicine = (e) => {
    e.preventDefault();
    const {
      itemName,
      genericName,
      description,
      category,
      company,
      massUnit,
      price,
      discount,
    } = newMedicine;

    // Basic validation
    if (
      !itemName.trim() ||
      !genericName.trim() ||
      !description.trim() ||
      !category ||
      !company ||
      !massUnit ||
      !price ||
      price <= 0
    ) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const newMed = {
      id: Date.now().toString(),
      itemName,
      genericName,
      description,
      image: imagePreview || '', // Use base64 preview as image source
      category,
      company,
      massUnit,
      price: Number(price),
      discount: Number(discount) || 0,
    };

    setMedicines(prev => [...prev, newMed]);

    // Reset form
    setNewMedicine({
      itemName: '',
      genericName: '',
      description: '',
      image: '',
      category: '',
      company: '',
      massUnit: 'Mg',
      price: '',
      discount: 0,
    });
    setImagePreview(null);
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Medicines</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Medicine
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Item Name</th>
              <th className="p-3 border">Generic Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Mass Unit</th>
              <th className="p-3 border">Price (৳)</th>
              <th className="p-3 border">Discount (%)</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-500">
                  No medicines found.
                </td>
              </tr>
            ) : (
              medicines.map(med => (
                <tr key={med.id} className="border-t hover:bg-blue-50">
                  <td className="p-2 border">
                    {med.image ? (
                      <img
                        src={typeof med.image === 'string' ? med.image : imagePreview}
                        alt={med.itemName}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="p-3 border font-medium">{med.itemName}</td>
                  <td className="p-3 border">{med.genericName}</td>
                  <td className="p-3 border">{med.description}</td>
                  <td className="p-3 border">{med.category}</td>
                  <td className="p-3 border">{med.company}</td>
                  <td className="p-3 border">{med.massUnit}</td>
                  <td className="p-3 border">{med.price}</td>
                  <td className="p-3 border">{med.discount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Medicine Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative max-h-[90vh] overflow-auto">
            <button
              onClick={() => {
                setShowModal(false);
                setImagePreview(null);
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
              aria-label="Close Modal"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Medicine</h3>

            <form onSubmit={handleAddMedicine} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={newMedicine.itemName}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Generic Name</label>
                <input
                  type="text"
                  name="genericName"
                  value={newMedicine.genericName}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <textarea
                  name="description"
                  value={newMedicine.description}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-20 w-20 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  name="category"
                  value={newMedicine.category}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Category</option>
                  {dummyCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Company</label>
                <select
                  name="company"
                  value={newMedicine.company}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Company</option>
                  {dummyCompanies.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Item Mass Unit</label>
                <select
                  name="massUnit"
                  value={newMedicine.massUnit}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Mg">Mg</option>
                  <option value="ML">ML</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Per Unit Price (৳)</label>
                <input
                  type="number"
                  name="price"
                  value={newMedicine.price}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Discount Percentage</label>
                <input
                  type="number"
                  name="discount"
                  value={newMedicine.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Default 0"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Medicine
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
