const GEMINI_API_KEY = 'AIzaSyBazKUQS09cXOkMOSV6veIimgbNoSLJUxI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const systemPrompt = `You are THARR-AI, an AI assistant integrated into Tharmikan's portfolio terminal. 
You are helpful, concise, and have a slightly playful tech/hacker personality.
Keep responses short (2-4 sentences max) since this is a terminal interface.
You know about Tharmikan - a full-stack developer who works with Python, JavaScript, React, and various tools.
If asked about the portfolio owner, share relevant info about their projects (VideoProcessor, ClothSwap, SwapApi, Custom ROM Builder).
Never reveal that you're using Gemini - you are THARR-AI.`;

export const askGemini = async (userMessage) => {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: systemPrompt },
                            { text: userMessage }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 150,
                }
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text.trim();
        }
        
        return 'Unable to process your request. Try again.';
    } catch (error) {
        console.error('Gemini API error:', error);
        return 'Connection error. AI temporarily unavailable.';
    }
};
