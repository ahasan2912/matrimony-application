import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register";
import Testing from "../pages/Testing";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import PhoneNumber from "../pages/auth/PhoneNumber";
import Verification from "../pages/auth/Verification";
import ProfileCreate from "../pages/profile/ProfileCreate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <div>Error Page ...........</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/phonenumber",
                element: <PhoneNumber />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/verfication",
                element: <Verification />
            },
            {
                path: "/testing",
                element: <Testing />
            },
            {
                path: "createprofile",
                element: <ProfileCreate />
            }
        ],
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'dashboardHome',
                element: <Dashboard />
            },
        ]
    }
]);

export default router;