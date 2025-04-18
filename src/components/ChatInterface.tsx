import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Info, RotateCcw, Plus } from 'lucide-react';
import ChatMessage from './ChatMessage';
import RelatedQuestions from './RelatedQuestions';

const DEFAULT_MESSAGES = [
  {
    id: '1',
    text: 'Hello! I\'m ZiadaAI, your financial assistant. I can help you with investment advice, market trends, financial planning, and more. What financial information can I help you with today?',
    isUser: false,
    timestamp: '12:00 PM'
  }
];

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  relatedQuestions?: string[];
  sources?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAIResponse = async (userInput: string): Promise<{ text: string; relatedQuestions: string[]; sources?: string[] }> => {
    try {
      // Prepare the conversation history
      const historyText = messages
        .map(msg => `${msg.isUser ? 'User:' : 'Assistant:'} ${msg.text}`)
        .join('\n');

      const response = await fetch('http://localhost:5003/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          history: historyText
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return {
        text: data.raw_response || data.assistant,
        relatedQuestions: data.related_questions || [],
        sources: data.sources || []
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        text: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
        relatedQuestions: [],
        sources: []
      };
    }
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user message
    const userMessage = {
      id: String(Date.now()),
      text: trimmedInput,
      isUser: true,
      timestamp: formatTimestamp()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Get AI response
      const aiResponseData = await getAIResponse(trimmedInput);
      
      const aiResponse = {
        id: String(Date.now() + 1),
        text: aiResponseData.text,
        isUser: false,
        timestamp: formatTimestamp(),
        relatedQuestions: aiResponseData.relatedQuestions,
        sources: aiResponseData.sources
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message to chat
      const errorMessage = {
        id: String(Date.now() + 1),
        text: "I apologize, but I encountered an error. Please try again.",
        isUser: false,
        timestamp: formatTimestamp()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Add a function to handle clicking on a related question
  const handleRelatedQuestionClick = (question: string) => {
    setInputValue(question);
    
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
        }
      }, 0);
    }
  };

  const handleNewChat = () => {
    setMessages(DEFAULT_MESSAGES);
  };

  const toggleMicActive = () => {
    setIsMicActive(!isMicActive);
    // In a real implementation, this would start/stop speech recognition
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] rounded-lg shadow-lg bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-ziada-600 to-ziada-400 flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">Z</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">ZiadaAI Financial Assistant</h2>
              <p className="text-xs text-gray-500">Get real-time financial insights and advice</p>
            </div>
          </div>
          <button 
            onClick={handleNewChat}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-ziada-500 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-4">
          {messages.map((message, index) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              
              {/* Show related questions only after AI responses that have them */}
              {!message.isUser && message.relatedQuestions && message.relatedQuestions.length > 0 && (
                <div className="max-w-3xl mx-auto px-4 pb-4">
                  <div className="ml-12">
                    <RelatedQuestions 
                      questions={message.relatedQuestions} 
                      onQuestionClick={handleRelatedQuestionClick} 
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="py-6">
              <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-ziada-500 to-ziada-600 text-white flex items-center justify-center">
                    <Bot size={15} />
                  </div>
                  <div className="flex space-x-1.5 items-center h-8">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div>
          <div className="flex items-end gap-2">
            <div className="relative flex-1 glass-card p-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about financial topics..."
                className="w-full resize-none max-h-32 focus:outline-none focus:ring-0 bg-transparent px-3 py-2 text-gray-700 placeholder-gray-400"
                rows={1}
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <button 
                  className={`p-1.5 rounded-full ${
                    isMicActive 
                      ? 'bg-red-100 text-red-500' 
                      : 'text-gray-400 hover:text-gray-600'
                  } transition-colors duration-200`}
                  onClick={toggleMicActive}
                  aria-label="Toggle microphone"
                >
                  <Mic size={16} />
                </button>
              </div>
            </div>
            <button
              disabled={!inputValue.trim()}
              onClick={handleSendMessage}
              className={`p-3 rounded-full ${
                inputValue.trim() 
                  ? 'bg-gradient-to-r from-ziada-600 to-ziada-500 text-white shadow-button button-animation' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-xs text-center text-gray-500 flex items-center justify-center">
            <Info size={12} className="mr-1" />
            For informational purposes only. Consult a financial advisor for personalized advice.
          </div>
        </div>
      </div>
    </div>
  );
};

// For TypeScript
const Bot = ({ size, className }: { size: number, className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
};

export default ChatInterface;
