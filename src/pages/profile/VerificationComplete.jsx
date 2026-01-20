import React from 'react';
import HeadingTitle from '../../components/home/HeadingTitle';
import LoveBackground from '../../components/shared/LoveBackground';
import images from '../../assets/image';

const VerificationComplete = () => {
    return (
        <div className='min-h-screen bg-[#FFFFFF] px-6 pt-10 pb-20'>
            <div className='max-w-7xl mx-auto w-full rounded-3xl'>
                <HeadingTitle />
                <LoveBackground top={20} bottom={20} />
                <div className='flex items-center justify-between'>
                    <div className='max-w-131.75'>
                        <h2 className="text-2xl font-bold text-[#58001C] mb-3">
                            Verification Complete!
                        </h2>
                        <p className="text-[#737373] text-base leading-relaxed mb-6">
                            Now you can start discovering profiles.
                        </p>
                        <p className='text-[#58001C] text-xl font-medium'>Browse profiles based on your preferences and find someone special that matches your interests.</p>
                    </div>
                    <div>
                        <img className='max-w-100 mx-auto' src={images.completeImage} alt="completeImage.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationComplete;