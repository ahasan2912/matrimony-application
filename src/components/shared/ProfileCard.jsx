import { PencilLine, Settings, AlertTriangle, ChevronRight } from 'lucide-react';
import { images } from '../../../public/image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileCard = ({ menuRef }) => {
    const { user } = useSelector((state) => state.auth);
    
    

    return (
        <div ref={menuRef} className="flex justify-center items-center p-4 absolute right-0 top-16 z-50">
            <div className="w-full  bg-linear-to-b from-[#F5F5F5] to-[#FFEFF1] rounded-xl shadow-sm border border-[#737373] p-5 transition-all duration-500 ease-out">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full border-2 border-pink-600 p-0.5">
                            <img
                                src={user?.picture || user?.ahasanImage}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-xl font-semibold text-gray-800">{user?.full_name}</h2>
                            <img src={images.verified} alt="verifiedIcon" />
                        </div>
                        <Link to='/profilePreview' className="flex items-center text-[#737373] text-base hover:text-gray-700 transition-colors mt-1.5">
                            View profile <ChevronRight size={16} className="ml-1" />
                        </Link>
                    </div>
                </div>

                <hr className="border-gray-100 mb-2" />

                <div className="space-y-1">
                    <Link to='/'
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-gray-600"><PencilLine size={20} /></span>
                            <span className="font-medium text-[15px]">Edit Details</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600" />
                    </Link>
                    <Link to='/'
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-gray-600"><Settings size={20} /></span>
                            <span className="font-medium text-[15px]">Matchmaking Preferences</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600" />
                    </Link>
                    <Link to='/blockpage'
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-gray-600"><AlertTriangle size={20} /></span>
                            <span className="font-medium text-[15px]">Report & Blocking</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600" />
                    </Link>
                </div>
                <div className="mt-6">
                    <Link className="bg-[#b3003b] hover:bg-[#900030] text-white font-bold py-2.5 px-8 rounded-full transition-all active:scale-95">
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;