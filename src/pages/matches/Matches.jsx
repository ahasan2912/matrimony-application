import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    CornerUpRight,
    Heart,
    Images,
    Lock,
    MapPin,
    MessageCircle,
    Moon,
    Percent,
    RotateCcw,
    Split,
    UserRound,
    X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../../data/data';
import { images as Icon } from '../../../public/image';
import { useGetMyCandidateDataQuery } from '../../features/candidates/candidates';
import ProfileDetailsSkeleton from '../../components/loading- skeletons/ProfileDetailsSkeleton';
import { useGetSwipFeedDataQuery } from '../../features/swipfeed/swipfeedApi';

const EMPTY_CARDS = [];

const normalizeArray = (value) => {
    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }

    return value ? [value] : [];
};

const formatLabel = (value) => {
    if (!value) {
        return '';
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

const getLabeledItems = (labeledItems, rawItems) => {
    const labels = normalizeArray(labeledItems);

    if (labels.length) {
        return labels;
    }

    return normalizeArray(rawItems).map(formatLabel).filter(Boolean);
};

const DetailTitle = ({ children }) => (
    <h3 className="text-[22px] font-semibold text-[#9e133f]">
        {children}
    </h3>
);

const DetailPill = ({ children, active = false }) => (
    <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-[13px] font-medium ${active
        ? 'border-[#FF9BB7] bg-[#FFEFF1] text-[#C2004D]'
        : 'border-[#E7DDE1] bg-white text-[#1F2937]'
        }`}>
        {children}
    </span>
);

const InfoRow = ({ children, icon: RowIcon, active = false }) => (
    <div className="flex items-center gap-2 border-b border-[#E9DDE2] py-2 text-sm text-[#1F2937]">
        {RowIcon && <RowIcon size={16} className={active ? 'text-[#C2004D]' : 'text-[#6B7280]'} />}
        <span className={active ? 'font-medium text-[#C2004D]' : ''}>{children}</span>
    </div>
);

const Matches = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { data: candidateData, isLoading } = useGetMyCandidateDataQuery();
    const candidateId = candidateData?.data?.candidate?._id;
    const { data: matchingCandidate, isLoading: matchingCandidateLoading } = useGetSwipFeedDataQuery(candidateId, {
        skip: !candidateId,
    });
    const cards = matchingCandidate?.data?.cards ?? EMPTY_CARDS;

    if (isLoading || matchingCandidateLoading) {
        return <ProfileDetailsSkeleton />
    }

    if (!candidateId) {
        return (
            <div className="max-w-7xl mx-auto bg-white rounded-[20px] my-12.5 px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold text-[#58001C]">Create your candidate profile first</h2>
                <p className="text-[#737373] mt-2">Matches will appear here after your profile is ready.</p>
            </div>
        );
    }

    if (!cards.length) {
        return (
            <div className="max-w-7xl mx-auto bg-white rounded-[20px] my-12.5 px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold text-[#58001C]">No matches found</h2>
                <p className="text-[#737373] mt-2">Your matching feed is empty right now.</p>
            </div>
        );
    }

    const safeCardIndex = Math.min(currentCardIndex, cards.length - 1);
    const currentCard = cards[safeCardIndex];
    const candidateImages = normalizeArray(currentCard?.images);
    const profileImages = candidateImages.length ? candidateImages : images;
    const safeImageIndex = Math.min(currentImageIndex, profileImages.length - 1);
    const currentImage = profileImages[safeImageIndex] ?? profileImages[0];
    const name = currentCard?.name || 'Unknown candidate';
    const age = currentCard?.age;
    const livesIn = currentCard?.livesIn;
    const religion = currentCard?.labels?.religion || formatLabel(currentCard?.religion);
    const gender = formatLabel(currentCard?.gender);
    const distance = formatDistance(currentCard?.distanceKm);
    const matchScore = formatMatchScore(currentCard?.matchScore);
    const personalityTags = getLabeledItems(currentCard?.labels?.personality, currentCard?.personality);
    const isProfileVerified = Boolean(
        currentCard?.isVerified || currentCard?.verified || currentCard?.verificationStatus
    );
    const hasNextCard = safeCardIndex < cards.length - 1;
    const hasPreviousCard = safeCardIndex > 0;
    const profileHighlights = [
        age ? `${age} years old` : '',
        gender,
        religion,
        matchScore,
    ].filter(Boolean);
    const matchDetails = [
        matchScore,
        distance,
        livesIn ? `Lives in ${livesIn}` : '',
    ].filter(Boolean);
    const aboutText = currentCard?.aboutMe
        || currentCard?.about
        || currentCard?.bio
        || `${name}${age ? ` is ${age} years old` : ''}${livesIn ? ` and lives in ${livesIn}` : ''}${religion ? `. Religion: ${religion}` : ''}${matchScore ? `. ${matchScore}.` : '.'}`;

    const nextImage = () => {
        if (profileImages.length <= 1) {
            return;
        }

        setCurrentImageIndex((prev) => (prev === profileImages.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        if (profileImages.length <= 1) {
            return;
        }

        setCurrentImageIndex((prev) => (prev === 0 ? profileImages.length - 1 : prev - 1));
    };

    const showNextCandidate = () => {
        if (!hasNextCard) {
            return;
        }

        setCurrentCardIndex(safeCardIndex + 1);
        setCurrentImageIndex(0);
    };

    const showPreviousCandidate = () => {
        if (!hasPreviousCard) {
            return;
        }

        setCurrentCardIndex(safeCardIndex - 1);
        setCurrentImageIndex(0);
    };

    return (
        <div className="max-w-7xl mx-auto my-12.5 px-4">
            <div className="overflow-hidden rounded-2xl border border-[#F1DDE4] bg-white shadow-[0_18px_55px_rgba(88,0,28,0.08)] flex flex-col lg:flex-row text-gray-800">
                <div className="relative lg:w-[48%] bg-[#111111]">
                    <div className="relative group h-155 max-h-[82vh] min-h-135 lg:h-165 lg:max-h-none lg:min-h-0 overflow-hidden">
                        <img
                            src={currentImage}
                            alt={name}
                            className="w-full h-full object-cover transition-all duration-500" />

                        <div className="absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-black/55 to-transparent" />

                        <div className="absolute left-5 right-5 top-4 z-20 flex gap-1.5">
                            {profileImages.map((_, index) => (
                                <div
                                    key={`${currentCard?._id || name}-${index}`}
                                    className={`h-1 flex-1 rounded-full ${index === safeImageIndex ? 'bg-[#FF3D73]' : 'bg-white/40'}`}
                                />
                            ))}
                        </div>

                        <div className="absolute top-8 left-5 z-20 bg-white/18 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/25">
                            <img src={Icon?.hartIcon} alt="" className="w-4 h-4" />
                            <span className="text-sm font-semibold text-white">{matchScore || 'Matched Profile'}</span>
                        </div>

                        {profileImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    aria-label="Previous profile image"
                                    className="absolute left-5 top-1/2 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/35 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    aria-label="Next profile image"
                                    className="absolute right-5 top-1/2 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/35 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </>
                        )}

                        <div className="absolute inset-x-0 bottom-0 z-10 h-[60%] bg-linear-to-t from-black via-black/72 to-transparent" />

                        <div className="absolute bottom-24 left-0 right-0 z-20 px-6 text-white">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <h2 className="text-[28px] sm:text-3xl font-bold leading-tight text-white">{name}</h2>
                                {age && <span className="text-[28px] sm:text-3xl font-bold leading-tight text-white">{age}</span>}
                                {isProfileVerified && <img className="w-6 h-6" src={Icon.verified} alt="verified icon" />}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {/* {gender && (
                                    <div className="bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1 w-fit">
                                        <UserRound size={13} /> {gender}
                                    </div>
                                )}
                                {religion && (
                                    <div className="bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1 w-fit">
                                        <Moon size={13} /> {religion}
                                    </div>
                                )} */}
                                {livesIn && (
                                    <div className="bg-[#6b6565] backdrop-blur-md px-3 py-1.5 mt-3 rounded-full text-xs font-medium text-white flex items-center gap-1 w-fit">
                                        <MapPin size={13} /> <span>{livesIn}</span>
                                    </div>
                                )}
                                {distance && (
                                    <div className="bg-[#6b6565] backdrop-blur-md px-3 py-1.5 mt-3 rounded-full text-xs font-medium text-white flex items-center gap-1 w-fi">
                                        <CornerUpRight size={13} /> {distance}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={showPreviousCandidate}
                                disabled={!hasPreviousCard}
                                aria-label="Show previous candidate"
                                className={`size-12 rounded-xl bg-white/8 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors ${hasPreviousCard ? 'cursor-pointer hover:bg-white/18' : 'cursor-not-allowed opacity-45'}`}
                            >
                                <RotateCcw size={25} />
                            </button>
                            <button
                                type="button"
                                onClick={showNextCandidate}
                                disabled={!hasNextCard}
                                aria-label="Show next candidate"
                                className={`size-14 rounded-xl bg-white/10 text-[#FF3D73] flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors ${hasNextCard ? 'cursor-pointer hover:bg-white/20' : 'cursor-not-allowed opacity-45'}`}
                            >
                                <X size={31} strokeWidth={3} />
                            </button>
                            <button type="button" className="size-12 rounded-xl cursor-pointer bg-white/8 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors hover:bg-white/18">
                                <MessageCircle size={25} />
                            </button>
                            <button type="button" className="size-14 rounded-xl cursor-pointer bg-[#C2004D] text-white flex items-center justify-center shadow-[0_14px_32px_rgba(194,0,77,0.3)] transition-colors hover:bg-[#A90043]">
                                <Heart size={31} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 px-6 py-6 lg:px-7 lg:py-7">
                    <div className="flex items-start justify-between gap-4">
                        <section className="min-w-0">
                            <DetailTitle>About me</DetailTitle>
                            <p className="mt-3 max-w-2xl text-base leading-6 text-[#1F2937]">
                                {aboutText}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {profileHighlights.map((item) => (
                                    <DetailPill key={item} active={item === matchScore}>{item}</DetailPill>
                                ))}
                            </div>
                        </section>


                    </div>

                    <div className="my-6 h-px bg-[#E9DDE2]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
                        <section>
                            <DetailTitle>Match Details</DetailTitle>
                            <div className="mt-3">
                                {matchDetails.length ? (
                                    matchDetails.map((item) => (
                                        <InfoRow key={item} icon={item === matchScore ? Percent : MapPin} active={item === matchScore}>
                                            {item}
                                        </InfoRow>
                                    ))
                                ) : (
                                    <DetailPill>Not provided</DetailPill>
                                )}
                            </div>
                        </section>

                        <section>
                            <DetailTitle>Profile</DetailTitle>
                            <div className="mt-3">
                                {gender && <InfoRow icon={UserRound}>{gender}</InfoRow>}
                                {religion && <InfoRow icon={Moon}>{religion}</InfoRow>}
                                <InfoRow icon={Images}>{profileImages.length} photo{profileImages.length > 1 ? 's' : ''}</InfoRow>
                            </div>
                        </section>
                    </div>

                    <div className="my-6 h-px bg-[#E9DDE2]" />

                    <section>
                        <DetailTitle>Personality</DetailTitle>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {personalityTags.length ? (
                                personalityTags.map((tag) => (
                                    <DetailPill key={tag}>{tag}</DetailPill>
                                ))
                            ) : (
                                <DetailPill>Not provided</DetailPill>
                            )}
                        </div>
                    </section>

                    <div className="my-6 h-px bg-[#E9DDE2]" />

                    <section>
                        <DetailTitle>Detailed Information</DetailTitle>
                        <div className="mt-3 flex flex-col gap-4 rounded-xl border border-[#F6A7C2] bg-[#FFEAF2] p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C2004D] text-white">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-[#8A0034]">Premium Feature</h4>
                                    <p className="mt-1 text-xs leading-5 text-[#C2004D]">
                                        Upgrade to see your feed position and boost visibility.
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/subcribtion"
                                className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-[#C2004D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#A90043]"
                            >
                                Upgrade
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Matches;
