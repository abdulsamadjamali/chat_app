
import React from 'react';
import { type Message } from '../types';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      <Header />
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
