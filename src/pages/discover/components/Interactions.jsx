import { useState } from 'react';
import { images } from '../../../assets/image';
import Like from './Like';

const Interactions = ({ profiles }) => {
    const [activeInstractionTab, setActiveInstractionTab] = useState('Visitors');
    const tabs = ['Visitors', 'Like'];
    console.log(activeInstractionTab);
    return (
        <div>
            <div className="flex gap-5 overflow-x-auto pb-4">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveInstractionTab(tab)}
                        className={`px-2 py-2 text-sm space-x-2 w-fit font-medium transition-colors duration-200 text-nowrap rounded ${activeInstractionTab === tab
                            ? 'border-b-4 border-[#B6003F] text-gray-500 inline-block'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            {
                activeInstractionTab === 'Visitors' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {profiles.map((profile, index) => (
                            <div key={index} className="relative group rounded-xl overflow-hidden shadow-lg aspect-3/4">
                                <img
                                    src={profile.imageUrl}
                                    alt={profile.name}
                                    className="w-full h-full object-cover" />

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
                )
            }
            {
                activeInstractionTab === 'Like' && <Like profiles={profiles} />
            }
        </div>
    );
};

export default Interactions;