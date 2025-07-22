import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/Rootlayout";
import Home from "../pages/Home";
import CategoriesSection from "../components/categoryCard/CategoriesSection";
import CategoryDetails from "../components/categoryCard/CategoryDetails";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Error from "../pages/errorPage/Error";
import ShopPage from "../pages/shop/ShopPage";
import CategoryDetailsPage from "../components/categoryCard/CategoryDetails";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";
import InvoicePage from "../pages/invoicePage/InvoicePage";
import AdminDashboard from "../layouts/AdminDashboard";
import AdminHomePage from "../pages/admin/AdminHomePage";
import ManageUser from "../pages/admin/ManageUser";
import ManageCategory from "../pages/admin/ManageCategory";
import PaymentManagement from "../pages/admin/PaymentManagement";
import ManageBanner from "../pages/admin/ManageBanner";
import SellsReport from "../pages/admin/SellsReport";
import SellerDashboard from "../layouts/SellerDashboard";
import SellerHomePage from "../pages/seller/SellerHomePage";
import ManageMedicines from "../pages/seller/ManageMedicines";
import PaymentHistory from "../pages/seller/PaymentHistory";
import AskForAdvertisement from "../pages/seller/AskForAdvertisement";
import UserDashboard from "../layouts/UserDashboard";
import UserPaymentHistoryPage from "../pages/user/UserPaymentHistoryPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Rootlayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/category',
                Component: CategoriesSection
            },
            {
                path: '/category/:categoryName',
                Component: CategoryDetails
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/shop',
                Component: ShopPage
            },
            {
                path: '/cart',
                element: <CartPage />
            },
            {
                path: '/category/:categoryName',
                component: CategoryDetailsPage
            }, {
                path: '/checkout',
                element: <CheckoutPage />
            }, {
                path: '/invoice',
                element: <InvoicePage />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminDashboard/>,
        children: [
            {
                path: '/admin/home', // /admin
                element: <AdminHomePage />,
            },
            {
                path: '/admin/manage-users',
                element: <ManageUser/>
            },
            {
                path: '/admin/manage-category',
                element: <ManageCategory />,
            },
            {
                path: '/admin/payments',
                element: <PaymentManagement />,
            },
            {
                path: '/admin/banner',
                element: <ManageBanner/>
            },
            {
                path: '/admin/sells-report',
                element: <SellsReport/>
            },
        ]
    },
    {
        path: '/seller',
        element: <SellerDashboard/>,
        children: [
            {
                path: '/seller/home',
                element: <SellerHomePage/>
            },
            {
                path: '/seller/manage-medicine',
                element: <ManageMedicines/>
            },
            {
                path: '/seller/payment-history',
                element: <PaymentHistory/>
            },
            {
                path: '/seller/advertise-request',
                element: <AskForAdvertisement/>
            }
        ]
    },
    {
        path: '/user',
        element: <UserDashboard/>,
        children: [
            {
                path: '/user/payment-history',
                element: <UserPaymentHistoryPage/>
            }
        ]
    }
]);
