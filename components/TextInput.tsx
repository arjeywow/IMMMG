import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ id, label, ...props }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <input
                id={id}
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            />
        </div>
    );
};
