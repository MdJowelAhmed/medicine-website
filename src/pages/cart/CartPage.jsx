import React, { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const CartPage = () => {
  // Example initial cart data (replace or connect with your cart context/state)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      company: 'MediLife',
      price: 30,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Cough Syrup',
      company: 'HealthCare',
      price: 15,
      quantity: 1,
    },
  ]);

  const navigate = useNavigate();

  const handleIncrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-8 text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded shadow">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-right">Price (৳)</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-right">Total (৳)</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-100 text-center align-middle"
                  >
                    <td className="p-3 text-left font-semibold">{item.name}</td>
                    <td className="p-3 text-left">{item.company}</td>
                    <td className="p-3 text-right">৳{item.price}</td>
                    <td className="p-3 flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      ৳{item.price * item.quantity}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
            >
              Clear Cart
            </button>

            <div className="text-lg font-semibold">
              Total Price: <span className="text-red-600">৳{totalPrice}</span>
            </div>

            <Link to={'/checkout'}
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
