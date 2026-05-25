import React from "react";

const ProfileGridSkeleton = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-lg bg-linear-to-br from-[#F8E8ED] via-[#F1DDE4] to-[#EBD2DD]">
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-[#F8E8ED] via-[#FFEAF2] to-[#F1DDE4]" />

          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#B6003F] via-[#D4006E] to-transparent" />

          <div className="absolute top-3 left-3 h-6 w-20 animate-pulse rounded-full bg-[#B6003F]/40" />

          <div className="absolute top-0 inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 inset-0 flex flex-col justify-end p-4 space-y-2">
            {/* Name skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 animate-pulse rounded bg-white/40" />
              <div className="h-5 w-8 animate-pulse rounded bg-white/40" />
            </div>

            {/* Tags skeleton */}
            <div className="flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded-md bg-white/30" />
              <div className="h-5 w-14 animate-pulse rounded-md bg-white/30" />
            </div>

            {/* Location skeleton */}
            <div className="h-4 w-32 animate-pulse rounded bg-white/25" />
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-pulse opacity-50">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#B6003F]/10 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGridSkeleton;