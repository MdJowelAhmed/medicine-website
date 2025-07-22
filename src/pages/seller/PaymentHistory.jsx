import { useState } from 'react';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      buyerEmail: 'customer1@example.com',
      medicine: 'Napa Extra',
      date: '2025-07-17',
      price: 150,
      status: 'pending',
    },
    {
      id: 2,
      buyerEmail: 'customer2@example.com',
      medicine: 'Seclo 20mg',
      date: '2025-07-15',
      price: 250,
      status: 'pending',
    },
  ]);

  const handleAccept = (id) => {
    const updatedPayments = payments.map(payment =>
      payment.id === id ? { ...payment, status: 'paid' } : payment
    );
    setPayments(updatedPayments);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Buyer Email</th>
              <th className="p-3 border">Medicine</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Price (৳)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{payment.buyerEmail}</td>
                <td className="p-3 border">{payment.medicine}</td>
                <td className="p-3 border">{payment.date}</td>
                <td className="p-3 border">৳ {payment.price}</td>
                <td className="p-3 border">
                  <span
                    className={
                      payment.status === 'paid'
                        ? 'text-green-600 font-semibold'
                        : 'text-yellow-600 font-semibold'
                    }
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="p-3 border">
                  {payment.status === 'pending' ? (
                    <button
                      onClick={() => handleAccept(payment.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="text-gray-500">✔️</span>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
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

export default PaymentHistory;
