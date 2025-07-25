import React, { useState, useCallback } from 'react';
import { type Message, Role } from './types';
import { chatSession } from './services/geminiService';
import ChatWindow from './components/ChatWindow';

const Sidebar: React.FC<{ userInputs: string[]; onDelete: (idx: number) => void }> = ({ userInputs, onDelete }) => (
  <aside className="bg-gray-800 h-full w-60 p-4 flex flex-col space-y-4">
    <div className="text-lg font-bold text-white mb-4"><h1>Abdul Samad's chat APP</h1></div>
    <ul className="flex flex-col gap-2">
      {userInputs.map((input, idx) => (
        <li key={idx} className="bg-gray-700 p-2 rounded text-white break-words flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="image/abdul samad.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span>{input}</span>
          </div>
          <button
            className="ml-2 text-red-400 hover:text-red-600 font-bold"
            onClick={() => onDelete(idx)}
            title="Delete"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: Role.MODEL,
      text: "Hello! I'm your friendly Gemini assistant. How can I help you today?",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInputs, setUserInputs] = useState<string[]>([]);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    setIsLoading(true);

    // Store user input in sidebar list
    setUserInputs(prev => [...prev, messageText]);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: Role.USER,
      text: messageText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);

    const modelMessageId = `model-${Date.now()}`;
    setMessages(prev => [...prev, { id: modelMessageId, role: Role.MODEL, text: '', timestamp: Date.now() }]);

    try {
      const stream = await chatSession.sendMessageStream({ message: messageText });

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev =>
          prev.map(m =>
            m.id === modelMessageId ? { ...m, text: fullResponse } : m
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: Role.ERROR,
        text: 'Sorry, something went wrong. Please check your API key and try again.',
        timestamp: Date.now(),
      };
      setMessages(prev => prev.filter(m => m.id !== modelMessageId));
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handler to delete a user input from the sidebar
  const handleDeleteInput = (idx: number) => {
    setUserInputs(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar userInputs={userInputs} onDelete={handleDeleteInput} />
      <div className="flex-1 flex flex-col">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default App;
