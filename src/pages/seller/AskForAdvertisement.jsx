import React, { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, Edit3, Trash2, X, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const AdvertisementManagement = () => {
  const [banners, setBanners] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    product: null,
    image: '',
    description: ''
  });

  // Fetch banners and medicines from API
  useEffect(() => {
    fetchBanners();
    fetchMedicines();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axiosSecure.get("/banners/my-banners");
      console.log(response);
      setBanners(response.data.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      alert('Failed to fetch advertisements');
    }
  };
  console.log(banners)

  const fetchMedicines = async () => {
    try {
      // Assuming you have an endpoint for seller's medicines
      const response = await axiosSecure.get("/products");
      console.log(response)
      setMedicines(response.data.data || []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      alert('Failed to fetch medicines');
    } finally {
      setFetchingData(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.product || !formData.image || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosSecure.post("/banners", formData);

      // Add the new banner to the state
      setBanners(prev => [...prev, response.data]);
      setShowModal(false);
      setFormData({ product: null, image: '', description: '' });
      alert('Advertisement created successfully!');
    } catch (error) {
      console.error('Error creating banner:', error);
      alert('Failed to create advertisement');
    } finally {
      setLoading(false);
    }
  };

  const toggleBannerStatus = async (bannerId) => {
    try {
      // Assuming you have an endpoint to update banner status
      await axiosSecure.patch(`/banners/${bannerId}/toggle-status`);

      setBanners(prev => prev.map(banner =>
        banner._id === bannerId
          ? { ...banner, status: banner.status === 'active' ? 'inactive' : 'active' }
          : banner
      ));
    } catch (error) {
      console.error('Error toggling banner status:', error);
      alert('Failed to update advertisement status');
    }
  };

  const deleteBanner = async (bannerId) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      try {
        await axiosSecure.delete(`/banners/${bannerId}`);
        setBanners(prev => prev.filter(banner => banner._id !== bannerId));
        alert('Advertisement deleted successfully!');
      } catch (error) {
        console.error('Error deleting banner:', error);
        alert('Failed to delete advertisement');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advertisement Management</h1>
              <p className="text-gray-600 mt-1">Manage your medicine advertisements for the slider section</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={fetchingData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              Add Advertisement
            </button>
          </div>
        </div>

        {/* Loading State */}
        {fetchingData ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Loader2 size={48} className="mx-auto animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading advertisements...</h3>
            <p className="text-gray-500">Please wait while we fetch your data</p>
          </div>
        ) : (
          <>
            {/* Banners Grid */}
            {banners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                  <div key={banner._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Banner Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={banner.image}
                        alt="Advertisement"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LXNpemU9IjE0Ij5BZCBJbWFnZTwvdGV4dD4KPC9zdmc+';
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${banner.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {banner.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Banner Content */}
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={banner.product?.image || 'fallback-image-url.jpg'}
                          alt={banner.product?.name || 'Product'}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,...';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{banner?.product?.name}</h3>
                          <p className="text-sm text-gray-500">{banner?.product?.genericName}</p>
                          <p className="text-sm text-blue-600 font-medium">${banner?.product?.price}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{banner?.description}</p>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* <button
                            onClick={() => toggleBannerStatus(banner._id)}
                            className={`p-2 rounded-lg transition-colors ${banner?.status === 'active'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-400 hover:bg-gray-50'
                              }`}
                            title={banner.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {banner.status === 'active' ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button> */}
                          {/* <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button> */}
                          <button
                            onClick={() => deleteBanner(banner._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <span className="text-xs text-gray-400">
                          Used in slider: {banner?.status === 'active' ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Plus size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisements yet</h3>
                <p className="text-gray-500 mb-6">Create your first advertisement to get started</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Add Advertisement
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Add Advertisement</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Medicine Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Medicine
                    </label>
                    <select
                      value={formData.product?._id || ''}
                      onChange={(e) => {
                        const selectedMedicine = medicines.find(med => med._id === e.target.value);
                        setFormData(prev => ({ ...prev, product: selectedMedicine }));
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a medicine...</option>
                      {medicines.map((medicine) => (
                        <option key={medicine._id} value={medicine._id}>
                          {medicine.name} - {medicine.genericName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Medicine Preview */}
                  {formData.product && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={formData?.product?.image}
                          alt={formData?.product?.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2IiByeD0iOCIvPgo8dGV4dCB4PSIyNCIgeT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5QjlCOUIiIGZvbnQtc2l6ZT0iMTAiPk1lZDwvdGV4dD4KPC9zdmc+';
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900">{formData?.product?.name}</p>
                          <p className="text-sm text-gray-500">{formData?.product?.company}</p>
                          <p className="text-sm text-blue-600 font-medium">${formData?.product?.price}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advertisement Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advertisement Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/banner-image.jpg"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={formData?.image}
                        alt="Advertisement preview"
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDQwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iNjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5QjlCOUIiIGZvbnQtc2l6ZT0iMTQiPkludmFsaWQgSW1hZ2UgVVJMPC90ZXh0Pgo8L3N2Zz4=';
                        }}
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Advertisement Description
                    </label>
                    <textarea
                      value={formData?.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter a compelling description for your advertisement..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Creating...' : 'Create Advertisement'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementManagement;