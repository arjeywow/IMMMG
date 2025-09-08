import React from 'react';

interface TypographySelectorProps {
    styles: readonly string[];
    selectedStyle: string;
    onStyleChange: (style: string) => void;
    disabled?: boolean;
}

const typographyPreviews: { [key: string]: string } = {
    'Bold Sans-Serif': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=lato',
    'Elegant Serif': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=playfair-display',
    'Handwritten Script': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=pacifico',
    'Futuristic Sci-Fi': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=orbitron',
    'Retro 80s Neon': 'https://placehold.co/120x80/000000/f0abfc/png?text=Aa&font=press-start-2p',
    'Gothic Blackletter': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=unifrakturcook',
    'Graffiti Art': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=rubik-scribble',
    'Vintage Stamp': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=special-elite',
    'Minimalist Clean': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=inter',
    'Psychedelic Groovy': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=concert-one',
    'Art Deco Geometric': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=cinzel',
    'Grunge Stencil': 'https://placehold.co/120x80/ffffff/000000/png?text=Aa&font=black-ops-one',
};


export const TypographySelector: React.FC<TypographySelectorProps> = ({ styles, selectedStyle, onStyleChange, disabled }) => {
    return (
        <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Choose a Typography Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {styles.map((style) => (
                    <button
                        key={style}
                        onClick={() => onStyleChange(style)}
                        disabled={disabled}
                        className={`text-center rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
                            ${selectedStyle === style
                                ? 'border-purple-500 ring-purple-500'
                                : 'border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-gray-500'
                            }`}
                        aria-pressed={selectedStyle === style}
                    >
                         <img src={typographyPreviews[style]} alt={`${style} typography preview`} className="w-full h-16 object-cover bg-gray-200" loading="lazy" />
                         <span className="block text-xs sm:text-sm font-medium p-2">{style}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
