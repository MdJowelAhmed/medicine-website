// pages/Unauthorized.jsx
// যখন user wrong route access করার চেষ্টা করবে তখন এই page দেখাবে

import { Link } from 'react-router-dom';
import { getUserRole } from './Auth';
// import { getUserRole } from '../utils/auth';

const Unauthorized = () => {
    const userRole = getUserRole();

    const getRedirectPath = () => {
        switch (userRole) {
            case 'admin':
                return '/admin/home';
            case 'seller':
                return '/seller/home';
            case 'user':
                return '/';
            default:
                return '/login';
        }
    };

    const getRedirectText = () => {
        switch (userRole) {
            case 'admin':
                return 'Go to Admin Dashboard';
            case 'seller':
                return 'Go to Seller Dashboard';
            case 'user':
                return 'Go to Home';
            default:
                return 'Go to Login';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
                <div className="mb-4">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Access Denied!
                </h1>

                <p className="text-gray-600 mb-2">
                    You do not have permission to access this page.
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    {userRole ? `Your role: ${userRole}` : 'Please login first'}
                </p>

                <div className="space-y-3">
                    <Link
                        to={getRedirectPath()}
                        className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        {getRedirectText()}
                    </Link>

                    <Link
                        to="/login"
                        className="block w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Login Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;