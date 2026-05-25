import { BriefcaseBusiness, Home, MapPin, MapPinHouse, Moon } from 'lucide-react';
import { useGetNearbyMatchesQuery } from '../../../features/swipfeed/swipfeedApi';
import { formatDistance, formatLabel, formatMatchScore, formatWord, getProfileImage } from '../components/nearby/nearbyUtils';
import { images } from '../../../../public/image';
import ProfileGridSkeleton from '../components/nearby/NearbyCardSkeleton';

const Nearby = () => {
    const { data: nearbyProfiles, isLoading } = useGetNearbyMatchesQuery({
        radiusKm: 50,
        page: 1,
        limit: 20
    });

    if (isLoading) {
        return (
            <div><ProfileGridSkeleton /></div>
        );
    }

    const profiles = nearbyProfiles?.data || [];

    return (
        <div>
            <div className="mb-5 flex items-center gap-2">
                <MapPinHouse className="text-[#B6003F]" />
                <p className="text-xl font-semibold text-[#262626]">{'Nearby matches'}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {profiles.map((profile) => {
                    const occupation = profile?.labels?.occupation || formatLabel(profile?.occupation);
                    const religion = profile?.labels?.religion || formatLabel(profile?.religion);
                    const distance = formatDistance(profile?.distanceKm);
                    const matchScore = formatMatchScore(profile?.matchScore);

                    return (
                        <div key={profile?._id || profile?.id || profile?.name} className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-lg">
                            <img
                                src={getProfileImage(profile)}
                                alt={profile?.name || 'Nearby match'}
                                className="h-full w-full object-cover relative"
                            />

                            {matchScore && (
                                <div className="mb-2 flex w-fit items-center gap-1 rounded-full bg-[#B6003F]/85 px-2.5 py-1 text-xs font-semibold absolute top-2 left-2 text-white">
                                    {matchScore}
                                </div>
                            )}

                            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-4 text-white">
                                <div className="mb-1 flex items-center gap-2">
                                    <h3 className="text-lg font-bold">
                                        {profile?.name || 'Unknown candidate'} {profile?.age}
                                    </h3>
                                    {profile?.badge && <img src={images.verified} alt="verified" />}
                                </div>

                                <div className="mb-2 flex flex-wrap gap-2 text-xs">
                                    <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 backdrop-blur-md">
                                        <BriefcaseBusiness size={13} /> {formatWord(occupation)}
                                    </span>
                                    <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 backdrop-blur-md">
                                        <Moon size={13} /> {formatWord(religion)}
                                    </span>
                                </div>

                                <p className="flex items-center gap-1 text-xs opacity-90">
                                    <MapPin size={13} />
                                    {profile?.livesIn || location || 'Location not provided'}{distance ? ` - ${distance}` : ''}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Nearby;
