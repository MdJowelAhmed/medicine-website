import React, { useEffect, useState } from 'react';

const SellerHomePage = () => {
    const [paidTotal, setPaidTotal] = useState(0);
    const [pendingTotal, setPendingTotal] = useState(0);

    useEffect(() => {
        // Example static data — replace this with real API call
        const fetchSalesData = async () => {
            // Replace with your API logic
            const exampleOrders = [
                { price: 1000, status: 'paid' },
                { price: 800, status: 'pending' },
                { price: 1500, status: 'paid' },
            ];

            const paid = exampleOrders
                .filter(order => order.status === 'paid')
                .reduce((sum, order) => sum + order.price, 0);
            const pending = exampleOrders
                .filter(order => order.status === 'pending')
                .reduce((sum, order) => sum + order.price, 0);

            setPaidTotal(paid);
            setPendingTotal(pending);
        };

        fetchSalesData();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Welcome Seller</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-100 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-green-800 mb-2">Total Sales Revenue</h2>
                    <p className="text-2xl font-bold text-green-900">৳ {paidTotal + pendingTotal}</p>
                </div>

                <div className="bg-blue-100 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">Paid Total</h2>
                    <p className="text-2xl font-bold text-blue-900">৳ {paidTotal}</p>
                </div>

                <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-yellow-800 mb-2">Pending Total</h2>
                    <p className="text-2xl font-bold text-yellow-900">৳ {pendingTotal}</p>
                </div>
            </div>
        </div>
    );
};

export default SellerHomePage;
