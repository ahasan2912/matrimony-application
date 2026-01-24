import React, { useEffect } from 'react';
import { images } from '../../assets/image';

const EducationVerify = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='min-h-[70vh] bg-white'>
            <div className='max-w-7xl mx-auto w-full space-y-6 px-4 pt-4 sm:pt-10'>
                {/* Header */}
                <header>
                    <h1 className="text-2xl font-bold text-[#58001C]">Verify your Education</h1>
                    <p className="text-[#737373] text-base mt-1.5">
                        Upload a clear image of your highest educational qualification or degree to verify your education.
                    </p>
                </header>
                <div className='max-w-125 mx-auto my-20'>
                    <img className='w-full' src={images.educationVerify} alt="veryfyedCard" />
                </div>
            </div>
            <div className="flex justify-center sm:pt-4 pb-10 px-4">
                <button
                    type="submit"
                    className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                    Upload Photo
                </button>
            </div>
        </div>
    );
};

export default EducationVerify;