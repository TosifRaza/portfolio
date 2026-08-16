import React, { createContext, useContext, useCallback } from 'react';
import toast from 'react-hot-toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const showToast = useCallback(
    (message, type = 'success') => {
      const options = {
        duration: 3000,
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '14px',
        },
      };

      switch (type) {
        case 'success':
          toast.success(message, options);
          break;
        case 'error':
          toast.error(message, options);
          break;
        case 'loading':
          return toast.loading(message, options);
        case 'info':
        default:
          toast(message, { ...options, icon: 'ℹ️' });
          break;
      }
    },
    []
  );

  return <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
