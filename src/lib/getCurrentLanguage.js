export const getCurrentLanguage = () => {
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    return match ? match[1] : "en";
};