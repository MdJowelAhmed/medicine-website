import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import logo from '../../assets/medimart.png'; // Update with your actual logo path

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const { transactionId, amount, user = {} } = location.state || {};
  const { name = 'Customer Name', email = 'example@email.com' } = user;

  const handlePrint = () => {
    const printContent = invoiceRef.current;
    const win = window.open('', 'Print-Window');
    win.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: sans-serif; padding: 30px; }
            .invoice { max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; }
            .logo { text-align: center; margin-bottom: 20px; }
            .logo img { height: 60px; }
            .details { margin-bottom: 20px; }
            .details p { margin: 4px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body onload="window.print(); window.close()">
          <div class="invoice">${printContent.innerHTML}</div>
        </body>
      </html>
    `);
    win.document.close();
  };

  if (!transactionId || !amount) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 font-semibold">No invoice found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow border rounded text-gray-800">
      <div ref={invoiceRef}>
        {/* Logo */}
        <div className="text-center mb-6">
          <img src={logo} alt="MediMart Logo" className="h-14 mx-auto" />
          <h1 className="text-2xl font-bold text-green-600 mt-2">Invoice</h1>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Date:</strong> {new Date().toLocaleString('en-BD')}</p>
        </div>

        {/* Purchase Info */}
        <div className="border-t pt-4">
          <p><strong>Transaction ID:</strong> {transactionId}</p>
          <p><strong>Amount Paid:</strong> ৳{amount}</p>
          <p><strong>Status:</strong> Paid</p>
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          Thank you for shopping with <span className="font-semibold text-green-600">MediMart</span>!
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Download Invoice (PDF)
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
