import { MapPinCheck, SquarePen } from 'lucide-react';
import { images } from '../../../../public/image';

const Nearby = ({ profiles }) => {
    return (
        <div>
            <div className='flex items-center gap-2 mb-5'>
                <MapPinCheck className='text-[#B6003F]'/>
                <p className='text-[#262626] text-xl font-semibold'>Lahore, Punjab, Pakistan</p>
                <SquarePen className='text-[#B6003F]'/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {profiles.map((profile, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden shadow-lg aspect-3/4">
                        <img
                            src={profile.imageUrl}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{profile.name} {profile.age}</h3>
                                <img src={images.verified} alt="" />
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs mb-2">
                                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                                    🏠 {profile.occupation}
                                </span>
                                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                                    🌙 {profile.religion}
                                </span>
                            </div>

                            <p className="text-xs flex items-center gap-1 opacity-90">
                                📍 {profile.location}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nearby;