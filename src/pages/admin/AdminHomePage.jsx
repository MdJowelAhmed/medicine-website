import React from 'react';
import { FaMoneyBillWave, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const AdminHomePage = () => {
  // Static dummy sales data
  const sales = [
    { id: 1, amount: 2000, status: 'paid' },
    { id: 2, amount: 1500, status: 'pending' },
    { id: 3, amount: 5000, status: 'paid' },
    { id: 4, amount: 1200, status: 'pending' },
  ];

  // Calculating totals
  const totalRevenue = sales.reduce((sum, item) => sum + item.amount, 0);
  const paidTotal = sales
    .filter(item => item.status === 'paid')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingTotal = sales
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-200">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-10">📊 Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500 transform transition hover:scale-105 duration-300">
          <div className="flex items-center gap-4">
            <FaMoneyBillWave className="text-4xl text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Total Sales Revenue</h3>
              <p className="text-3xl font-bold text-gray-800">৳ {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Paid Total */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 transform transition hover:scale-105 duration-300">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Paid Total</h3>
              <p className="text-3xl font-bold text-gray-800">৳ {paidTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Pending Total */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500 transform transition hover:scale-105 duration-300">
          <div className="flex items-center gap-4">
            <FaHourglassHalf className="text-4xl text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-600">Pending Total</h3>
              <p className="text-3xl font-bold text-gray-800">৳ {pendingTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
