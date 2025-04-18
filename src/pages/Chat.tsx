
import ChatInterface from '../components/ChatInterface';
import FinancialNews from '../components/FinancialNews';
import { useState } from 'react';

const Chat = () => {
  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ChatInterface />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <FinancialNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
