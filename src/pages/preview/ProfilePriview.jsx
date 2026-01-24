import { PencilIcon, EyeIcon   } from 'lucide-react';
import { images } from '../../assets/image';
import EditImageUploaded from './EditImageUploaded';
import PersonalInformation from './PersonalInformation';
import { Link } from 'react-router-dom';

const ProfilePriview = () => {
    
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
                    <div className="absolute top-2 left-36 bg-white">
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
                <PersonalInformation />
            </div>
        </div>
    );
};

export default ProfilePriview;