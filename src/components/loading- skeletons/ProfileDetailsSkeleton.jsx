import React from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const DetailTitleSkeleton = () => (
  <Skeleton className="h-6 w-32 bg-gray-300" />
);

const PillSkeleton = () => (
  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
);

const RowSkeleton = () => (
  <div className="flex items-center gap-2 py-2 border-b border-gray-200">
    <Skeleton className="h-4 w-4 rounded" />
    <Skeleton className="h-4 w-full" />
  </div>
);

export default function ProfileDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto my-12.5 px-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow flex flex-col lg:flex-row">

        {/* LEFT IMAGE SECTION */}
        <div className="relative lg:w-[48%] bg-gray-100">
          <div className="relative h-155 lg:h-170 overflow-hidden">

            {/* Image */}
            <Skeleton className="w-full h-full rounded-none" />

            {/* Top bars */}
            <div className="absolute left-5 right-5 top-4 flex gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-1 flex-1 bg-gray-300" />
              ))}
            </div>

            {/* Match badge */}
            <div className="absolute top-8 left-5">
              <Skeleton className="h-7 w-28 rounded-full bg-gray-300" />
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-24 left-6 space-y-3">
              <Skeleton className="h-7 w-40 bg-gray-300" />
              <Skeleton className="h-4 w-24 bg-gray-300" />

              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
                <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
                <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={`bg-gray-300 ${
                    i === 1 || i === 3 ? "h-14 w-14" : "h-12 w-12"
                  } rounded-xl`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 px-6 py-6 lg:px-7 lg:py-7 space-y-6">

          {/* ABOUT */}
          <div className="space-y-3">
            <DetailTitleSkeleton />
            <Skeleton className="h-4 w-full max-w-md bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />

            <div className="flex flex-wrap gap-2 mt-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <PillSkeleton key={i} />
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* GRID SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">

            {/* Match Details */}
            <div className="space-y-3">
              <DetailTitleSkeleton />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </div>

            {/* Profile */}
            <div className="space-y-3">
              <DetailTitleSkeleton />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* PERSONALITY */}
          <div className="space-y-3">
            <DetailTitleSkeleton />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <PillSkeleton key={i} />
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* PREMIUM BLOCK */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-gray-300" />
                <Skeleton className="h-3 w-52 bg-gray-200" />
              </div>
            </div>

            <Skeleton className="h-9 w-28 rounded-lg bg-gray-300" />
          </div>

        </div>
      </div>
    </div>
  );
}