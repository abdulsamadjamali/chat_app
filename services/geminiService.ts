
import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  // In a real app, you might render an error message to the user.
  // For this example, we'll throw an error to make it clear during development.
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const chatModel = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are a helpful and friendly chat assistant. Keep your responses concise and well-formatted. You can use markdown for formatting.',
  },
});

export const chatSession: Chat = chatModel;
