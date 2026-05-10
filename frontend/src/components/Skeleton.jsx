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

export const HeroSkeleton = () => (
  <Skeleton className="absolute inset-0 w-full h-full rounded-[2rem]" />
);

export const ProjectDetailsSkeleton = () => (
  <div className="bg-gray-50 min-h-screen overflow-hidden">
    <Skeleton className="w-full h-[95vh] min-h-[600px] rounded-none" />
    <div className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6" />
          <div className="mt-16">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <Skeleton className="h-96 w-full rounded-[2.5rem]" />
        </div>
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="p-8 space-y-8 w-full">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="h-32 rounded-3xl w-full" />
      <Skeleton className="h-32 rounded-3xl w-full" />
      <Skeleton className="h-32 rounded-3xl w-full" />
    </div>
    <div className="mt-8 space-y-4">
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-16 w-full rounded-2xl" />
      <Skeleton className="h-16 w-full rounded-2xl" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full space-y-4">
    <Skeleton className="h-12 w-full rounded-xl" />
    <Skeleton className="h-12 w-full rounded-xl" />
    <Skeleton className="h-12 w-full rounded-xl" />
    <Skeleton className="h-12 w-full rounded-xl" />
    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);

export default Skeleton;
