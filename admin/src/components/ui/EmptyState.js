import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ icon: Icon = Inbox, title = 'No data found', description = 'There is nothing to display yet.', actionLabel, onAction, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>
      <p className="mb-6 max-w-sm text-center text-sm text-gray-500">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
