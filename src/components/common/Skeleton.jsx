import React from 'react';

// Basic block skeleton with optional width/height/rounded classes
export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`} />
);

// Skeleton text line with sensible defaults
export const SkeletonText = ({ lines = 1, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'} rounded`}
        />
      ))}
    </div>
  );
};

// Table skeleton for data tables
export const TableSkeleton = ({ columns = 5, rows = 10 }) => {
  const cols = Array.isArray(columns)
    ? columns.length
    : typeof columns === 'number'
      ? columns
      : 5;

  return (
    <div className="w-full">
      <div className="border-b" />
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-3 text-left">
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-b">
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c} className="p-3">
                  <div className={`h-4 rounded bg-gray-200 animate-pulse ${c === 0 ? 'w-12' : c === cols - 1 ? 'w-32' : 'w-24'}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Card skeleton for detail or list items
export const CardSkeleton = ({ lines = 3, showActions = true }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-48 rounded" />
        {showActions && (
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded" />
            <Skeleton className="h-9 w-28 rounded" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <SkeletonText lines={lines} />
      </div>
    </div>
  );
};

export default Skeleton;
