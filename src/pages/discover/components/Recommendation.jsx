import { images } from '../../../assets/image';

const Recommendation = ({ profiles }) => {
    return (
        <div>
            <header className="mb-8">
                <h2 className="text-xl font-semibold text-[#FF225E] flex gap-1 items-center">
                    <img src={images.pinkstart} alt="start-image" />
                    <span className="text-xl font-semibold text-[#FF225E]">
                        AI-Recommended Matches
                    </span>
                </h2>
                <p className="text-[#737373] text-base mt-2">
                    Based on your preferences and values, our AI has carefully selected matches for you.
                    Your family's input ensures that these suggestions align with your goals for a meaningful connection.
                </p>
            </header>

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

                        <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-md p-1.5 rounded-full">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendation;