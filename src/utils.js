export const formatTimeAgo = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diff = Math.floor((now - createdAt) / 1000); // in seconds

    const years = Math.floor(diff / (3600 * 24 * 365));
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;

    const months = Math.floor(diff / (3600 * 24 * 30));
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;

    const weeks = Math.floor(diff / (3600 * 24 * 7));
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;

    const days = Math.floor(diff / (3600 * 24));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;

    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    return `just now`;
};

export const getAudioDuration = (url) => {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
        audio.addEventListener('error', () => {
            resolve(0); // if failed to load
        });
    });
};

