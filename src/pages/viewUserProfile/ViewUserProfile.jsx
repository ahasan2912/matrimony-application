import { interestsItem, priviewimages } from "../../data/data";
import { useState } from 'react';
import {
    ChevronLeft, ChevronRight, MapPin,
    Briefcase, Moon, Heart, X, RotateCcw, MessageCircle, GraduationCap, ShieldCheck,
    Eye,
} from 'lucide-react';
import { images as Icon } from '../../../public/image';
import SectionTitle from './components/SectionTitle';
import Badge from './components/Badge';

const ViewUserProfile = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === priviewimages.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? priviewimages.length - 1 : prev - 1));
    };

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-[20px] px-4">
            <div className=" mt-7 mb-5 bg-[#FFE0E5] px-2 py-0.5 w-fit rounded-full flex items-center gap-1 border border-[#FF5B83]">
                <Eye size={19} className="text-[#FF5B83]" />
                <p className="text-base text-[#FF5B83]">Ahasan Habib</p>
            </div>
            <div className="max-w-7xl mx-auto bg-white rounded-[20px] flex flex-col md:flex-row gap-8 text-gray-800 mb-12.5">
                <div className="w-full md:w-1/3">
                    {/* image section */}
                    <div className="relative group rounded-xl overflow-hidden aspect-4/5">
                        <img
                            src={priviewimages[currentImageIndex]}
                            alt="Profile"
                            className="w-full h-full object-cover transition-all duration-500" />

                        <div className="absolute top-4 left-4 bg-[#FFE0E5] backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                            <img src={Icon?.hartIcon} alt="" />
                            <span className="text-sm font-medium text-[#525252]">Family-Assisted</span>
                        </div>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 via-black/20 to-transparent text-white">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-semibold text-[#FFFFFF]">Sadia Hossain</h2>
                                <span className="text-2xl font-semibold text-[#FFFFFF]">21</span>
                                <img className='text-white' src={Icon.verified} alt="verified iocn" />
                            </div>
                            <div className="bg-[#525252] backdrop-blur-md px-3 py-1 mt-3 rounded-full text-xs text-[#E5E5E5] flex items-center gap-1 w-fit">
                                <MapPin size={14} /> <span>Lahore, Punjab, Pakistan</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <div className="bg-[#525252] backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#E5E5E5] flex items-center gap-1 w-fit">
                                    <Briefcase size={12} /> Student
                                </div>
                                <div className="bg-[#525252] backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#E5E5E5] flex items-center gap-1 w-fit">
                                    <Moon size={12} /> Islam
                                </div>
                                <div className="sm:ml-auto mt-2 flex items-center gap-1 text-xs bg-[#525252] text-[#E5E5E5] px-2 py-1 rounded-full">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active Yesterday
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Details */}
                <div className="flex-1 space-y-8">
                    {/* About Me Section */}
                    <section>
                        <SectionTitle>About me</SectionTitle>
                        <p className="text-[#737373] leading-relaxed text-sm md:text-base max-w-2xl">
                            I am a caring and family-oriented person who believes in honesty, respect, and mutual understanding.
                            I value meaningful relationships and am looking for a sincere, responsible life partner to build
                            a happy and respectful future together.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge>↑ 5'0" (152 cm)</Badge>
                            <Badge>💍 Divorced</Badge>
                            <Badge>👶 Doesn't have children</Badge>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Interests */}
                        <section>
                            <SectionTitle>Interests</SectionTitle>
                            <div className="flex flex-wrap gap-2">
                                {
                                    interestsItem.map((tag, index) => (
                                        <Badge key={index}>{tag}</Badge>
                                    ))}
                            </div>
                        </section>

                        {/* Verification */}
                        <section>
                            <SectionTitle>Verification Status</SectionTitle>
                            <div className="grid grid-cols-2 gap-2">
                                <Badge icon={ShieldCheck} img={Icon.verified} color="bg-[#FFEFF1]">Picture Verified</Badge>
                                <Badge icon={ShieldCheck} img={Icon.verified} color="bg-[#FFEFF1]">ID Verified</Badge>
                                <Badge icon={ShieldCheck} img={Icon.verified} color="bg-[#FFEFF1]">Parent Verified</Badge>
                                <Badge icon={ShieldCheck} img={Icon.verified} color="bg-[#FFEFF1]">Education Verified </Badge>
                            </div>
                        </section>

                        {/* Education & Personality */}
                        <section className="space-y-6">
                            <div>
                                <SectionTitle>Education & Occupation</SectionTitle>
                                <div className="flex gap-2">
                                    <Badge icon={GraduationCap}>Bachelor's Degree</Badge>
                                    <Badge icon={Briefcase}>Student</Badge>
                                </div>
                            </div>
                            <div>
                                <SectionTitle>Personality</SectionTitle>
                                <div className="flex flex-wrap gap-2">
                                    {['Outgoing 😎', 'Introverted 🤔', 'Loyal 🦁', 'Empathetic 💖', 'Calm/Patient 🧘'].map((tag, index) => (
                                        <Badge key={index}>{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Habits & Plans */}
                        <section className="space-y-6">
                            <div className='flex gap-10'>
                                <div>
                                    <SectionTitle>Sect & Caste</SectionTitle>
                                    <div className="flex gap-2">
                                        {['🕌Sunni', '👳Pathan'].map((tag, index) =>
                                            <Badge key={index}>{tag}</Badge>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <SectionTitle>Smoking and Alcohol Habits</SectionTitle>
                                <div className="flex gap-2">
                                    <Badge>🚭 Never Smoked</Badge>
                                    <Badge>🍷 Never Drank</Badge>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserProfile;