import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AuthSidebar from '../../components/authSidebar/AuthSidebar';
import { images } from '../../../public/image';

const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15;

const PhoneNumber = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [formattedPhone, setFormattedPhone] = useState('');
    const [error, setError] = useState('');

    const handlePhoneChange = (value, _country, _event, formattedValue) => {
        setPhone(value);
        setFormattedPhone(formattedValue || `+${value}`);

        if (error) {
            setError('');
        }
    };

    const handleContinue = () => {
        const digitsOnly = phone.replace(/\D/g, '');

        if (digitsOnly.length < MIN_PHONE_DIGITS || digitsOnly.length > MAX_PHONE_DIGITS) {
            setError('Please enter a valid phone number.');
            return;
        }

        navigate('/verfication', {
            state: {
                phone: formattedPhone || `+${phone}`,
            },
        });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen relative">
            <AuthSidebar />
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-2 sm:p-6 relative">
                <img src={images.loveIcon} alt="" className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={images.loveIcon} alt="" className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <div className="w-full max-w-lg bg-[#FFEFF1] rounded-2xl px-4 py-8 md:px-12 md:py-12 text-center border border-pink-100 mt-5 sm:mt-0">
                    <h2 className="text-[32px] font-bold text-[#B6003F] mb-4">
                        Enter Your Phone Number
                    </h2>
                    <p className="text-[#737373] text-lg font-medium mb-8">
                        We&apos;ll send a verification code to your mobile number.
                    </p>

                    <div className="text-left">
                        <label className="block text-[#58001C] text-sm font-semibold mb-3">
                            Mobile number
                        </label>
                        <PhoneInput
                            country="pk"
                            enableSearch
                            countryCodeEditable={false}
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter your phone number"
                            inputClass="!w-full !h-14 !rounded-full !border !border-pink-200 !bg-white !pl-16 !pr-4 !text-base !text-[#58001C] focus:!border-[#B30042] focus:!shadow-none"
                            buttonClass="!border-none !bg-transparent !pl-4 !rounded-l-full"
                            containerClass="!w-full"
                        />

                        <p className="text-sm text-[#737373] mt-3">
                            Select your country code and enter your number.
                        </p>
                        {error ? (
                            <p className="text-sm text-red-500 mt-2">{error}</p>
                        ) : null}
                    </div>

                    <div className="space-y-4 mt-8">
                        <button
                            type="button"
                            onClick={handleContinue}
                            className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer outline-0"
                        >
                            <span className="font-medium text-lg text-[#FFFFFF]">Continue</span>
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

export default PhoneNumber;
