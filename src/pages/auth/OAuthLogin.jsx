import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthSidebar from '../../components/authSidebar/AuthSidebar';
import { images } from '../../../public/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { saveTokensAndFetchUser } from '../../features/auth/saveToken';
import Cookies from "js-cookie";

const OAuthLogin = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access");
    const { user } = useSelector((state) => state.auth);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // google and apple authoraization handdling
    useEffect(() => {
        if (accessToken) {
            const tokens = {
                accessToken,
            }
            saveTokensAndFetchUser(tokens, dispatch);
        }
    }, [accessToken, dispatch]);

    useEffect(() => {
        if (!user) return;

        if (user) {
            navigate("/phonenumber");
        }

    }, [user, navigate]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const isMobile =
        /Mobi|Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );

    return (
        <div className="flex flex-col md:flex-row min-h-screen relative">
            <AuthSidebar />
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-2 sm:p-6 relative">
                <img src={images.loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={images.loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />


                <div className="w-full max-w-lg bg-[#FFEFF1] rounded-2xl px-4 py-8 md:px-12 md:py-12 text-center border border-pink-100 mt-5 sm:0">
                    <h2 className="text-[32px] font-bold text-[#B6003F] mb-4">
                        Sign Up to Get Started
                    </h2>
                    <p className="text-[#737373] text-lg font-medium mb-8">
                        Create your profile and begin your journey to finding the perfect match!
                    </p>

                    <div className="space-y-4">
                        <Link to='/' className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-3.5 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer">
                            <img src={images.appleIcon} alt="appleIcon" />
                            <span className="font-medium text-lg text-[#FFFFFF]">Continue with Apple</span>
                        </Link>

                        <Link to={`${baseUrl}/auth/google?mobile=${isMobile}`} className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-3.5 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer">
                            <img src={images.googleIcon} alt="googleIcon" />
                            <span className="font-medium text-lg text-[#FFFFFF]">Continue with Google</span>
                        </Link>
                    </div>

                    <p className="mt-8 text-[#58001C]">
                        Already have an account? <Link to="/" className="text-[#FF225E] font-bold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OAuthLogin;