import React, { useState } from 'react';
import { images } from '../../assets/image';
import { useNavigate } from 'react-router-dom';
const MarriageCounselling = () => {
    const [ugrade, setUgrade] = useState(false);
    const naviage = useNavigate();

    const steps = [
        {
            title: "Select your consultant",
            description: "Choose from our vetted marriage consultants.",
            icon: "../../src/assets/images/counselling-1.png"
        },
        {
            title: "Schedule your session",
            description: "Book a time that works for you",
            icon: "../../src/assets/images/counselling-2.png",
        },
        {
            title: "Live virtual consultation",
            description: "Meet your counselor via video call",
            icon: "../../src/assets/images/counselling-3.png",
        }
    ];

    const handleClickUpgrade = () => {
        setUgrade(true);
        naviage("/subcribtion");
    }

    return (
        <div className="max-w-7xl mx-auto px-4 font-sans text-gray-800 my-10">
            {
                !ugrade && (
                    <div>
                        {/* Header Section */}
                        <header className="mb-12">
                            <h1 className="text-2xl font-bold text-[#58001C] mb-4">
                                Personalized Marriage Counselling
                            </h1>
                            <p className="text-[#737373] text-base leading-relaxed">
                                Connect with our expert marriage consultants for personalized guidance and support.
                                Whether you need advice on compatibility, relationship building or preparation
                                for a lasting marriage, our consultants are here to help.
                            </p>
                        </header>

                        {/* Main Content Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            <div className="space-y-12">
                                <h2 className="text-2xl font-bold text-[#58001C] mb-4">How it works?</h2>

                                <div className="space-y-10 mt-5">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex items-center gap-6">
                                            <div className="w-24 h-24 shrink-0">
                                                <img
                                                    src={step.icon}
                                                    alt={step.title}
                                                    className="w-full h-full object-contain rounded-xl"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[#7A1D35] mb-1">
                                                    {step.title}
                                                </h3>
                                                <p className="text-[#737373] text-base leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative flex justify-center">
                                <img
                                    src={images.marrigeImage}
                                    alt="Consultation Illustration"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-16 flex justify-center cursor-pointer">
                            <button onClick={handleClickUpgrade} className="bg-[#B3003B] hover:bg-[#8B002E] text-white font-bold py-3 px-12 rounded-full transition-colors duration-300 cursor-pointer">
                                Upgrade to Premium
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default MarriageCounselling;