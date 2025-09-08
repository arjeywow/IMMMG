import React from 'react';
import { Icon } from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false, className, ...props }) => {
    return (
        <button
            className={`flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed whitespace-nowrap ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Icon name="loader" className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />}
            {children}
        </button>
    );
};
