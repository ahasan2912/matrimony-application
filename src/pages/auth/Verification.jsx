import { Link, useNavigate } from 'react-router-dom';
import loveIcon from '../../../public/images/svg/loveIcon.svg'
import AuthSidebar from '../../components/authSidebar/AuthSidebar';
import { useRef, useState } from 'react';
const OTP_LENGTH = 6;
const Verification = () => {
    const [otp, setOtp] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
   
    const handleChange = (e) => {
        const value = e.target.value.slice(0, OTP_LENGTH);
        setOtp(value);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .slice(0, OTP_LENGTH);
        setOtp(pasted);
    };

    const handleClick = () => {
        if (otp.length === 6) {
            navigate('/createprofile');
        } else{
            alert('Please fill up verification code');
        }
    }
    return (
        <div className="flex flex-col md:flex-row min-h-screen relative">
            <AuthSidebar />
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-2 sm:p-6 relative">
                <img src={loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <div className="w-full max-w-lg bg-[#FFEFF1] rounded-2xl px-8 py-8 md:px-12 md:py-12 text-center border border-pink-100 mt-5 sm:0"
                    onClick={() => inputRef.current.focus()}>
                    <h2 className="text-[32px] font-bold text-[#B6003F] mb-3">
                        Enter Verification Code
                    </h2>
                    <p className='text-[#737373] text-base mb-2'>Please enter the 6-digit code sent to </p>
                    {/* input field */}
                    <div className="flex justify-center gap-2 cursor-text">
                        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-13 h-13 bg-[#FFFFFF] flex items-center justify-center text-xl font-semibold border rounded-md
                                ${index === otp.length ? "border-[#B30042]" : "border-gray-300"}`}>
                                {otp[index] || ""}
                            </div>
                        ))}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={otp}
                        onChange={handleChange}
                        onPaste={handlePaste}
                        className="absolute text-lg opacity-0 pointer-events-none]" />
                    {/* verification code here */}
                    <div>
                        <p className='text-[#58001C] text-lg  mt-2.5'>Didn't received the code?<span className='text-[#B6003F] font-bold text-lg'> Resend Code</span> <span className='text-[#737373] font-bold text-lg'>00:30</span></p>
                    </div>
                    <div className="space-y-4 mt-4">
                        <button onClick={handleClick} className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer outline-0">
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

export default Verification;
