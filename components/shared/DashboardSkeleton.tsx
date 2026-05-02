import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-[260px] bg-[#0e2e1d] flex-col p-6 h-screen shrink-0">
        <div className="h-10 w-10 bg-white/10 rounded-xl mb-10 animate-pulse" />
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full bg-white/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
        <div className="mt-auto h-16 w-full bg-white/5 rounded-xl animate-pulse" />
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Skeleton */}
        <div className="h-20 border-b border-gray-100 flex items-center px-6 lg:px-8 bg-white shrink-0">
          <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="ml-auto h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Dashboard Body Skeleton */}
        <div className="p-6 lg:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white border border-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
          <div className="h-96 bg-white border border-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
