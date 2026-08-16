import React from 'react';

const Skeleton = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
      ))}
    </>
  );
};

const SkeletonCard = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-6">
    <Skeleton className="mb-4 h-4 w-1/3" />
    <Skeleton className="h-8 w-1/2" />
  </div>
);

const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-16 w-full" />
    ))}
  </div>
);

export { Skeleton, SkeletonCard, SkeletonTable };
export default Skeleton;
