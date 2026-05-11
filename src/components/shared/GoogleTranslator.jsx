import { useEffect } from "react";

const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";
const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";

const initializeGoogleTranslate = () => {
    const translateElement = window.google?.translate?.TranslateElement;
    const element = document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID);

    if (!translateElement || !element || element.dataset.initialized === "true") return;

    new translateElement(
        {
            pageLanguage: "en",
            includedLanguages: "en,bn,ur,ar",
            autoDisplay: false,
        },
        GOOGLE_TRANSLATE_ELEMENT_ID
    );

    element.dataset.initialized = "true";
};

const GoogleTranslator = () => {
    useEffect(() => {
        window.googleTranslateElementInit = initializeGoogleTranslate;

        if (window.google?.translate?.TranslateElement) {
            initializeGoogleTranslate();
        } else if (!document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
            const script = document.createElement("script");
            script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        const observer = new MutationObserver(() => {
            const banner = document.querySelector(".goog-te-banner-frame");
            if (banner) banner.remove();
            document.body.style.top = "0px";
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            id={GOOGLE_TRANSLATE_ELEMENT_ID}
            className="hidden"
        />
    );
};

export default GoogleTranslator;
