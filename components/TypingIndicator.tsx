
import React from 'react';
import { BotIcon } from './icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mt-1">
        <BotIcon className="w-6 h-6 text-teal-300" />
      </div>
      <div className="max-w-xl rounded-2xl px-5 py-4 shadow-md bg-gray-700">
        <div className="flex items-center justify-center space-x-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
