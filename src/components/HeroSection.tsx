
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-8 lg:px-12 hero-gradient">
      {/* Background Blobs */}
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-ziada-200 opacity-20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-ziada-300 opacity-20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div 
            className={`text-center lg:text-left transform transition-all duration-1000 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
              <Sparkles size={14} className="text-ziada-500 mr-2" />
              <span className="text-xs font-medium text-ziada-700">Next generation AI assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Experience AI <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent primary-gradient text-glow">
                Like Never Before
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              ZiadaAI delivers human-like conversations with unparalleled understanding and intelligence. Get instant answers, creative ideas, and thoughtful insights.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                to="/chat" 
                className="w-full sm:w-auto bg-gradient-to-r from-ziada-600 to-ziada-500 text-white rounded-full px-8 py-3.5 font-medium shadow-button button-animation inline-flex items-center justify-center"
              >
                <MessageSquare size={18} className="mr-2" />
                Start Chatting
              </Link>
              
              <Link 
                to="/features" 
                className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 rounded-full px-8 py-3.5 font-medium shadow-sm button-animation inline-flex items-center justify-center mt-3 sm:mt-0"
              >
                Explore Features
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <div className={`h-full w-full bg-gradient-to-br from-gray-400 to-gray-500`}></div>
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-600">
                <span className="font-medium">5,000+</span> users love ZiadaAI
              </p>
            </div>
          </div>
          
          {/* Image/Illustration */}
          <div 
            className={`relative transform transition-all duration-1000 delay-300 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-ziada-500/10 to-ziada-700/10 rounded-3xl blur-xl"></div>
              <div className="glass-card p-2 md:p-4 relative z-10">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-100">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-ziada-600 to-ziada-400 flex items-center justify-center shadow-sm">
                        <span className="text-white text-xs font-semibold">Z</span>
                      </div>
                      <span className="text-xs font-medium text-gray-500">ZiadaAI Chat</span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 space-y-4">
                    <div className="flex items-start">
                      <div className="bg-ziada-50 rounded-full p-2 mr-3">
                        <Zap size={16} className="text-ziada-500" />
                      </div>
                      <div className="bg-gray-100 rounded-lg rounded-tl-none py-2 px-4 max-w-xs sm:max-w-md">
                        <p className="text-sm text-gray-700">How can ZiadaAI help me with my daily tasks?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-end">
                      <div className="bg-ziada-50 rounded-lg rounded-tr-none py-2.5 px-4 max-w-xs sm:max-w-md">
                        <p className="text-sm text-gray-700">
                          ZiadaAI can assist you by organizing your schedule, drafting emails, generating creative content, answering questions, and providing real-time information to make your day more productive and efficient.
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 items-center justify-center ml-3 h-8 w-8 rounded-full bg-gradient-to-br from-ziada-500 to-ziada-600 text-white">
                        <span className="text-xs font-semibold">Z</span>
                      </div>
                    </div>
                    
                    <div className="animate-pulse-slow">
                      <div className="flex items-start">
                        <div className="bg-ziada-50 rounded-full p-2 mr-3">
                          <Zap size={16} className="text-ziada-500" />
                        </div>
                        <div className="bg-gray-100 rounded-lg rounded-tl-none py-2 px-4 max-w-xs">
                          <p className="text-sm text-gray-700">That sounds impressive! Can you give me an example?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature Badges */}
            <div className="absolute -right-2 -top-2 md:right-8 md:top-10 glass-card px-3 py-2 shadow-sm animate-float">
              <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-yellow-500" />
                <span className="text-xs font-medium text-gray-700">AI-Powered</span>
              </div>
            </div>
            
            <div className="absolute -left-2 bottom-10 md:left-0 md:bottom-20 glass-card px-3 py-2 shadow-sm animate-float animation-delay-1000">
              <div className="flex items-center space-x-2">
                <Zap size={14} className="text-ziada-500" />
                <span className="text-xs font-medium text-gray-700">Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
