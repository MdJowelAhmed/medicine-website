import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/medimart.png'; // adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
        
        {/* Logo & About */}
        <div>
          <Link to="/" className="inline-flex items-center space-x-2 mb-3">
            <img src={logo} alt="MediMart Logo" className="w-30 rounded" />
          </Link>
          <p className="mt-2">
            Your trusted multi-vendor platform for medicine and healthcare essentials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li><Link to="/shop" className="hover:text-green-600">Shop</Link></li>
            <li><Link to="/dashboard" className="hover:text-green-600">Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-green-600">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
          <ul className="space-y-1">
            <li><Link to="/faq" className="hover:text-green-600">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-green-600">Return Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-green-600">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-green-600">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>
          <p>Email: support@medimart.com</p>
          <p>Phone: +880 123-456-789</p>
          <p>Address: Banasree, Dhaka, BD</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} MediMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
