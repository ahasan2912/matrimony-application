import { useEffect } from "react";

const GoogleTranslator = () => {
    useEffect(() => {
        if (document.getElementById("google-translate-script")) return;

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,bn,ur",
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // 🔥 Remove Google header
        const observer = new MutationObserver(() => {
            const banner = document.querySelector(".goog-te-banner-frame");
            if (banner) banner.remove();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            id="google_translate_element"
            className="hidden"
        />
    );
};

export default GoogleTranslator;