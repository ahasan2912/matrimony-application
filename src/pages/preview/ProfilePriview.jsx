import { PencilIcon, EyeIcon, Pencil, MapPin, ChevronDown } from 'lucide-react';
import { images } from '../../../public/image';
import EditImageUploaded from './EditImageUploaded';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ProfilePriview = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            fullName: 'Ahsan Habib',
            location: 'Lahore, Punjab, Pakistan',
            dob: '20/12/2000',
            height: '121cm',
        }
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="max-w-7xl px-4 mx-auto text-gray-900 mt-10 md:mt-20">
            <div className="flex flex-col  sm:flex-row items-center gap-6 mb-6">
                {/* Avatar Container */}
                <div className="relative">
                    <div className="w-50 h-50 rounded-full border-4 border-[#B6003F] overflow-hidden">
                        <img
                            src={images.ahasanImage}
                            alt="Ahsan Habib"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute top-2 left-36 bg-white rounded-full">
                        <img src={images.verified} alt="verified" />
                    </div>
                </div>

                {/* Name and Action Section */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold text-[#171717] tracking-tight">Ahsan Habib</h1>
                    <Link to='/viewuserprofile' className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#FFD1DC] bg-[#FFF0F3] text-[#F43F5E] text-sm font-semibold transition-hover hover:bg-[#FFE4E9] cursor-pointer">
                        <EyeIcon size={16} />
                        Profile Preview
                    </Link>
                </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-[#58001C]">Bio</h2>
                    <PencilIcon size={20} className="text-[#5D1229] cursor-pointer" />
                </div>

                <div className="relative">
                    <textarea
                        placeholder="Share who you are, what you love, and what makes you unique."
                        className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-[#F43F5E] focus:border-transparent outline-none placeholder:text-gray-400"
                    />
                    <span className="absolute bottom-3 right-4 text-sm text-gray-400">
                        10/100
                    </span>
                </div>
            </div>

            {/* Your photos */}
            <div>
                <div className="flex items-center gap-2 mt-10">
                    <h2 className="text-2xl font-bold text-[#58001C]">Your Photos</h2>
                    <PencilIcon size={20} className="text-[#5D1229] cursor-pointer" />
                </div>
                <div>
                    <EditImageUploaded />
                </div>
                {/* personal information */}
                <h2 className="text-2xl font-semibold text-[#58001C] mb-4">Personal Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-800">
                            Name <Pencil size={14} className="text-gray-400" />
                        </label>
                        <input
                            {...register("fullName")}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-50 focus:outline-none"
                        />
                    </div>

                    {/* Location Field */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-800">
                            Location <Pencil size={14} className="text-gray-400" />
                        </label>
                        <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register("location")}
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Date of Birth Field */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-semibold text-gray-800">
                            Date of birth <Pencil size={14} className="text-gray-400" />
                        </label>
                        <div className="relative">
                            <input
                                type='date'
                                {...register("dob")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* Height */}
                    <div>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Height <Pencil size={14} className="text-gray-400" />
                            </label>
                            <div className="relative">
                                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    {...register("height", { required: true })}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none" placeholder="122" />
                            </div>
                        </div>
                    </div>
                    {/* Relationship & Parental Status */}
                    <div>
                        <h1 className='text-[#58001C] font-semibold text-2xl'>Relationship & Parental Status</h1>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Relationship Status <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("relationship", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Single">Single</option>
                                <option value="Engaged">Engaged</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Parental Status <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("parental", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Yes, I have children">Yes, I have children</option>
                                <option value="No, I don't have children">No, I don't have children</option>
                            </select>
                        </div>
                    </div>

                    {/* Interest & Personality */}
                    <div>
                        <h1 className='text-[#58001C] font-semibold text-2xl'>Interest & Personality</h1>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Interest <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("interest", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Basketball">Basketball</option>
                                <option value="Pets">Pets</option>
                                <option value="History">History</option>
                                <option value="Styling">Styling</option>
                                <option value="Swimming">Swimming</option>
                                <option value="Astrology">Astrology</option>
                                <option value="Abroad">Abroad</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Listening to Music">Listening to Music</option>
                            </select>
                        </div>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Personality <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("personality", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Outgoing">Outgoing</option>
                                <option value="Introverted">Introverted</option>
                                <option value="Loyal">Loyal</option>
                                <option value="Empathetic">Empathetic</option>
                                <option value="Calm/Patient">Calm/Patient</option>
                            </select>
                        </div>
                    </div>

                    {/* Habits & Future Plan */}
                    <div>
                        <h1 className='text-[#58001C] font-semibold text-2xl'>Interest & Personality</h1>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Habits <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("habibt", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Sunni">Sunni</option>
                                <option value="Siya">Siya</option>
                                <option value="Ahmadiyya">Ahmadiyya</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Future Plan <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("future", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Sunni">Sunni</option>
                                <option value="Siya">Siya</option>
                                <option value="Ahmadiyya">Ahmadiyya</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>

                    {/* Education & Occupation */}
                    <div>
                        <h1 className='text-[#58001C] font-semibold text-2xl'>Interest & Personality</h1>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Education <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("education", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="High School">High School</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="relative mt-4">
                            <label className="flex items-center gap-2 font-semibold text-gray-800">
                                Occupation <Pencil size={14} className="text-gray-400" />
                            </label>
                            <select
                                {...register("occupation", { required: true })}
                                className='w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700 mt-2'>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Lawyer">Lawyer</option>
                                <option value="Business">Business</option>
                                <option value="Student">Student</option>
                                <option value="Artist">Artist</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button type="submit" className="bg-[#B6003F] text-white px-10 py-3 rounded-full font-semibold hover:bg-red-800 transition-all shadow-md">
                            Update Profile
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ProfilePriview;