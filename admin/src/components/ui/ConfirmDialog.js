import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title = 'Confirm Action', message = 'Are you sure?', confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, type = 'danger' }) => {
  if (!isOpen) return null;

  const buttonClass = type === 'danger'
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-indigo-600 hover:bg-indigo-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className={`rounded-full p-2 ${type === 'danger' ? 'bg-red-100' : 'bg-indigo-100'}`}>
            <AlertTriangle className={`h-5 w-5 ${type === 'danger' ? 'text-red-600' : 'text-indigo-600'}`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg ${buttonClass} px-4 py-2 text-sm font-medium text-white transition-colors`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
