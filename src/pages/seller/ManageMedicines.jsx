import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    genericName: '',
    description: '',
    image: null, // Change to null for file upload
    category: '',
    company: '',
    massUnit: '',
    price: '',
    stock: '',
    discount: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const token= localStorage.getItem('accessToken');
  const axiosSecure = useAxiosSecure();

  console.log(token);

  // ImgBB API configuration
  const IMGBB_API_KEY = 'ea59a5c9204f19d69a83ea436c243017';
  const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

  // Function to upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    if (!imageFile) return '';

    try {
      const formData = new FormData();
      formData.append('key', IMGBB_API_KEY);
      formData.append('image', imageFile);

      const response = await fetch(IMGBB_API_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        return result.data.url;
      } else {
        throw new Error(result.error?.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('ImgBB upload error:', error);
      throw new Error('Image upload failed: ' + error.message);
    }
  };

  // Fetch medicines from API
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          'Authorization': ` ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }

      const result = await response.json();
      
      if (result.success) {
        setMedicines(result.data);
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        e.target.value = '';
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        e.target.value = '';
        return;
      }

      setNewMedicine(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewMedicine(prev => ({ ...prev, image: null }));
      setImagePreview(null);
    }
  };

  

const handleAddMedicine = async () => {
  const {
    name,
    genericName,
    description,
    category,
    company,
    massUnit,
    price,
    stock,
    discount,
    image,
  } = newMedicine;

  // Basic validation
  if (
    !name.trim() ||
    !genericName.trim() ||
    !price ||
    !massUnit.trim() ||
    !category.trim() ||
    !company.trim()
  ) {
    alert('Please fill all required fields correctly.');
    return;
  }

  if (price <= 0) {
    alert('Price must be greater than 0');
    return;
  }

  setSubmitting(true);
  setError('');

  try {
    let imageUrl = '';

    // Upload image to imgbb
    if (image) {
      try {
        setError('Uploading image...');
        imageUrl = await uploadImageToImgBB(image);
        setError('');
      } catch (imageError) {
        setError('Failed to upload image. Please try again.');
        setSubmitting(false);
        return;
      }
    }

    const medicineData = {
      name: name.trim(),
      genericName: genericName.trim(),
      description: description.trim(),
      image: imageUrl,
      category: category.trim(),
      company: company.trim(),
      massUnit: massUnit.trim(),
      price: Number(price),
      stock: stock ? Number(stock) : 0,
      discount: Number(discount) || 0,
    };

    // 🔐 Use axiosSecure instead of fetch
    const { data } = await axiosSecure.post('/products', medicineData);

    if (data?.success) {
      await fetchMedicines();

      setNewMedicine({
        name: '',
        genericName: '',
        description: '',
        image: null,
        category: '',
        company: '',
        massUnit: '',
        price: '',
        stock: '',
        discount: 0,
      });

      setImagePreview(null);
      setShowModal(false);

      alert('Medicine added successfully!');
    } else {
      setError(data?.message || 'Failed to add medicine');
    }
  } catch (err) {
    setError('Error connecting to server: ' + err.message);
    console.error('Add medicine error:', err);
  } finally {
    setSubmitting(false);
  }
};


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg">Loading medicines...</span>
        </div>
      </div>
    );
  }

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

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Generic Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Mass Unit</th>
              <th className="p-3 border">Price (৳)</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Discount (%)</th>
              <th className="p-3 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-4 text-gray-500">
                  No medicines found.
                </td>
              </tr>
            ) : (
              medicines.map(med => (
                <tr key={med._id} className="border-t hover:bg-blue-50">
                  <td className="p-2 border">
                    {med.image ? (
                      <img
                        src={med.image}
                        alt={med.name}
                        className="h-12 w-12 object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div className="text-xs text-gray-500 hidden">No Image</div>
                  </td>
                  <td className="p-3 border font-medium">{med.name}</td>
                  <td className="p-3 border">{med.genericName}</td>
                  <td className="p-3 border text-sm">{med.description}</td>
                  <td className="p-3 border">{med.category}</td>
                  <td className="p-3 border">{med.company}</td>
                  <td className="p-3 border">{med.massUnit}</td>
                  <td className="p-3 border">৳{med.price}</td>
                  <td className="p-3 border">{med.stock || 'N/A'}</td>
                  <td className="p-3 border">{med.discount}%</td>
                  <td className="p-3 border text-sm">{formatDate(med.createdAt)}</td>
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
                setError('');
                // Reset file input
                const fileInput = document.getElementById('imageInput');
                if (fileInput) fileInput.value = '';
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
              aria-label="Close Modal"
              disabled={submitting}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Medicine</h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Medicine Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newMedicine.name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Generic Name *</label>
                <input
                  type="text"
                  name="genericName"
                  value={newMedicine.genericName}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={newMedicine.description}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full border px-3 py-2 rounded resize-none disabled:bg-gray-100"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Medicine Image</label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={submitting}
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPEG, PNG, GIF, WebP (Max: 10MB)
                </p>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Category *</label>
                <input
                  type="text"
                  name="category"
                  value={newMedicine.category}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="e.g., Pain Relief, Antibiotic"
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={newMedicine.company}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="e.g., Beximco Pharma"
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Mass Unit *</label>
                <input
                  type="text"
                  name="massUnit"
                  value={newMedicine.massUnit}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="e.g., 500mg, 10ml"
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Price (৳) *</label>
                <input
                  type="number"
                  name="price"
                  value={newMedicine.price}
                  onChange={handleChange}
                  required
                  min="0.01"
                  step="0.01"
                  disabled={submitting}
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={newMedicine.stock}
                  onChange={handleChange}
                  min="0"
                  disabled={submitting}
                  placeholder="Optional"
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
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
                  disabled={submitting}
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                  placeholder="Default 0"
                />
              </div>

              <button
                type="button"
                onClick={handleAddMedicine}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Adding Medicine...' : 'Add Medicine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;