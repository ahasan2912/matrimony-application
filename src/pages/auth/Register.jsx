import { Link } from 'react-router-dom';
import images from '../../assets/image';
import loveIcon from '../../assets/images/svg/loveIcon.svg';
import AuthSidebar from '../../components/authSidebar/AuthSidebar';

const Register = () => {
    const handleAppleAccout = () => {
        console.log('handle apple account');
    }

    const handleGoogleAccout = () => {
        console.log('handle goole account');
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen relative">
            <AuthSidebar />
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-2 sm:p-6 relative">

                <div className='top-0 right-0'>
                    <button className="absolute top-6 right-6 flex items-center space-x-2 bg-gray-500/80 text-white px-3 py-1.5 rounded-full text-sm">
                        <span>🌐 English</span>
                    </button>
                </div>

                <img src={loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />


                <div className="w-full max-w-md bg-[#FFEFF1] rounded-2xl px-8 py-8 md:px-12 md:py-12 text-center border border-pink-100 mt-5 sm:0">
                    <h2 className="text-[32px] font-bold text-[#B6003F] mb-4">
                        Sign Up to Get Started
                    </h2>
                    <p className="text-[#737373] text-lg font-medium mb-8">
                        Create your profile and begin your journey to finding the perfect match!
                    </p>

                    <div className="space-y-4">
                        <button onClick={handleAppleAccout} className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer">
                            <img src={images.appleIcon} alt="appleIcon" />
                            <span className="font-medium text-lg text-[#FFFFFF]">Continue with Apple</span>
                        </button>

                        <button onClick={handleGoogleAccout} className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer">
                            <img src={images.googleIcon} alt="googleIcon" />
                            <span className="font-medium text-lg text-[#FFFFFF]">Continue with Google</span>
                        </button>
                    </div>

                    <p className="mt-8 text-[#58001C]">
                        Already have an account? <Link to="/" className="text-[#FF225E] font-bold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;