import { useEffect, useRef, useState } from 'react';
import Recommendation from './components/Recommendation';
import Nearby from './components/Nearby';
import Interactions from './components/Interactions';
import { useGetNearbyMatchesQuery } from '../../features/swipfeed/swipfeedApi';

const NEARBY_RADIUS_KM = 25;
const NEARBY_LIMIT = 20;

const getProfileId = (profile) => (
    profile?._id
    || profile?.id
    || profile?.candidateId
    || profile?.targetCandidateId
);

const appendUniqueProfiles = (previousProfiles, nextProfiles) => {
    const seenIds = new Set(previousProfiles.map(getProfileId).filter(Boolean));
    const uniqueProfiles = [...previousProfiles];

    nextProfiles.forEach((profile) => {
        const id = getProfileId(profile);

        if (!id || seenIds.has(id)) {
            return;
        }

        seenIds.add(id);
        uniqueProfiles.push(profile);
    });

    return uniqueProfiles;
};

const Discover = () => {
    const [activeTab, setActiveTab] = useState('AI Recommendation');
    const [nearbyPage, setNearbyPage] = useState(1);
    const [nearbyProfiles, setNearbyProfiles] = useState([]);
    const [nearbyMeta, setNearbyMeta] = useState(null);
    const [hasMoreNearby, setHasMoreNearby] = useState(true);
    const loadMoreRef = useRef(null);

    // Mock data for the cards
    const recommendations = Array(15).fill({
        name: "Hania Amir",
        age: 21,
        occupation: "Student",
        religion: "Islam",
        location: "Lahore, Punjab, Pakistan",
        imageUrl: "https://outspoken.newagebd.com/files/img/202509/973c08360b8ad3917ef2c56f57e6daf1.jpg",
    });
    // Mock data for the cards
    const interactions = Array(15).fill({
        name: "Hania Amir",
        age: 21,
        occupation: "Student",
        religion: "Islam",
        location: "Lahore, Punjab, Pakistan",
        imageUrl: "https://i.ibb.co.com/qYBv1KKy/image.png",
    });

    const isNearbyTabActive = activeTab === 'Nearby matches';
    const {
        data: nearbyMatchesData,
        isLoading: nearbyInitialLoading,
        isFetching: nearbyFetching,
        error: nearbyError,
    } = useGetNearbyMatchesQuery(
        { radiusKm: NEARBY_RADIUS_KM, page: nearbyPage, limit: NEARBY_LIMIT },
        { skip: !isNearbyTabActive }
    );

    useEffect(() => {
        const responseData = nearbyMatchesData?.data;
        const responseMeta = nearbyMatchesData?.meta;

        if (!nearbyMatchesData || !Array.isArray(responseData)) {
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNearbyProfiles((previousProfiles) => appendUniqueProfiles(previousProfiles, responseData));
        setNearbyMeta(responseMeta ?? null);
        setHasMoreNearby(
            responseMeta
                ? Number(responseMeta.page) < Number(responseMeta.totalPage)
                : responseData.length === NEARBY_LIMIT
        );
    }, [nearbyMatchesData]);

    useEffect(() => {
        if (!isNearbyTabActive) {
            return undefined;
        }

        const sentinel = loadMoreRef.current;

        if (!sentinel) {
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;

            if (entry.isIntersecting && hasMoreNearby && !nearbyFetching) {
                setNearbyPage((currentPage) => currentPage + 1);
            }
        }, {
            rootMargin: '220px 0px',
        });

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [hasMoreNearby, isNearbyTabActive, nearbyFetching]);

    const tabs = ['AI Recommendation', 'Nearby matches', 'My Interactions'];
    return (
        <div className="max-w-7xl mx-auto px-4 bg-white min-h-screen">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4 py-5 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 md:py-3 text-sm space-x-2 rounded-full font-medium transition-colors duration-200 text-nowrap ${activeTab === tab
                            ? 'bg-[#b30047] text-white rounded-full'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Dynamic Content based on Active Tab */}
            {activeTab === 'AI Recommendation' && <Recommendation profiles={recommendations} />}
            {activeTab === 'Nearby matches' && (
                <Nearby
                    profiles={nearbyProfiles}
                    location={nearbyMeta?.currentLocation}
                    isInitialLoading={nearbyInitialLoading && !nearbyProfiles.length}
                    isLoadingMore={nearbyFetching && Boolean(nearbyProfiles.length)}
                    hasMore={hasMoreNearby}
                    loadMoreRef={loadMoreRef}
                    error={nearbyError}
                />
            )}
            {activeTab === 'My Interactions' && <Interactions profiles={interactions} />}
        </div >
    );
};

export default Discover;
