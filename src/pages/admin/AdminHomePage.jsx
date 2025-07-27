import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const AdminHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [sales, setSales] = useState({
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0
  });

  useEffect(() => {
    fetchSalesOverview();
  }, []);

  const fetchSalesOverview = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosSecure.get("/overview/admin");
      console.log('Sales data:', response.data);

      if (response.data.success) {
        setSales(response.data.data);
      } else {
        setError("Failed to fetch sales data");
      }
    } catch (err) {
      setError("Error fetching sales data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const { totalAmount, paidAmount, pendingAmount } = sales;

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-200">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-10">📊 Admin Dashboard Overview</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center gap-4">
              <FaMoneyBillWave className="text-4xl text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Total Sales Revenue</h3>
                <p className="text-3xl font-bold text-gray-800">৳ {totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Paid Total */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-4xl text-green-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Paid Total</h3>
                <p className="text-3xl font-bold text-gray-800">৳ {paidAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Pending Total */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500 transform transition hover:scale-105 duration-300">
            <div className="flex items-center gap-4">
              <FaHourglassHalf className="text-4xl text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Pending Total</h3>
                <p className="text-3xl font-bold text-gray-800">৳ {pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
