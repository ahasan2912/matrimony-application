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
import TypeSelected from "../pages/profile/TypeSelected";
import ProfileUpload from "../pages/profile/ProfileUpload";
import FaceQrCode from "../pages/profile/FaceQrCode";
import VerificationComplete from "../pages/profile/VerificationComplete";
import Matches from "../pages/matches/Matches";
import Discover from "../pages/discover/Discover";
import ChatList from "../pages/chat/ChatList";
import ChatBox from "../pages/chat/components/ChatBox";
import MarriageCounselling from "../pages/counselling/MarriageCounselling";
import Verfication from "../pages/verification/Verfication";
import SubcribtionFeatures from "../pages/counselling/SubcribtionFeatures";
import ConsultantDetails from "../pages/counselling/ConsultantDetails";
import EducationVerify from "../pages/verification/EducationVerify";
import PassportVerify from "../pages/verification/PassportVerify";
import ParentVerify from "../pages/verification/ParentVerify";
import ProfilePriview from "../pages/preview/ProfilePriview";
import ViewUserProfile from "../pages/viewUserProfile/ViewUserProfile";

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
                path: "/register",
                element: <Register />,
            },
            {
                path: "/phonenumber",
                element: <PhoneNumber />,
            },
            {
                path: "/verfication",
                element: <Verification />
            },
            {
                path: "/createprofile",
                element: <ProfileCreate />
            },
            {
                path: "/typeselected",
                element: <TypeSelected />
            },
            {
                path: "/profileupload",
                element: <ProfileUpload />
            },
            {
                path: "/faceqrcode",
                element: <FaceQrCode />
            },
            {
                path: "/verificationcomplete",
                element: <VerificationComplete />
            },
            {
                path: "/metches",
                element: <Matches />
            },
            {
                path: "/discover",
                element: <Discover />
            },
            {
                path: "/chatlist",
                element: <ChatList />
            },
            {
                path: "/chatbox",
                element: <ChatBox />
            },
            {
                path: "/marriageCounselling",
                element: <MarriageCounselling />
            },
            {
                path: "/verificationpage",
                element: <Verfication />
            },
            {
                path: "/subcribtion",
                element: <SubcribtionFeatures />
            },
            {
                path: "/subcribtion/:id",
                element: <ConsultantDetails />
            },
            {
                path: "/passportVerify",
                element: <PassportVerify/>
            },
            {
                path: "/educationVerify",
                element: <EducationVerify/>
            },
            {
                path: "/parentVerify",
                element: <ParentVerify/>
            },
            {
                path: "/profilePreview",
                element: <ProfilePriview/>
            },
            {
                path: "/viewuserprofile",
                element: <ViewUserProfile/>
            },
            {
                path: "/testing",
                element: <Testing />
            },
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