import React from 'react';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden h-full">
    <Skeleton className="w-full aspect-video rounded-2xl mb-6" />
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6" />
    <div className="mt-6 flex justify-between items-center">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

export const MemberSkeleton = () => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
    <Skeleton className="w-32 h-32 rounded-full mb-4" />
    <Skeleton className="h-6 w-32 mb-2" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export const StatSkeleton = () => (
  <div className="text-center p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white/40">
    <Skeleton className="h-10 w-24 mx-auto mb-2" />
    <Skeleton className="h-4 w-32 mx-auto" />
  </div>
);

export default Skeleton;
