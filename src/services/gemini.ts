import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateWeddingTheme(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a luxury wedding designer for Frozen Apple Weddings. 
      The user wants a futuristic, high-end wedding theme based on this description: "${prompt}".
      
      Generate a detailed wedding theme concept including:
      1. Theme Name
      2. Color Palette (Hex codes)
      3. Decor Concept (Futuristic/Luxury)
      4. Tech Integration (VR/AI/Drones)
      5. Atmosphere Description
      
      Return the response in a structured JSON format.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating theme:", error);
    return null;
  }
}
