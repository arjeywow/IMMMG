
import React from 'react';
import { Icon } from './Icon';

interface ImageDisplayProps {
  imageUrl: string;
  songTitle: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, songTitle }) => {
    const fullImageUrl = `data:image/jpeg;base64,${imageUrl}`;
    const downloadFileName = `${songTitle.toLowerCase().replace(/\s+/g, '-')}-album-cover.jpg`;

    return (
        <div className="relative group w-full h-full aspect-square">
            <img 
                src={fullImageUrl} 
                alt={`Generated album cover for the song titled "${songTitle}"`}
                className="w-full h-full object-contain rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <a
                    href={fullImageUrl}
                    download={downloadFileName}
                    className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-200"
                >
                    <Icon name="download" className="w-5 h-5" />
                    <span>Download Cover</span>
                </a>
            </div>
        </div>
    );
};
