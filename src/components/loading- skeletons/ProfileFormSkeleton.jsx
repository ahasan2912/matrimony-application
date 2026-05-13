import React from "react";
import HeadingTitle from "../home/HeadingTitle";

const ProfileFormSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6 pt-10 pb-20">
            <div className="max-w-7xl w-full rounded-3xl animate-pulse">
                {/* Heading Skeleton */}
                <HeadingTitle />

                {/* Decorative Icons Skeleton */}
                <div className="hidden sm:block absolute top-10 left-10 h-14 w-14 rounded-full bg-pink-100" />
                <div className="hidden sm:block absolute bottom-20 right-20 h-10 w-10 rounded-full bg-pink-100" />

                <div className="space-y-10">
                    {/* Candidate Info */}
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <div className="h-5 w-48 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100" />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <div className="h-5 w-36 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-md border-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="relative">
                                <div className="h-5 w-56 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-24 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Height */}
                            <div>
                                <div className="h-5 w-24 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100">
                                    <div className="ml-6 mt-4.25 h-4 w-32 bg-gray-200 rounded-md" />
                                </div>
                            </div>

                            {/* Religion */}
                            <div className="relative">
                                <div className="h-5 w-56 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-28 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Sect */}
                            <div className="relative">
                                <div className="h-5 w-40 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-24 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Cast */}
                            <div className="relative">
                                <div className="h-5 w-36 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-28 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <div className="h-5 w-36 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-44 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-gray-300" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Relationship Section */}
                    <section className="mt-12">
                        <div className="h-6 w-72 bg-gray-200 rounded-md mb-6" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Relationship with candidate */}
                            <div className="relative">
                                <div className="h-5 w-72 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-20 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Relationship status */}
                            <div className="relative">
                                <div className="h-5 w-80 max-w-full bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-pink-200 bg-pink-50/40 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-28 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            {/* Children */}
                            <div className="relative">
                                <div className="h-5 w-56 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-gray-100 relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-16 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Career and Education */}
                    <section className="relative mt-12 rounded-[28px] bg-[#FFF7FA] px-4 py-7 sm:px-6">
                        <div className="pointer-events-none absolute left-1/2 top-10 hidden h-11 w-11 -translate-x-1/2 rounded-full bg-pink-100 md:block" />
                        <div className="h-7 w-64 bg-gray-200 rounded-md mb-6" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                            <div className="relative">
                                <div className="h-5 w-52 bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-white relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-24 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="h-5 w-80 max-w-full bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-white relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-44 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="h-5 w-72 max-w-full bg-gray-200 rounded-md mb-3 ml-1" />
                                <div className="h-12.5 w-full rounded-full border border-gray-200 bg-white relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-36 bg-gray-200 rounded-md" />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border-r-2 border-b-2 border-gray-300" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Button */}
                    <div className="flex justify-center pt-6">
                        <div className="h-13 w-full sm:w-45 rounded-full bg-[#b3003b]/25 shadow-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFormSkeleton;
