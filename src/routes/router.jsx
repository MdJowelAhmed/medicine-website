// routes/router.js
// আপনার main router file - সব routes এখানে define করা হবে

import { createBrowserRouter } from "react-router-dom";

// Layout imports
import Rootlayout from "../layouts/Rootlayout";
import AdminDashboard from "../layouts/AdminDashboard";
import SellerDashboard from "../layouts/SellerDashboard";
import UserDashboard from "../layouts/UserDashboard";

// Public page imports
import Home from "../pages/Home";
import CategoriesSection from "../components/categoryCard/CategoriesSection";
import CategoryDetails from "../components/categoryCard/CategoryDetails";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/errorPage/Error";
import ShopPage from "../pages/shop/ShopPage";
// import Unauthorized from "../pages/Unauthorized";

// User page imports
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";
import InvoicePage from "../pages/invoicePage/InvoicePage";
import UpdateProfile from "../components/UpdateProfile";
import UserPaymentHistoryPage from "../pages/user/UserPaymentHistoryPage";

// Admin page imports
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageUser from "../pages/admin/ManageUser";
import ManageCategory from "../pages/admin/ManageCategory";
import PaymentManagement from "../pages/admin/PaymentManagement";
import ManageBanner from "../pages/admin/ManageBanner";
import SellsReport from "../pages/admin/SellsReport";

// Seller page imports
import SellerHomePage from "../pages/seller/SellerHomePage";
import ManageMedicines from "../pages/seller/ManageMedicines";
import PaymentHistory from "../pages/seller/PaymentHistory";
import AskForAdvertisement from "../pages/seller/AskForAdvertisement";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "../components/utility/RoleBaseRoute";
import Unauthorized from "../components/utility/UnauthorizedRoute";



export const router = createBrowserRouter([
    // ========================
    // PUBLIC ROUTES (Root Layout)
    // ========================
    {
        path: "/",
        Component: Rootlayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home // সবাই access করতে পারবে
            },
            {
                path: '/category',
                Component: CategoriesSection // সবাই access করতে পারবে
            },
            {
                path: '/category/:id',
                Component: CategoryDetails // সবাই access করতে পারবে
            },
            {
                path: '/login',
                Component: Login // সবাই access করতে পারবে
            },
            {
                path: '/register',
                Component: Register // সবাই access করতে পারবে
            },
            {
                path: '/shop',
                Component: ShopPage // সবাই access করতে পারবে
            },
            {
                path: '/unauthorized',
                Component: Unauthorized // সবাই access করতে পারবে
            },

            // ========================
            // AUTHENTICATED USER ROUTES
            // ========================
            {
                path: '/update-profile',
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                )
                // যেকোনো authenticated user access করতে পারবে
            },

            // ========================
            // USER ONLY ROUTES
            // ========================
            {
                path: '/cart',
                element: (
                    <PrivateRoute allowedRoles={['user']}>
                        <CartPage />
                    </PrivateRoute>
                )
                // শুধু user role access করতে পারবে
            },
            {
                path: '/checkout',
                element: (
                    <PrivateRoute allowedRoles={['user']}>
                        <CheckoutPage />
                    </PrivateRoute>
                )
            },
            {
                path: '/invoice',
                element: (
                    <PrivateRoute allowedRoles={['user']}>
                        <InvoicePage />
                    </PrivateRoute>
                )
            }
        ]
    },

    // ========================
    // ADMIN ONLY ROUTES
    // ========================
    {
        path: '/admin',
        element: (
            <RoleBasedRoute requiredRole="admin">
                <AdminDashboard />
            </RoleBasedRoute>
        ),
        children: [
            {
                path: '/admin/home',
                element: <AdminHomePage />
            },
            {
                path: '/admin/manage-users',
                element: <ManageUser />
            },
            {
                path: '/admin/manage-category',
                element: <ManageCategory />
            },
            {
                path: '/admin/payments',
                element: <PaymentManagement />
            },
            {
                path: '/admin/banner',
                element: <ManageBanner />
            },
            {
                path: '/admin/sells-report',
                element: <SellsReport />
            }
        ]
    },

    // ========================
    // SELLER ONLY ROUTES
    // ========================
    {
        path: '/seller',
        element: (
            <RoleBasedRoute requiredRole="seller">
                <SellerDashboard />
            </RoleBasedRoute>
        ),
        children: [
            {
                path: '/seller/home',
                element: <SellerHomePage />
            },
            {
                path: '/seller/manage-medicine',
                element: <ManageMedicines />
            },
            {
                path: '/seller/payment-history',
                element: <PaymentHistory />
            },
            {
                path: '/seller/advertise-request',
                element: <AskForAdvertisement />
            }
        ]
    },

    // ========================
    // USER DASHBOARD ROUTES
    // ========================
    {
        path: '/user',
        element: (
            <RoleBasedRoute requiredRole="user">
                <UserDashboard />
            </RoleBasedRoute>
        ),
        children: [
            {
                path: '/user/payment-history',
                element: <UserPaymentHistoryPage />
            }
            // এখানে আরো user dashboard routes add করতে পারেন
        ]
    }
]);

