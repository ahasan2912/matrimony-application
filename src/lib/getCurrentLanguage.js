const COOKIE_NAME = "googtrans";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const getCookieDomains = () => {
    const { hostname } = window.location;

    if (!hostname || hostname === "localhost" || /^[\d.]+$/.test(hostname)) {
        return [];
    }

    const parts = hostname.split(".");

    return parts
        .map((_, index) => parts.slice(index).join("."))
        .filter((domain) => domain.includes("."));
};

const writeTranslateCookie = (value, maxAge, domain = "") => {
    const domainAttribute = domain ? `; domain=${domain}` : "";
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${domainAttribute}`;
};

export const getCurrentLanguage = () => {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
    return match ? match[1] : "en";
};

export const setGoogleTranslateLanguage = (lang) => {
    const value = lang === "en" ? "" : `/en/${lang}`;
    const maxAge = lang === "en" ? 0 : ONE_YEAR_IN_SECONDS;

    writeTranslateCookie(value, maxAge);
    getCookieDomains().forEach((domain) => {
        writeTranslateCookie(value, maxAge, domain);
        writeTranslateCookie(value, maxAge, `.${domain}`);
    });
};
