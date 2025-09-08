
import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex items-center justify-center gap-4">
                <Icon name="music" className="w-12 h-12 text-blue-400" />
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    AI Album Cover Generator
                </h1>
            </div>
            <p className="mt-4 text-lg text-gray-300">
                Crafting visual identities for your sound, powered by Gemini.
            </p>
        </header>
    );
};
