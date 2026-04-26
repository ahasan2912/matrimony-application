import { ArrowLeft, House } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff9fb_0%,#fbeef3_48%,#f6e4eb_100%)] px-4 py-10 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
                <div className="relative w-full max-w-5xl">
                    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-b from-[#FF9FBC] to-[#FF5A8D] shadow-[0_14px_28px_rgba(255,90,141,0.28)] rotate-45">
                            <span className="-rotate-45 text-lg font-bold leading-none text-white">!</span>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-[#F3DEE7] bg-white px-6 py-12 text-center shadow-[0_22px_55px_rgba(173,71,108,0.14)] sm:px-10 md:px-16 md:py-18">
                        <div className="mx-auto mb-8 flex w-18 h-18 items-center justify-center rounded-full border-2 border-[#F6B9CF] bg-[#FFF9FB] shadow-[0_10px_30px_rgba(236,72,153,0.08)]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D81B60] shadow-[0_10px_20px_rgba(216,27,96,0.24)]">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 20s-6.5-4.35-6.5-9.15C5.5 8.18 7.25 6.5 9.5 6.5c1.26 0 2.35.59 3.03 1.51A3.7 3.7 0 0 1 15.5 6.5c2.25 0 4 1.68 4 4.35C19.5 15.65 13 20 13 20h-1Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M12.8 7.8 11 11.15h1.7l-1.55 2.95"
                                        stroke="#D81B60"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#182033] sm:text-5xl">
                            Match Not Found
                        </h1>

                        <p className="mt-4 text-lg font-semibold text-[#E11D6F] sm:text-[1.45rem]">
                            Looks like this page hasn&apos;t found its perfect match yet.
                        </p>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#7A8599] sm:text-[1.35rem]">
                            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                            <br className="hidden sm:block" />
                            Let&apos;s guide you back to finding yours.
                        </p>

                        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
                            <Link
                                to="/"
                                className="flex py-3 sm:py-0 h-14 flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#E31C6F] to-[#F41F77] px-6 text-lg font-semibold text-white shadow-[0_16px_32px_rgba(227,28,111,0.28)] transition-transform hover:scale-[1.01]"
                            >
                                <House size={18} />
                                <span>Go to Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
