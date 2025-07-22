import React, { useEffect, useState } from 'react';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Simulate fetched data (no status or mixed status)
    const rawPayments = [
      { _id: '1', buyerEmail: 'john@example.com', amount: 150 },
      { _id: '2', buyerEmail: 'jane@example.com', amount: 200 },
      { _id: '3', buyerEmail: 'alex@example.com', amount: 120 },
    ];

    // Force all payments to start as pending
    const initializedPayments = rawPayments.map(payment => ({
      ...payment,
      status: 'pending',
    }));

    setPayments(initializedPayments);
  }, []);

  const handleAccept = (id) => {
    const updated = payments.map(payment =>
      payment._id === id ? { ...payment, status: 'paid' } : payment
    );
    setPayments(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-red-100 text-gray-700">
              <th className="p-3 border">Buyer Email</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="p-3 border">{payment.buyerEmail}</td>
                <td className="p-3 border">${payment.amount}</td>
                <td
                  className={`p-3 border font-semibold capitalize ${
                    payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {payment.status}
                </td>
                <td className="p-3 border">
                  {payment.status === 'pending' ? (
                    <button
                      onClick={() => handleAccept(payment._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
                <td colSpan="4" className="p-4 text-gray-500">
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
