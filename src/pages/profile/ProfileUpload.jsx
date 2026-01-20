import { useState } from 'react';
import loveIcon from '../../assets/images/svg/loveIcon.svg';
import HeadingTitle from '../../components/home/HeadingTitle';
import ImageUploaded from '../../components/ImageUploaded';

const ProfileUpload = () => {
    const [text, setText] = useState('');
    const [bioText, setBioText] = useState("");
    const maxLength = 100;
    /* Write about your ideal partner */
    const handleWriteIdelPartner = (e) => {
        setText(e.target.value);
        console.log(e.target.value);
    };

    /* Write Bio */
    const handleAboutBio = (e) => {
        if (e.target.value.length <= maxLength) {
            setBioText(e.target.value);
        }
    };

    const handlephotoandBio = () => {
        console.log("all data show");
    }
    return (
        <div className='min-h-screen bg-[#FFFFFF] px-6 pt-10 pb-20'>
            <div className='max-w-7xl mx-auto w-full rounded-3xl'>
                <HeadingTitle />
                <img src={loveIcon} className="hidden sm:block absolute top-32 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />
                {/* ideal partner */}
                <div className="">
                    <h2 className="text-2xl font-bold text-[#58001C] mb-3">
                        Write about your ideal partner
                    </h2>
                    <p className="text-[#737373] text-base leading-relaxed mb-6">
                        <span className="inline-block mr-1">✨</span>
                        Tell us more about the qualities you seek in your partner. Our AI will
                        analyze your preferences and recommend the most compatible profiles for you.
                    </p>
                    <div className="relative max-w-xl">
                        <textarea
                            value={text}
                            name='file'
                            onChange={handleWriteIdelPartner}
                            placeholder="Describe your ideal partner"
                            className="w-full h-48 p-4 text-gray-700 bg-white border border-gray-300 rounded-2xl 
                     focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none 
                     transition-all duration-200 placeholder-gray-400"/>
                    </div>
                    <div className='mt-12'>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#58001C] mb-3">Share more about you</h2>
                            <p className="text-[#737373] text-base leading-relaxed mb-6">Tell us about yourself and upload your best photos to help others get to know you better!</p>
                        </div>
                        <ImageUploaded />
                    </div>
                    <div className=" bg-white mt-5">
                        <label className="text-2xl font-bold text-[#58001C] mb-3">
                            Bio
                        </label>
                        <div className="w-full max-w-xl relative border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-rose-200 focus-within:border-rose-400 transition-colors mt-5">
                            <textarea
                                className="w-full h-32 resize-none outline-none text-gray-700 placeholder-gray-400"
                                placeholder="Share who you are, what you love, and what makes you unique."
                                value={bioText}
                                onChange={handleAboutBio}
                            />
                            <div className="absolute bottom-3 right-3 text-gray-400 font-medium">
                                {bioText.length}/{maxLength}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button
                    type="submit"
                    onClick={handlephotoandBio}
                    className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default ProfileUpload;