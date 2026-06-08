export const EMPTY_CARDS = [];
export const EMPTY_STATE_CLASS = 'min-h-[calc(100vh-423px)] px-4 py-12 text-center flex flex-col items-center justify-center';

const FEED_RESUME_STORAGE_KEY = 'swipeFeedResume';

// Resume storage keeps the exact visible profile stable across browser reloads.
export const getStoredResume = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const value = localStorage.getItem(FEED_RESUME_STORAGE_KEY);
        return value ? JSON.parse(value) : null;
    } catch {
        localStorage.removeItem(FEED_RESUME_STORAGE_KEY);
        return null;
    }
};

export const saveStoredResume = (value) => {
    if (typeof window === 'undefined') {
        return;
    }

    if (value) {
        localStorage.setItem(FEED_RESUME_STORAGE_KEY, JSON.stringify(value));
    } else {
        localStorage.removeItem(FEED_RESUME_STORAGE_KEY);
    }
};

export const normalizeArray = (value) => {
    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }

    return value ? [value] : [];
};

export const formatLabel = (value) => {
    if (!value) {
        return '';
    }

    return String(value)
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const formatDistance = (distanceKm) => {
    const distance = Number(distanceKm);

    return Number.isFinite(distance) ? `${distance.toFixed(1)} km away` : '';
};

export const formatMatchScore = (matchScore) => {
    const score = Number(matchScore);

    return Number.isFinite(score) ? `${Math.round(score)}% match` : '';
};

export const getLabeledItems = (labeledItems, rawItems) => {
    const labels = normalizeArray(labeledItems);

    if (labels.length) {
        return labels;
    }

    return normalizeArray(rawItems).map(formatLabel).filter(Boolean);
};

export const getTargetCandidateId = (card) => (
    card?.targetCandidateId
    || card?.candidateId
    || card?.candidate?._id
    || card?.candidate?.id
    || card?._id
    || card?.id
);

export const persistResumeState = (page, cardIndex) => {
    const card = page?.cards?.[cardIndex];

    if (!page || !card) {
        saveStoredResume(null);
        return;
    }

    saveStoredResume({
        cursor: page.cursor,
        cardIndex,
        targetCandidateId: getTargetCandidateId(card),
    });
};

export const getResumeCardIndex = (page, pendingResume, pageCursor) => {
    const shouldRestoreCard = pendingResume && (pendingResume.cursor ?? null) === pageCursor;

    if (!shouldRestoreCard) {
        return 0;
    }

    const restoredByIdIndex = page.cards.findIndex(
        (card) => getTargetCandidateId(card) === pendingResume?.targetCandidateId
    );
    const fallbackResumeIndex = Math.min(
        Math.max(Number(pendingResume?.cardIndex) || 0, 0),
        Math.max(page.cards.length - 1, 0)
    );

    // Exact-card restore prefers profile id because index alone can point to the wrong person.
    return restoredByIdIndex !== -1 ? restoredByIdIndex : fallbackResumeIndex;
};

export const getAboutText = ({ name, age, livesIn, religion, matchScore, card }) => (
    card?.aboutMe
    || card?.about
    || card?.bio
    || `${name}${age ? ` is ${age} years old` : ''}${livesIn ? ` and lives in ${livesIn}` : ''}${religion ? `. Religion: ${religion}` : ''}${matchScore ? `. ${matchScore}.` : '.'}`
);
