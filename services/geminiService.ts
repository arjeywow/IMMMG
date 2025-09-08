import { GoogleGenAI } from '@google/genai';

// IMPORTANT: Assumes API_KEY is set in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey });

export const generateAlbumCover = async (songTitle: string, artistName: string, style: string, typography: string): Promise<string> => {
    // A detailed prompt to guide the AI model, incorporating both artistic and typographic styles
    const prompt = `Create a professional, visually striking, high-resolution 3000x3000 pixel album cover for a song titled "${songTitle}".
The overall aesthetic should be a creative and compelling ${style} style, thematically aligned with the song title.
The song title, "${songTitle}", and the artist's name, "${artistName}", must be prominently and stylistically integrated into the design using a "${typography}" typography.
The final image should be suitable for a 300 dpi print, with sharp details and rich colors.
The composition should be memorable and of professional quality.
Do not include any placeholder text or quotation marks around the final text on the cover.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
            const imageB64 = response.generatedImages[0].image.imageBytes;
            return imageB64;
        } else {
            throw new Error('Image generation failed: The API did not return any images.');
        }

    } catch (error) {
        console.error('Error generating album cover with Gemini API:', error);
        // Provide a more user-friendly error message
        throw new Error('Failed to generate album cover due to an API error. Please try again later.');
    }
};
