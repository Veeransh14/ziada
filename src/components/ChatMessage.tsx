import { useState, useEffect } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string;
    relatedQuestions?: string[];
    sources?: string[];
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay to trigger animation after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      className={`py-6 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${message.isUser ? '' : 'bg-gray-50'}`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
            message.isUser 
              ? 'bg-ziada-100 text-ziada-700' 
              : 'bg-gradient-to-br from-ziada-500 to-ziada-600 text-white'
          }`}>
            {message.isUser ? <User size={15} /> : <Bot size={15} />}
          </div>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-900">
                {message.isUser ? 'You' : 'ZiadaAI'}
              </span>
              <span className="text-xs text-gray-500">{message.timestamp}</span>
            </div>
            <div className="text-gray-700 prose prose-sm max-w-none markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
            {/* Display sources if available */}
            {!message.isUser && message.sources && message.sources.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Sources:</p>
                <ul className="mt-1 space-y-1">
                  {message.sources.map((source, index) => (
                    <li key={index} className="text-xs text-ziada-600">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Copy button - only for AI responses */}
          {!message.isUser && (
            <button 
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              onClick={copyToClipboard}
              aria-label="Copy to clipboard"
            >
              {isCopied 
                ? <Check size={16} className="text-green-500" /> 
                : <Copy size={16} />
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
