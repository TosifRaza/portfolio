import React from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder = '',
  className = '',
  inputClassName = '',
  required = false,
  disabled = false,
  rows,
  options = [],
  ...props
}) => {
  const baseInputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:bg-gray-100 disabled:cursor-not-allowed';

  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          rows={rows || 4}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={`${baseInputClass} ${errorClass} ${inputClassName}`}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          disabled={disabled}
          {...register(name)}
          className={`${baseInputClass} ${errorClass} ${inputClassName}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="flex items-center gap-2">
          <input
            id={name}
            type="checkbox"
            disabled={disabled}
            {...register(name)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            {...props}
          />
          <label htmlFor={name} className="text-sm text-gray-700">
            {placeholder}
          </label>
        </div>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={`${baseInputClass} ${errorClass} ${inputClassName}`}
          {...props}
        />
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;
