import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Dummy sales data
    const dummyData = [
      {
        id: '1',
        medicineName: 'Paracetamol',
        sellerEmail: 'seller1@example.com',
        buyerEmail: 'buyer1@example.com',
        totalPrice: 150,
        date: '2025-07-15',
      },
      {
        id: '2',
        medicineName: 'Vitamin C',
        sellerEmail: 'seller2@example.com',
        buyerEmail: 'buyer2@example.com',
        totalPrice: 200,
        date: '2025-07-17',
      },
      {
        id: '3',
        medicineName: 'Cough Syrup',
        sellerEmail: 'seller3@example.com',
        buyerEmail: 'buyer3@example.com',
        totalPrice: 120,
        date: '2025-07-12',
      },
      {
        id: '4',
        medicineName: 'Ibuprofen',
        sellerEmail: 'seller5@example.com',
        buyerEmail: 'buyer4@example.com',
        totalPrice: 180,
        date: '2025-07-10',
      },
    ];
    setSales(dummyData);
    setFilteredSales(dummyData);
  }, []);

  const filterByDate = () => {
    let filtered = sales;
    if (startDate) {
      filtered = filtered.filter(s => new Date(s.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(s => new Date(s.date) <= new Date(endDate));
    }
    setFilteredSales(filtered);
  };

  const exportCSV = () => {
    const header = ['Medicine Name', 'Seller Email', 'Buyer Email', 'Total Price', 'Date'];
    const rows = filteredSales.map(s => [
      s.medicineName,
      s.sellerEmail,
      s.buyerEmail,
      s.totalPrice,
      s.date,
    ]);
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += header.join(',') + '\n';
    rows.forEach(rowArray => {
      csvContent += rowArray.join(',') + '\n';
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = 'sales_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text('Sales Report', 14, 15);

    const columns = ['Medicine Name', 'Seller Email', 'Buyer Email', 'Total Price', 'Date'];
    const rows = filteredSales.map(sale => [
      sale.medicineName,
      sale.sellerEmail,
      sale.buyerEmail,
      sale.totalPrice.toString(),
      sale.date,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Sales Report</h2>

      <div className="mb-6 flex justify-center gap-4 flex-wrap">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={filterByDate}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 self-end"
        >
          Filter
        </button>
      </div>

      <div className="mb-4 flex justify-center gap-3 flex-wrap">
        <button
          onClick={exportCSV}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-red-100 text-gray-700">
            <tr>
              <th className="p-3 border">Medicine Name</th>
              <th className="p-3 border">Seller Email</th>
              <th className="p-3 border">Buyer Email</th>
              <th className="p-3 border">Total Price ($)</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No sales found.
                </td>
              </tr>
            ) : (
              filteredSales.map(sale => (
                <tr key={sale.id} className="border-t hover:bg-red-50">
                  <td className="p-3 border">{sale.medicineName}</td>
                  <td className="p-3 border">{sale.sellerEmail}</td>
                  <td className="p-3 border">{sale.buyerEmail}</td>
                  <td className="p-3 border text-right">{sale.totalPrice}</td>
                  <td className="p-3 border">{sale.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
