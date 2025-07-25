import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('medimart_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  };

  const saveCartToStorage = (cartData) => {
    try {
      localStorage.setItem('medimart_cart', JSON.stringify(cartData));
      // Dispatch custom event to notify other components about cart update
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const handleIncrease = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  const handleDecrease = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('medimart_cart');
    // Dispatch custom event to notify other components about cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-8 text-center">
        Your Cart
        {totalItems > 0 && (
          <span className="text-lg text-gray-600 ml-2">({totalItems} items)</span>
        )}
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl mb-4">Your cart is empty.</p>
          <Link 
            to="/shop" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded shadow">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-right">Price ($)</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-right">Total ($)</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-100 text-center align-middle"
                  >
                    <td className="p-3 text-left">
                      <div className="flex items-center space-x-3">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          {item.description && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-left">{item.company}</td>
                    <td className="p-3 text-right">${item.price}</td>
                    <td className="p-3">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-lg"
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

          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <button
                onClick={handleClearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded transition"
              >
                Clear Cart
              </button>

              <div className="text-center md:text-right">
                <div className="text-lg">
                  Total Items: <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="text-xl font-bold">
                  Total Price: <span className="text-red-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/shop" 
              className="text-blue-500 hover:text-blue-600 underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;