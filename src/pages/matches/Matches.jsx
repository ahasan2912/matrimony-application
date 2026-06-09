import { useEffect, useRef, useState } from 'react';
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
    Star,
    UserRound,
    X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../../data/data';
import { images as Icon } from '../../../public/image';
import { useGetMyCandidateDataQuery } from '../../features/candidates/candidates';
import ProfileDetailsSkeleton from '../../components/loading- skeletons/ProfileDetailsSkeleton';
import { useGetSwipFeedDataQuery, useHandleClickCandidateReactionMutation } from '../../features/swipfeed/swipfeedApi';
import Conversation from './components/Conversation';
import {
    EMPTY_CARDS,
    EMPTY_STATE_CLASS,
    formatDistance,
    formatLabel,
    formatMatchScore,
    getAboutText,
    getLabeledItems,
    getResumeCardIndex,
    getStoredResume,
    getTargetCandidateId,
    persistResumeState,
    saveStoredResume,
    normalizeArray,
} from './utils';
import { useSelector } from 'react-redux';

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
    const {user} = useSelector(state => state?.auth);
    console.log(user);

    const [cursor, setCursor] = useState(() => getStoredResume()?.cursor ?? null);
    const pendingResumeRef = useRef(getStoredResume());
    const [feedState, setFeedState] = useState({ pages: [], currentPageIndex: 0 });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isConversation, setConversation] = useState(false);
    const [isRestarting, setIsRestarting] = useState(false);
    const [reactionFlash, setReactionFlash] = useState(null); // 'LIKE' | 'SUPER_LIKE' | null
    const { data: candidateData, isLoading } = useGetMyCandidateDataQuery();
    const candidateId = candidateData?.data?.candidate?._id;
    const limit = 10;
    const {
        currentData: matchingCandidate,
        isLoading: matchingCandidateLoading,
        isFetching: matchingCandidateFetching,
        refetch: refetchMatchingCandidate,
    } = useGetSwipFeedDataQuery({ candidateId, cursor, limit }, {
        skip: !candidateId
    });
    const [handleClickCandidateReaction, { isLoading: reactionLoading }] = useHandleClickCandidateReactionMutation();
    const isFeedBusy = matchingCandidateFetching || reactionLoading;

    useEffect(() => {
        if (!candidateId) {
            return;
        }

        const storedResume = getStoredResume();

        pendingResumeRef.current = storedResume;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCursor(storedResume?.cursor ?? null);
        setFeedState({ pages: [], currentPageIndex: 0 });
        setCurrentCardIndex(0);
        setCurrentImageIndex(0);
    }, [candidateId]);

    useEffect(() => {
        const pageData = matchingCandidate?.data;

        if (!pageData) {
            return;
        }

        const pageCursor = cursor ?? null;
        const newPage = {
            cursor: pageCursor,
            cards: pageData.cards ?? EMPTY_CARDS,
            nextCursor: pageData.nextCursor ?? null,
        };
        const pendingResume = pendingResumeRef.current;
        const nextCardIndex = getResumeCardIndex(newPage, pendingResume, pageCursor);

        // Feed page save keeps each cursor result available for previous/next navigation.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFeedState((prevState) => {
            const existingPageIndex = prevState.pages.findIndex((page) => page.cursor === pageCursor);

            if (existingPageIndex !== -1) {
                const nextPages = [...prevState.pages];
                nextPages[existingPageIndex] = newPage;
                return {
                    pages: nextPages,
                    currentPageIndex: existingPageIndex,
                };
            }

            return {
                pages: [...prevState.pages, newPage],
                currentPageIndex: prevState.pages.length,
            };
        });
        setCurrentCardIndex(nextCardIndex);
        setCurrentImageIndex(0);
        pendingResumeRef.current = null;
        persistResumeState(newPage, nextCardIndex);
        setIsRestarting(false);
    }, [matchingCandidate, cursor]);

    if (isLoading || matchingCandidateLoading || isRestarting) {
        return <ProfileDetailsSkeleton />
    }

    const { pages: feedPages, currentPageIndex } = feedState;
    const currentPage = feedPages[currentPageIndex];
    const cards = currentPage?.cards ?? EMPTY_CARDS;
    if (!candidateId) {
        return (
            <div className={EMPTY_STATE_CLASS}>
                <h2 className="text-2xl font-semibold text-[#58001C]">Create your candidate profile first</h2>
                <p className="text-[#737373] mt-2">Matches will appear here after your profile is ready.</p>
            </div>
        );
    }

    if (!cards.length) {
        return (
            <div className={EMPTY_STATE_CLASS}>
                <h2 className="text-2xl font-semibold text-[#58001C]">No matches found</h2>
                <p className="text-[#737373] mt-2">Your matching feed is empty right now.</p>
            </div>
        );
    }
    const safeCardIndex = Math.min(currentCardIndex, cards.length - 1);
    const currentCard = cards[safeCardIndex];
    const targetCandidateId = getTargetCandidateId(currentCard);
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
    const hasLoadedNextPage = currentPageIndex < feedPages.length - 1;
    const canMoveForward = Boolean(currentPage && cards.length);
    const hasPreviousCard = safeCardIndex > 0 || currentPageIndex > 0;
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
    const aboutText = getAboutText({ name, age, livesIn, religion, matchScore, card: currentCard });

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

    // End-of-feed restart clears cursor and asks the feed API for the first page again.
    const restartFeed = () => {
        saveStoredResume(null);
        pendingResumeRef.current = null;
        setFeedState({ pages: [], currentPageIndex: 0 });
        setCurrentCardIndex(0);
        setCurrentImageIndex(0);
        setIsRestarting(true);

        if (cursor) {
            setCursor(null);
            return;
        }

        refetchMatchingCandidate();
    };

    // One movement path controls skip and the auto-advance after successful reactions.
    const goToNextProfile = () => {
        if (!canMoveForward || isFeedBusy) {
            return;
        }

        if (safeCardIndex < cards.length - 1) {
            const nextCardIndex = safeCardIndex + 1;

            persistResumeState(currentPage, nextCardIndex);
            setCurrentCardIndex(nextCardIndex);
            setCurrentImageIndex(0);
            return;
        }

        if (hasLoadedNextPage) {
            const nextPageIndex = currentPageIndex + 1;
            const nextLoadedPage = feedPages[currentPageIndex + 1];

            persistResumeState(nextLoadedPage, 0);
            setFeedState((prevState) => ({
                ...prevState,
                currentPageIndex: nextPageIndex,
            }));
            setCurrentCardIndex(0);
            setCurrentImageIndex(0);
            return;
        }

        if (currentPage?.nextCursor) {
            pendingResumeRef.current = null;
            setCursor(currentPage.nextCursor);
            return;
        }

        restartFeed();
    };

    const showPreviousCandidate = () => {
        if (!hasPreviousCard) {
            return;
        }

        if (safeCardIndex > 0) {
            const previousCardIndex = safeCardIndex - 1;

            persistResumeState(currentPage, previousCardIndex);
            setCurrentCardIndex(previousCardIndex);
            setCurrentImageIndex(0);
            return;
        }

        const previousPageIndex = currentPageIndex - 1;
        const previousPageCards = feedPages[previousPageIndex]?.cards ?? EMPTY_CARDS;
        const previousPage = feedPages[previousPageIndex];
        const previousCardIndex = Math.max(previousPageCards.length - 1, 0);

        persistResumeState(previousPage, previousCardIndex);
        setFeedState((prevState) => ({
            ...prevState,
            currentPageIndex: previousPageIndex,
        }));
        setCurrentCardIndex(previousCardIndex);
        setCurrentImageIndex(0);
    };

    // Reactions submit first, then auto-advance exactly like a swipe.
    const handleCandidateReaction = async (reaction) => {
        if (!targetCandidateId || isFeedBusy) {
            return;
        }

        try {
            await handleClickCandidateReaction({
                candidateId,
                targetCandidateId,
                type: reaction,
                source: "FEED"
            }).unwrap();
            // Show flash animation on success
            setReactionFlash(reaction);
            setTimeout(() => setReactionFlash(null), 900);
            goToNextProfile();
        } catch (error) {
            console.error('Failed to submit candidate reaction:', error);
        }
    }

    const handleConversation = () => {
        setConversation(true);
    }
    return (
        <div className="max-w-7xl mx-auto my-12.5 px-4">
            <div className="overflow-hidden rounded-2xl border border-[#F1DDE4] bg-white shadow-[0_18px_55px_rgba(88,0,28,0.08)] flex flex-col lg:flex-row text-gray-800">
                <div className="relative lg:w-[48%] bg-[#111111]">
                    <div className="relative group h-155 max-h-[82vh] min-h-135 lg:h-172 lg:max-h-none lg:min-h-0 overflow-hidden">
                        <img
                            src={currentImage}
                            alt={name}
                            className="w-full h-full object-cover transition-all duration-500" />

                        {/* Reaction flash overlay */}
                        {reactionFlash && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
                                <div
                                    className="flex flex-col items-center gap-3 animate-reaction-pop"
                                    style={{
                                        animation: 'reactionPop 0.9s ease-out forwards',
                                    }}
                                >
                                    {reactionFlash === 'LIKE' ? (
                                        <>
                                            <div className="rounded-full bg-[#C2004D]/90 backdrop-blur-sm p-6 shadow-[0_0_60px_rgba(194,0,77,0.6)]">
                                                <Heart size={72} fill="white" className="text-white drop-shadow-lg" />
                                            </div>
                                            <span className="text-white text-2xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                                Liked! 💖
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="rounded-full bg-[#289ac7]/90 backdrop-blur-sm p-6 shadow-[0_0_60px_rgba(40,154,199,0.6)]">
                                                <Star size={72} fill="white" className="text-white drop-shadow-lg" />
                                            </div>
                                            <span className="text-white text-2xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                                Super Liked! ⭐
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

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
                                className={`size-12 rounded-lg bg-white/8 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors ${hasPreviousCard ? 'cursor-pointer hover:bg-white/18' : 'cursor-not-allowed opacity-45'}`}
                            >
                                <RotateCcw size={25} />
                            </button>
                            <button
                                type="button"
                                onClick={goToNextProfile}
                                disabled={!canMoveForward || isFeedBusy}
                                aria-label="Show next candidate"
                                className={`size-14 rounded-lg bg-white/10 text-[#FF3D73] flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors ${canMoveForward && !isFeedBusy ? 'cursor-pointer hover:bg-white/20' : 'cursor-not-allowed opacity-45'}`}
                            >
                                <X size={31} strokeWidth={3} />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleCandidateReaction('LIKE')}
                                disabled={!targetCandidateId || isFeedBusy}
                                aria-label={`Like ${name}`}
                                className={`size-14 rounded-lg bg-[#C2004D] text-white flex items-center justify-center shadow-[0_14px_32px_rgba(194,0,77,0.3)] transition-colors hover:bg-[#A90043] ${targetCandidateId && !isFeedBusy ? 'cursor-pointer' : 'cursor-not-allowed opacity-45'}`}
                            >
                                <Heart size={31} fill="currentColor" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleCandidateReaction('SUPER_LIKE')}
                                disabled={!targetCandidateId || isFeedBusy}
                                aria-label={`Super like ${name}`}
                                className={`size-12 rounded-lg bg-[#289ac7] text-white flex items-center justify-center shadow-[0_14px_32px_rgba(40,154,199,0.3)] transition-colors hover:bg-[#4eb5dd] ${targetCandidateId && !isFeedBusy ? 'cursor-pointer' : 'cursor-not-allowed opacity-45'}`}
                            >
                                <Star size={25} fill="currentColor" />
                            </button>
                            <button onClick={handleConversation} type="button" className="size-12 rounded-lg cursor-pointer bg-white/8 text-white flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors hover:bg-white/18">
                                <MessageCircle size={25} />
                            </button>
                        </div>
                    </div>
                </div>

                {isConversation && (
                    <Conversation
                        candidate={currentCard}
                        image={currentImage}
                        onClose={() => setConversation(false)}
                        targetCandidateId={targetCandidateId}
                    />
                )}

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
                                        <InfoRow key={item} icon={item === matchScore ? '' : MapPin} active={item === matchScore}>
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
                                className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-[#C2004D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#A90043]"
                            > Upgrade
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Matches;
