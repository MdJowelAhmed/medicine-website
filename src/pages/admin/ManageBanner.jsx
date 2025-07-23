import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const ManageBanner = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [creatingBanner, setCreatingBanner] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Form state for new banner
  const [bannerForm, setBannerForm] = useState({
    productId: '',
    image: '',
    description: ''
  });

  // Fetch all advertised medicines from API
  useEffect(() => {
    fetchAdvertisedMedicines();
  }, []);

  const fetchAdvertisedMedicines = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/banners');
      const bannerData = response.data || response.data;
      setMedicines(bannerData.data);
    } catch (error) {
      console.error('Error fetching advertised medicines:', error);
      toast.error('Failed to fetch advertised medicines');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products for dropdown
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await axiosSecure.get('/products'); // Adjust endpoint as needed
      setProducts(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Open modal and fetch products
  const openModal = () => {
    setShowModal(true);
    fetchProducts();
  };

  // Close modal and reset form
  const closeModal = () => {
    setShowModal(false);
    setBannerForm({
      productId: '',
      image: '',
      description: ''
    });
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBannerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create new banner
  const createBanner = async (e) => {
    e.preventDefault();
    
    if (!bannerForm.productId || !bannerForm.image || !bannerForm.description) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setCreatingBanner(true);
      
      const bannerData = {
        product: bannerForm.productId,
        image: bannerForm.image,
        description: bannerForm.description
      };

      await axiosSecure.post('/banners', bannerData);
      
      toast.success('Banner created successfully!');
      closeModal();
      fetchAdvertisedMedicines(); // Refresh the list
    } catch (error) {
      console.error('Error creating banner:', error);
      toast.error('Failed to create banner');
    } finally {
      setCreatingBanner(false);
    }
  };

  // Toggle slider status for a medicine
  const toggleSliderStatus = async (id) => {
    try {
      setUpdating(id);
      
      const medicine = medicines.find(med => med._id === id);
      const newSliderStatus = !medicine.isActive;

      await axiosSecure.patch(`/banners/${id}`, {
        isActive: newSliderStatus
      });

      setMedicines((prevMedicines) =>
        prevMedicines.map((med) =>
          med._id === id ? { ...med, isActive: newSliderStatus } : med
        )
      );

      toast.success(
        newSliderStatus 
          ? 'Medicine added to slider successfully!' 
          : 'Medicine removed from slider successfully!'
      );
    } catch (error) {
      console.error('Error updating slider status:', error);
      toast.error('Failed to update slider status');
    } finally {
      setUpdating(null);
    }
  };

  // Remove medicine from banner advertisements completely
  const removeMedicineFromBanner = async (id) => {
    if (!window.confirm('Are you sure you want to remove this medicine from banner advertisements?')) {
      return;
    }

    try {
      setUpdating(id);
      
      await axiosSecure.delete(`/banners/${id}`);

      setMedicines((prevMedicines) =>
        prevMedicines.filter((med) => med._id !== id)
      );

      toast.success('Medicine removed from banner advertisements successfully!');
    } catch (error) {
      console.error('Error removing medicine from banner:', error);
      toast.error('Failed to remove medicine from banner');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Manage Banner Advertise
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Manage Banner Advertise
      </h2>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Total Advertised Medicines: {medicines.length}
        </p>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200"
        >
          Add Banner
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-red-100 text-gray-800">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Medicine Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Seller Email</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines?.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  No advertised medicines found.
                </td>
              </tr>
            ) : (
              medicines?.map((med) => (
                <tr key={med._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">
                    <img
                      src={med.image}
                      alt={med.product?.name || 'Medicine'}
                      className="h-14 w-14 object-cover rounded mx-auto"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/56?text=No+Image';
                      }}
                    />
                  </td>
                  <td className="p-3 border font-semibold">{med.product?.name || 'N/A'}</td>
                  <td className="p-3 border text-sm text-gray-700 max-w-xs">
                    {med.description || med.product?.description || 'No description'}
                  </td>
                  <td className="p-3 border">{med.seller?.email || 'N/A'}</td>
                  <td className="p-3 border">
                    <div className="flex flex-col gap-2 items-center">
                      {/* Toggle Switch for Slider */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">
                          {med.isActive ? 'In Slider' : 'Not in Slider'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={med.isActive}
                            onChange={() => toggleSliderStatus(med._id)}
                            disabled={updating === med._id}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"></div>
                        </label>
                      </div>
                      
                      {updating === med._id && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <div className="animate-spin h-3 w-3 border border-blue-600 border-t-transparent rounded-full"></div>
                          Updating...
                        </div>
                      )}
                      
                      <button
                        onClick={() => removeMedicineFromBanner(med._id)}
                        disabled={updating === med._id}
                        className="px-3 py-1 rounded text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Remove from Banner
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {medicines.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Medicines in slider: {medicines.filter(med => med.isActive).length} / {medicines.length}
          </p>
        </div>
      )}

      {/* Add Banner Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Banner</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={createBanner} className="space-y-4">
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Product
                </label>
                <select
                  name="productId"
                  value={bannerForm.productId}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={loadingProducts}
                >
                  <option value="">
                    {loadingProducts ? 'Loading products...' : 'Select a product'}
                  </option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} - {product.company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Banner Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={bannerForm.image}
                  onChange={handleFormChange}
                  placeholder="https://example.com/banner-image.jpg"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Description
                </label>
                <textarea
                  name="description"
                  value={bannerForm.description}
                  onChange={handleFormChange}
                  placeholder="Enter banner description..."
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Preview Image */}
              {bannerForm.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Preview
                  </label>
                  <img
                    src={bannerForm.image}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded transition-colors duration-200"
                  disabled={creatingBanner}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={creatingBanner}
                >
                  {creatingBanner ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating...
                    </span>
                  ) : (
                    'Create Banner'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBanner;