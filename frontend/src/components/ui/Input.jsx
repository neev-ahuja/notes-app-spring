import React from 'react';

const Input = ({ label, id, type = 'text', placeholder, value, onChange, error, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-warm-text mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`
          w-full px-4 py-3 rounded-xl border border-warm-primary/40 outline-none
          bg-warm-bg/50 text-warm-text
          focus:ring-2 focus:ring-warm-primary focus:border-warm-primary
          placeholder-warm-text-muted
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          ${className}
        `}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
