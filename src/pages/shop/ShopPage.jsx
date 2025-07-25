import React, { useEffect, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const ShopPage = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    filterAndSearchMedicines();
  }, [searchTerm, companyFilter, allMedicines]);

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('medimart_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  };

  const saveCartToStorage = (cartData) => {
    try {
      localStorage.setItem('medimart_cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosSecure.get("/products");
      const result = response.data;

      if (result.success) {
        const filtered = result.data.filter(product => product.discount > 0);
        setAllMedicines(filtered);
        setFilteredMedicines(filtered);
      } else {
        setError(result.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSearchMedicines = () => {
    let updated = [...allMedicines];

    if (companyFilter !== "all") {
      updated = updated.filter(med =>
        (med.company || med.manufacturer)?.toLowerCase() === companyFilter.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      updated = updated.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMedicines(updated);
    setCurrentPage(1); // Reset to first page
  };

  const handleSelect = (medicine) => {
    const existingItemIndex = cart.findIndex((item) => item.id === medicine._id);
    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      alert(`Increased quantity of "${medicine.name}" in cart.`);
    } else {
      const cartItem = {
        id: medicine._id,
        name: medicine.name,
        company: medicine.company || medicine.manufacturer,
        price: medicine.price,
        quantity: 1,
        stock: medicine.stock,
        image: medicine.image,
        description: medicine.description
      };
      updatedCart = [...cart, cartItem];
      alert(`Added "${medicine.name}" to cart.`);
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const handleClose = () => setSelectedMedicine(null);
  const isInCart = (medicineId) => cart.some((item) => item.id === medicineId);
  const getCartItemQuantity = (medicineId) => {
    const item = cart.find((item) => item.id === medicineId);
    return item ? item.quantity : 0;
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniqueCompanies = [
    ...new Set(allMedicines.map(m => (m.company || m.manufacturer))),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-center">
        <div className="text-xl">Loading medicines...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Shop Medicines</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by medicine name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
          />
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="all">All Manufacturers</option>
            {uniqueCompanies.map((comp, index) => (
              <option key={index} value={comp}>{comp}</option>
            ))}
          </select>
        </div>

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
              {paginatedMedicines.map((med) => (
                <tr key={med._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{med.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{med.company}</td>
                  <td className="border border-gray-300 px-4 py-2">MediMart</td>
                  <td className="border border-gray-300 px-4 py-2">${med.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{med.stock}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleSelect(med)}
                      className={`text-white px-3 py-1 rounded transition ${
                        isInCart(med._id)
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      title={isInCart(med._id) ? "Add more to cart" : "Add to cart"}
                      style={{ minWidth: '70px' }}
                    >
                      {isInCart(med._id)
                        ? `Added (${getCartItemQuantity(med._id)})`
                        : "Select"}
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

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
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
              <p><span className="font-semibold text-blue-600">Manufacturer:</span> {selectedMedicine.company || selectedMedicine.manufacturer}</p>
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
