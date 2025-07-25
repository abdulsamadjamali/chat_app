import React from 'react';
import { type Message, Role } from '../types';
import { UserIcon, AlertTriangleIcon, BotIcon } from './icons';

interface MessageProps {
  message: Message;
}

const MessageBubble: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const isModel = message.role === Role.MODEL;
  const isError = message.role === Role.ERROR;

  const getBubbleClasses = () => {
    switch (message.role) {
      case Role.USER:
        return 'bg-blue-600 text-white';
      case Role.MODEL:
        return 'bg-gray-700 text-gray-200';
      case Role.ERROR:
        return 'bg-red-500/30 text-red-200 border border-red-500/50';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  const IconComponent = () => {
    switch(message.role) {
        case Role.USER: 
          return (
            <img
              src="image/abdul samad.jpg"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          );
        case Role.MODEL: 
          return (
            <BotIcon className="w-8 h-8 text-teal-400" />
          );
        case Role.ERROR: 
          return <AlertTriangleIcon className="w-6 h-6 text-red-400" />;
        default: 
          return null;
    }
  }

  const wrapperClasses = `flex items-start gap-4 animate-fade-in ${isUser ? 'justify-end' : ''}`;
  const bubbleClasses = `max-w-xl rounded-2xl px-5 py-3 shadow-md ${getBubbleClasses()}`;
  const textClasses = "prose prose-invert prose-sm max-w-none break-words";

  return (
    <div className={wrapperClasses}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mt-1">
          <IconComponent />
        </div>
      )}
      <div className={bubbleClasses}>
        <p className={textClasses}>{message.text}</p>
        <span className="block text-xs text-gray-400 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mt-1">
          <IconComponent />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
