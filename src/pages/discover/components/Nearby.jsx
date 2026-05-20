import { Home, MapPin, MapPinCheck, Moon, Percent, SquarePen } from 'lucide-react';
import { images } from '../../../../public/image';

const fallbackImage = "https://t4.ftcdn.net/jpg/09/75/07/11/360_F_975071103_e99E3iSot86QtdT8vRJUyTOYao83XxRB.jpg";

const formatLabel = (value) => {
    if (!value) {
        return 'Not provided';
    }

    return String(value)
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDistance = (distanceKm) => {
    const distance = Number(distanceKm);

    return Number.isFinite(distance) ? `${distance.toFixed(1)} km away` : '';
};

const formatMatchScore = (matchScore) => {
    const score = Number(matchScore);

    return Number.isFinite(score) ? `${Math.round(score)}% match` : '';
};

const getProfileImage = (profile) => {
    const firstImage = Array.isArray(profile?.images) ? profile.images[0] : null;

    return firstImage || fallbackImage;
};

const NearbyCardSkeleton = () => (
    <div className="aspect-3/4 animate-pulse rounded-xl bg-[#F8E8ED]" />
);

const Nearby = ({
    profiles,
    location,
    isInitialLoading = false,
    isLoadingMore = false,
    hasMore = false,
    loadMoreRef,
    error,
}) => {
    const shouldShowEmpty = !isInitialLoading && !error && profiles.length === 0;

    return (
        <div>
            <div className="mb-5 flex items-center gap-2">
                <MapPinCheck className="text-[#B6003F]" />
                <p className="text-xl font-semibold text-[#262626]">{location || 'Nearby matches'}</p>
                <SquarePen className="text-[#B6003F]" />
            </div>

            {error && (
                <div className="rounded-xl border border-[#F6A7C2] bg-[#FFEAF2] px-4 py-5 text-sm font-medium text-[#8A0034]">
                    Unable to load nearby matches right now.
                </div>
            )}

            {isInitialLoading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {Array.from({ length: 10 }, (_, index) => (
                        <NearbyCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {shouldShowEmpty && (
                <div className="rounded-xl border border-[#F1DDE4] bg-white px-4 py-14 text-center shadow-sm">
                    <h3 className="text-xl font-semibold text-[#58001C]">No nearby matches found</h3>
                    <p className="mt-2 text-sm text-[#737373]">Try again later when more profiles are available near you.</p>
                </div>
            )}

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
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-4 text-white">
                                {matchScore && (
                                    <div className="mb-2 flex w-fit items-center gap-1 rounded-full bg-[#B6003F]/85 px-2.5 py-1 text-xs font-semibold">
                                        <Percent size={13} />
                                        {matchScore}
                                    </div>
                                )}

                                <div className="mb-1 flex items-center gap-2">
                                    <h3 className="text-lg font-bold">
                                        {profile?.name || 'Unknown candidate'} {profile?.age}
                                    </h3>
                                    {profile?.badge && <img src={images.verified} alt="verified" />}
                                </div>

                                <div className="mb-2 flex flex-wrap gap-2 text-xs">
                                    <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 backdrop-blur-md">
                                        <Home size={13} /> {occupation}
                                    </span>
                                    <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 backdrop-blur-md">
                                        <Moon size={13} /> {religion}
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

            <div ref={loadMoreRef} className="h-10" />

            {isLoadingMore && (
                <p className="py-5 text-center text-sm font-medium text-[#B6003F]">Loading more nearby matches...</p>
            )}

            {!hasMore && profiles.length > 0 && (
                <p className="py-5 text-center text-sm text-[#737373]">You have seen all nearby matches.</p>
            )}
        </div>
    );
};

export default Nearby;
