import React from "react";

const TeacherProfileSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header Skeleton */}
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-96 bg-gray-100 rounded-lg mt-2 animate-pulse" />
      </div>

      {/* Main Banner Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
        <div className="w-28 h-28 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-24 bg-gray-100 rounded-lg mt-2 animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-32 bg-gray-100 rounded-lg animate-pulse" />
            <div className="h-8 w-32 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Forms Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 h-[500px] flex flex-col gap-8">
            <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex flex-col gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-11 w-full bg-gray-50 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 h-[400px] flex flex-col gap-6">
            <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-11 w-full bg-gray-50 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileSkeleton;
