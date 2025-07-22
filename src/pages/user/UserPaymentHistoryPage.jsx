import React from 'react';

const dummyPayments = [
  { id: 1, medicine: 'Paracetamol', amount: 120, status: 'paid', trxId: 'TXN23987' },
  { id: 2, medicine: 'Napa Extra', amount: 100, status: 'pending', trxId: 'TXN76123' },
];

const UserPaymentHistoryPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase">
              <th className="p-3">#</th>
              <th className="p-3">Medicine</th>
              <th className="p-3">Amount (৳)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayments.map((item, i) => (
              <tr key={item.id} className="border-t text-sm">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{item.medicine}</td>
                <td className="p-3">৳{item.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      item.status === 'paid' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">{item.trxId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {dummyPayments.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No payment history found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPaymentHistoryPage;
