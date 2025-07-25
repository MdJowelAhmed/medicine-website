import React from 'react';

const InvoicePage = ({ orderData, onBackToShop }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real application, you would use a library like jsPDF or html2pdf
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.default();
      
      // Add content to PDF
      doc.setFontSize(20);
      doc.text('INVOICE', 20, 30);
      doc.setFontSize(12);
      doc.text(`Invoice #: ${orderData.id}`, 20, 50);
      doc.text(`Date: ${new Date(orderData.date).toLocaleDateString()}`, 20, 60);
      doc.text(`Customer: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`, 20, 80);
      
      let yPosition = 100;
      doc.text('Items:', 20, yPosition);
      
      orderData.items.forEach((item, index) => {
        yPosition += 15;
        doc.text(`${item.name} - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`, 25, yPosition);
      });
      
      yPosition += 20;
      doc.text(`Total: $${orderData.total}`, 20, yPosition);
      
      doc.save(`invoice-${orderData.id}.pdf`);
    }).catch(() => {
      alert('PDF download feature is loading...');
    });
  };

  if (!orderData || !orderData.id) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Invoice Not Found</h1>
        <p className="text-gray-500 mb-4">No order data available.</p>
        <button 
          onClick={onBackToShop}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">INVOICE</h1>
              <p className="text-blue-100">MediMart Pharmacy</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">#{orderData.id}</p>
              <p className="text-blue-100">
                {new Date(orderData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Company & Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">From:</h3>
              <div className="text-gray-600">
                <p className="font-semibold">MediMart Pharmacy</p>
                <p>123 Healthcare Street</p>
                <p>Dhaka, Bangladesh 1000</p>
                <p>Phone: +880-1234-567890</p>
                <p>Email: info@medimart.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Bill To:</h3>
              <div className="text-gray-600">
                <p className="font-semibold">
                  {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                </p>
                <p>{orderData.customerInfo.address}</p>
                <p>{orderData.customerInfo.city}, {orderData.customerInfo.postalCode}</p>
                <p>{orderData.customerInfo.country}</p>
                <p>Phone: {orderData.customerInfo.phone}</p>
                <p>Email: {orderData.customerInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="text-sm text-gray-600">Payment Status:</span>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  orderData.status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {orderData.status === 'paid' ? 'PAID' : 'PENDING'}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Payment Method:</span>
                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {orderData.paymentMethod === 'stripe' ? 'Credit Card' : 'Cash on Delivery'}
                </span>
              </div>
              {orderData.stripePaymentId && (
                <div>
                  <span className="text-sm text-gray-600">Payment ID:</span>
                  <span className="ml-2 text-sm font-mono">
                    {orderData.stripePaymentId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Qty</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item, index) => (
                    <tr key={item.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.company}</td>
                      <td className="px-4 py-3 text-sm text-right">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full max-w-sm">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%):</span>
                  <span>${orderData.tax}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{orderData.shipping === '0.00' ? 'Free' : `$${orderData.shipping}`}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-red-600">${orderData.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6">
            <div className="text-center text-gray-600 text-sm">
              <p className="mb-2">Thank you for your business!</p>
              <p>For any questions regarding this invoice, please contact us at info@medimart.com</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={onBackToShop}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition"
          >
            Continue Shopping
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition"
            >
              Print Invoice
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;