export const formatLabel = (value) => {
    if (!value) {
        return 'Not provided';
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

export const getProfileImage = (profile) => {
    const firstImage = Array.isArray(profile?.images) ? profile.images[0] : null;

    return firstImage;
};


 export const formatWord = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
