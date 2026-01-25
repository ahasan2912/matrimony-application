import { Link, useNavigate } from 'react-router-dom';
import loveIcon from '../../../public/images/svg/loveIcon.svg';
import AuthSidebar from '../../components/authSidebar/AuthSidebar';
import { useState } from 'react';
import { images } from '../../../public/image';

const PhoneNumber = () => {
    const [number, setNumber] = useState('');
    const navigate = useNavigate();
    const handleClickContinue = () => {
        navigate('/verfication');
    }
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white">

            <AuthSidebar />
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-2 sm:p-6 relative overflow-hidden">
                <img src={loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <div className="w-full max-w-lg bg-[#FFEFF1] rounded-xl px-2 sm:px-8 py-6 md:px-8 md:py-12 text-center border border-pink-100 mt-5 sm:0">
                    <h2 className="text-[32px] font-bold text-[#B6003F] mb-4">
                        Enter Your Phone Number
                    </h2>
                    <p className="text-[#737373] text-lg mb-8">
                        Create your profile and begin your journey to finding the perfect match!
                    </p>
                    <div className="flex items-center justify-center">
                        <div className="flex w-full max-w-md bg-white border-2 border-gray-400 rounded-xl overflow-hidden shadow-sm">
                            <div className="flex items-center gap-2 px-2 py-3 bg-white border-r border-gray-400">
                                <div className="w-8 h-6 overflow-hidden rounded-sm flex items-center justify-center">
                                    <img
                                        src={images.pakistanFalg}
                                        alt="Pakistan Flag"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-lg sm:text-xl font-semibold text-gray-800">+92</span>
                            </div>
                            <div className="flex pl-4 py-3">
                                <input
                                    type="tel"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    placeholder="123 456 789"
                                    className="text-lg sm:text-xl font-semibold text-gray-800 bg-transparent outline-none placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClickContinue} className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer font-medium text-lg mt-6">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhoneNumber;