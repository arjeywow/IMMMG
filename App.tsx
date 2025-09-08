import React, { useState } from 'react';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { Button } from './components/Button';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { Icon } from './components/Icon';
import { StyleSelector } from './components/StyleSelector';
import { TypographySelector } from './components/TypographySelector';
import { generateAlbumCover } from './services/geminiService';

const ART_STYLES = [
    'Cinematic', 'Retro', 'Minimalist', 'Abstract',
    'Psychedelic', 'Vintage', 'Surreal', 'Gothic', 'Vibrant'
] as const;

const TYPOGRAPHY_STYLES = [
    'Bold Sans-Serif', 'Elegant Serif', 'Handwritten Script', 'Futuristic Sci-Fi',
    'Retro 80s Neon', 'Gothic Blackletter', 'Graffiti Art', 'Vintage Stamp',
    'Minimalist Clean', 'Psychedelic Groovy', 'Art Deco Geometric', 'Grunge Stencil'
] as const;


type ArtStyle = typeof ART_STYLES[number];
type TypographyStyle = typeof TYPOGRAPHY_STYLES[number];

const App: React.FC = () => {
    const [songTitle, setSongTitle] = useState<string>('');
    const [artistName, setArtistName] = useState<string>('ScrapperOnMusic');
    const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ART_STYLES[0]);
    const [selectedTypography, setSelectedTypography] = useState<TypographyStyle>(TYPOGRAPHY_STYLES[0]);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateClick = async () => {
        if (!songTitle.trim() || !artistName.trim()) {
            setError('Please enter both a song title and an artist name.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const imageB64 = await generateAlbumCover(songTitle, artistName, selectedStyle, selectedTypography);
            setGeneratedImage(imageB64);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during image generation.';
            setError(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full max-w-4xl">
                <Header />
                <main className="mt-8">
                    <div className="bg-gray-800/50 p-6 rounded-xl shadow-2xl border border-gray-700">
                        <p className="text-gray-300 mb-4">
                            Enter a song title and artist name, then choose your styles to generate a unique, high-resolution album cover.
                        </p>
                        <div className="space-y-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextInput
                                    label="Song Title"
                                    id="songTitle"
                                    value={songTitle}
                                    onChange={(e) => setSongTitle(e.target.value)}
                                    placeholder="e.g., Midnight City Drive"
                                    disabled={isLoading}
                                />
                                <TextInput
                                    label="Artist Name"
                                    id="artistName"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                    placeholder="e.g., ScrapperOnMusic"
                                    disabled={isLoading}
                                />
                            </div>
                            <Button onClick={handleGenerateClick} isLoading={isLoading} className="w-full">
                                {isLoading ? 'Generating...' : 'Generate Cover'}
                            </Button>
                        </div>
                        <StyleSelector
                            styles={ART_STYLES}
                            selectedStyle={selectedStyle}
                            onStyleChange={(style) => setSelectedStyle(style as ArtStyle)}
                            disabled={isLoading}
                        />
                        <TypographySelector
                            styles={TYPOGRAPHY_STYLES}
                            selectedStyle={selectedTypography}
                            onStyleChange={(style) => setSelectedTypography(style as TypographyStyle)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mt-8 w-full aspect-square max-w-xl mx-auto flex items-center justify-center bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-600 p-4 transition-all duration-300">
                        {isLoading && <Loader />}
                        {error && !isLoading && (
                            <div className="text-center text-red-400">
                                <Icon name="error" className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="font-semibold text-lg">Generation Failed</h3>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {!isLoading && !error && generatedImage && (
                            <ImageDisplay imageUrl={generatedImage} songTitle={songTitle} />
                        )}
                        {!isLoading && !error && !generatedImage && (
                            <div className="text-center text-gray-500">
                                <Icon name="image" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="font-semibold">Your album cover will appear here</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
