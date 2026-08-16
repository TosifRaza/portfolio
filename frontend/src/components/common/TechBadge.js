import React from 'react';

export default function TechBadge({ name, className = '' }) {
  if (!name) return null;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        bg-indigo-500/10 text-indigo-300 border border-indigo-500/20
        ${className}`}
    >
      {name}
    </span>
  );
}