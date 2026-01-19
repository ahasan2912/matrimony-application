import { Link } from 'react-router-dom';
import loveIcon from '../../assets/images/svg/loveIcon.svg';
import AuthSidebar from '../../components/authSidebar/AuthSidebar';
import images from '../../assets/image';
import { useState } from 'react';

const PhoneNumber = () => {
    const [number, setNumber] = useState('');
    console.log(number);
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white">

            <AuthSidebar />
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-2 sm:p-6 relative overflow-hidden">
                <img src={loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <div className="w-full max-w-md bg-[#FFEFF1] rounded-2xl px-2 sm:px-8 py-8 md:px-12 md:py-12 text-center border border-pink-100 mt-5 sm:0">
                    <h2 className="text-[32px] font-bold text-[#B6003F] mb-4">
                        Enter Your Phone Number
                    </h2>
                    <p className="text-[#737373] text-lg mb-8">
                        Create your profile and begin your journey to finding the perfect match!
                    </p>
                    <div className="flex w-full h-14 bg-white border border-gray-400 rounded-xl overflow-hidden mb-8">
                        <div className="flex-1 items-center px-2 space-x-2 cursor-pointer hover:bg-gray-50">
                            <div className='flex items-center justify-center h-14 px-2'>
                                <img
                                    src={images.pakistanFalg}
                                    alt="Flag"
                                    className="w-8 h-6 object-cover"
                                />
                                <span className="text-lg sm:text-xl font-bold text-gray-800">+92</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center border-l border-gray-300 px-2'>
                            <input
                                type="tel"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="123 456 789"
                                className="flex-1 px-4 text-xl text-gray-600 outline-none placeholder:text-gray-400 "
                                required
                            />
                        </div>
                    </div>

                    <button className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhoneNumber;