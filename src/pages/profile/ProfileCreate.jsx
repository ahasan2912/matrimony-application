import { ChevronDown, Map, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import HeadingTitle from "../../components/home/HeadingTitle";
import loveIcon from '../../assets/images/svg/loveIcon.svg';
import { useNavigate } from "react-router-dom";

const ProfileCreate = () => {
    const [candidateType, setCandidateType] = useState('candidate');
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        navigate('/typeselected');
    };

    const inputStyle = "w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700";
    const labelStyle = "block text-xl text-[#262626] font-semibold mb-2 ml-1";
    return (
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6 pt-10 pb-20">
            <div className="max-w-7xl w-full rounded-3xl">
                <HeadingTitle />

                <img src={loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    <section>
                        <h2 className="text-2xl font-semibold text-[#58001C] mb-6">Who is this profile for?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-between items-start">
                                <div>
                                    <p className="text-xl font-semibold text-[#262626]">I am the Candidate</p>
                                    <p className="text-sm mt-1 text-[#737373]">I manage all aspects of this profile, including matches and conversations.</p>
                                </div>
                                <input
                                    type="radio"
                                    value="candidate"
                                    {...register("profileType")}
                                    checked={candidateType === "candidate"}
                                    onChange={(e) => setCandidateType(e.target.value)}
                                    className="mt-1 w-5 h-5 accent-red-700"
                                />
                            </label>
                            <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-between items-start">
                                <div>
                                    <p className="text-xl font-semibold text-[#262626]">I am the Guardian</p>
                                    <p className="text-sm mt-1 text-[#737373]">I manage this profile on behalf of my child, overseeing interactions.</p>
                                </div>
                                <input
                                    type="radio" {...register("profileType")}
                                    value="guardian"
                                    checked={candidateType === "guardian"}
                                    onChange={(e) => setCandidateType(e.target.value)}
                                    className="mt-1 w-5 h-5 accent-red-700" />
                            </label>
                        </div>
                    </section>
                    {/* for candidate */}
                    {
                        candidateType === "candidate" && (
                            <div>
                                <section>
                                    <h2 className="text-2xl font-semibold text-[#58001C] mb-6">Personal Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelStyle}>What is your name?</label>
                                            <input
                                                type="text"
                                                {...register("fullName", { required: true })}
                                                placeholder="Emter your full name"
                                                className={inputStyle} />
                                        </div>
                                        <div className="date">
                                            <label className={labelStyle}>Date of Birth</label>
                                            <input
                                                type="date"
                                                {...register("dob", { required: true })}
                                                className={inputStyle} />
                                        </div>
                                        <div className="gender">
                                            <label className={labelStyle}>What is your Gender?</label>
                                            <select
                                                {...register("gender", { required: true })}
                                                className={inputStyle}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Height</label>
                                            <input
                                                {...register("height", { required: true })}
                                                placeholder="4'0'' (122 cm)"
                                                className={inputStyle} />
                                        </div>
                                        <div className="religion">
                                            <label className={labelStyle}>What is your Religion?</label>
                                            <select
                                                {...register("religion", { required: true })}
                                                className={inputStyle}>
                                                <option value="Islam">Islam</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Select your Sect</label>
                                            <select
                                                {...register("sect", { required: true })}
                                                className={inputStyle}>
                                                <option value="Sunni">Sunni</option>
                                                <option value="Siya">Siya</option>
                                                <option value="Ahmadiyya">Ahmadiyya</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Select your Cast</label>
                                            <select
                                                {...register("cast", { required: true })}
                                                className={inputStyle}>
                                                <option value="Phatan">Phatan</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Your Location</label>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    {...register("location", { required: true })}
                                                    placeholder="Lahore, Punjab, Pakistan"
                                                    className={inputStyle} />
                                                <MapPin className="absolute right-2 text-gray-400 pointer-events-none" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mt-12">
                                    <h2 className="text-xl font-bold text-red-900 mb-6">Relationship and Family Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <label className={labelStyle}>What is your relationship status?</label>
                                            <select {...register("status", { required: true })} className={inputStyle}>
                                                <option value="divorced">Divorced</option>
                                                <option value="single">Single</option>
                                                <option value="widowed">Widowed</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Do you have children?</label>
                                            <select {...register("children", { required: true })} className={inputStyle}>
                                                <option value="yes">Yes, I have children</option>
                                                <option value="no">No</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    }

                    {/* for guardian */}

                    {
                        candidateType === "guardian" && (
                            <div>
                                <section>
                                    <h2 className="text-2xl font-semibold text-[#58001C] mb-6">Personal Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelStyle}>What is your name?</label>
                                            <input
                                                type="text"
                                                {...register("fullName", { required: true })}
                                                placeholder="Emter your full name"
                                                className={inputStyle} />
                                        </div>
                                        <div className="date">
                                            <label className={labelStyle}>Date of Birth</label>
                                            <input
                                                type="date"
                                                {...register("dob", { required: true })}
                                                className={inputStyle} />
                                        </div>
                                        <div className="gender">
                                            <label className={labelStyle}>What is your Gender?</label>
                                            <select
                                                {...register("gender", { required: true })}
                                                className={inputStyle}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Height</label>
                                            <input
                                                {...register("height", { required: true })}
                                                placeholder="4'0'' (122 cm)"
                                                className={inputStyle} />
                                        </div>
                                        <div className="religion">
                                            <label className={labelStyle}>What is your Religion?</label>
                                            <select
                                                {...register("religion", { required: true })}
                                                className={inputStyle}>
                                                <option value="Islam">Islam</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Select your Sect</label>
                                            <select
                                                {...register("sect", { required: true })}
                                                className={inputStyle}>
                                                <option value="Sunni">Sunni</option>
                                                <option value="Siya">Siya</option>
                                                <option value="Ahmadiyya">Ahmadiyya</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Select your Cast</label>
                                            <select
                                                {...register("cast", { required: true })}
                                                className={inputStyle}>
                                                <option value="Phatan">Phatan</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Your Location</label>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    {...register("location", { required: true })}
                                                    placeholder="Lahore, Punjab, Pakistan"
                                                    className={inputStyle} />
                                                <MapPin className="absolute right-2 text-gray-400 pointer-events-none" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mt-12">
                                    <h2 className="text-xl font-bold text-red-900 mb-6">Relationship and Family Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <label className={labelStyle}>What is your relationship status?</label>
                                            <select {...register("status", { required: true })} className={inputStyle}>
                                                <option value="divorced">Divorced</option>
                                                <option value="single">Single</option>
                                                <option value="widowed">Widowed</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Do you have children?</label>
                                            <select {...register("children", { required: true })} className={inputStyle}>
                                                <option value="yes">Yes, I have children</option>
                                                <option value="no">No</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    }

                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                            Continue
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ProfileCreate;