import { useEffect, useState } from "react";
import { images } from "../../../public/image";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubcribtionFeatures = () => {
    const [selectedPlan, setSelectedPlan] = useState('Gold');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const handleSubmitPlan = () => {
        navigate("/marriageCounselling")
    }
    return (
        <div className="min-h-[70vh] bg-white mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-[#58001C] mb-2">Select your plan</h2>
                <p className="text-[#737373] text-base mb-12">Choose the plan that best suits your needs. You can change it anytime!</p>

                <div className="grid md:grid-cols-3 gap-6 mb-16 mt-10">

                    {/* Free Plan */}
                    <div
                        onClick={() => setSelectedPlan("Free")}
                        className={`bg-[#E5FFE5] rounded-xl p-6 relative cursor-pointer transition-transform hover:scale-105 border-2 ${selectedPlan === "Free" ? "border-gray-400" : "border-transparent"
                            }`}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-[#A1D9A1] to-[#689A69] text-white px-4 py-1 rounded-lg font-bold shadow-md">
                            $0.00 p/m
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-green-700">Free plan</h3>
                            <div className="bg-white/50 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-inner">
                                <img src={images.primiumLoveIcon} alt="primiumLoveIcon" />
                            </div>
                        </div>

                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 font-medium text-green-700">
                                <CheckCircle2 size={18} />
                                Limited likes
                            </li>
                            <li className="flex items-center gap-2 font-medium text-green-700">
                                <CheckCircle2 size={18} />
                                Basic profile visibility
                            </li>
                            <li className="flex items-center gap-2 font-medium text-green-700">
                                <CheckCircle2 size={18} />
                                In-app purchases available
                            </li>
                        </ul>
                    </div>

                    {/* Gold Plan */}
                    <div
                        onClick={() => setSelectedPlan("Gold")}
                        className={`bg-yellow-100 rounded-xl p-6 relative cursor-pointer transition-transform hover:scale-105 border-2 ${selectedPlan === "Gold" ? "border-gray-400" : "border-transparent"
                            }`}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white px-4 py-1 rounded-lg font-bold shadow-md">
                            $19.99 p/m
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-yellow-700">Gold plan</h3>
                            <div className="bg-white/50 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-inner">
                                <img src={images.rignGoldIcon} alt="rignGoldIcon" />
                            </div>
                        </div>

                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 font-medium text-yellow-700">
                                <CheckCircle2 size={18} />
                                Unlimited Likes
                            </li>
                            <li className="flex items-center gap-2 font-medium text-yellow-700">
                                <CheckCircle2 size={18} />
                                See who likes you
                            </li>
                            <li className="flex items-center gap-2 font-medium text-yellow-700">
                                <CheckCircle2 size={18} />
                                Marriage counseling
                            </li>
                        </ul>
                    </div>

                    {/* Platinum Plan */}
                    <div
                        onClick={() => setSelectedPlan("Platinum")}
                        className={`bg-blue-100 rounded-xl p-6 relative cursor-pointer transition-transform hover:scale-105 border-2 ${selectedPlan === "Platinum" ? "border-gray-400" : "border-transparent"
                            }`}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-[#7DD3FC] to-[#0EA5E9] text-white px-4 py-1 rounded-lg font-bold shadow-md">
                            $29.99 p/m
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-blue-700">Platinum plan</h3>
                            <div className="bg-white/50 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-inner">
                                <img src={images.dimondIcon} alt="dimondIcon" />
                            </div>
                        </div>

                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 font-medium text-blue-700">
                                <CheckCircle2 size={18} />
                                All gold plan features
                            </li>
                            <li className="flex items-center gap-2 font-medium text-blue-700">
                                <CheckCircle2 size={18} />
                                Profile boost
                            </li>
                            <li className="flex items-center gap-2 font-medium text-blue-700">
                                <CheckCircle2 size={18} />
                                Super Likes
                            </li>
                        </ul>
                    </div>

                </div>

                {/* CTA Button */}
                <div className="flex justify-center mb-5">
                    <button onClick={handleSubmitPlan} className="bg-[#B30042] hover:bg-[#900035] text-white sm:px-12 py-3 sm:py-4 rounded-full text-xl font-bold transition-all shadow-lg active:scale-95 w-full sm:w-auto">
                        Continue with {selectedPlan} Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubcribtionFeatures;