import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../components/hook/useAxiosSecure';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure();



  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosSecure.get("/payments");
      console.log('Payments fetched:', response);
      
      if (response.data.success) {
        setPayments(response.data.data);
      } else {
        setError("Failed to fetch payments");
      }
    } catch (err) {
      setError("Error fetching payments: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axiosSecure.patch(`/payments/${id}`, {
        status: "paid"
      });
      console.log('Payment status updated:', response.data);

      if (response.data.success) {
        console.log('Payment status updated successfully:', response.data.message);
        // Update local state
        const updatedPayments = payments.map(payment =>
          payment._id === id ? { ...payment, status: 'paid' } : payment
        );
        setPayments(updatedPayments);
      } else {
        setError("Failed to update payment status");
      }
    } catch (err) {
      setError("Error updating payment: " + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Payment Management</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading payments...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Payment Management</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button 
          onClick={fetchPayments}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-red-100 text-gray-700">
              <th className="p-3 border">Buyer Email</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Created At</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="p-3 border">{payment.user?.email || 'N/A'}</td>
                <td className="p-3 border">${payment.amount}</td>
                <td className="p-3 border text-xs">{payment.transactionId}</td>
                <td
                  className={`p-3 border font-semibold capitalize ${
                    payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {payment.status}
                </td>
                <td className="p-3 border text-sm">{formatDate(payment.createdAt)}</td>
                <td className="p-3 border">
                  {payment.status === 'pending' ? (
                    <button
                      onClick={() => handleAccept(payment._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      Accept Payment
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">Paid</span>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No payment records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;