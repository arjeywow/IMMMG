import React from 'react';

interface StyleSelectorProps {
    styles: readonly string[];
    selectedStyle: string;
    onStyleChange: (style: string) => void;
    disabled?: boolean;
}

const stylePreviews: { [key: string]: string } = {
    'Cinematic': 'https://placehold.co/120x80/1a202c/ffffff/png?text=Cinematic&font=lato',
    'Retro': 'https://placehold.co/120x80/d97706/000000/png?text=Retro&font=press-start-2p',
    'Minimalist': 'https://placehold.co/120x80/e5e7eb/1f2937/png?text=Minimalist&font=lato',
    'Abstract': 'https://placehold.co/120x80/7c3aed/ffffff/png?text=Abstract&font=lato',
    'Psychedelic': 'https://placehold.co/120x80/ec4899/ffffff/png?text=Psychedelic&font=pacifico',
    'Vintage': 'https://placehold.co/120x80/854d0e/f5f5f4/png?text=Vintage&font=playfair-display',
    'Surreal': 'https://placehold.co/120x80/0891b2/ffffff/png?text=Surreal&font=lato',
    'Gothic': 'https://placehold.co/120x80/171717/f5f5f5/png?text=Gothic&font=unifrakturcook',
    'Vibrant': 'https://placehold.co/120x80/16a34a/ffffff/png?text=Vibrant&font=lato',
};

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange, disabled }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Choose an Artistic Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {styles.map((style) => (
                    <button
                        key={style}
                        onClick={() => onStyleChange(style)}
                        disabled={disabled}
                        className={`text-center rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
                            ${selectedStyle === style
                                ? 'border-blue-500 ring-blue-500'
                                : 'border-gray-600 bg-gray-700 hover:bg-gray-600 hover:border-gray-500'
                            }`}
                        aria-pressed={selectedStyle === style}
                    >
                        <img src={stylePreviews[style]} alt={`${style} style preview`} className="w-full h-16 object-cover bg-gray-800" loading="lazy" />
                        <span className="block text-xs sm:text-sm font-medium p-2">{style}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
