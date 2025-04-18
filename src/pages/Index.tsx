
import { Link } from 'react-router-dom';
import { MessageSquare, Sparkles, Zap, Globe, ShieldCheck, Layers, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Natural Conversations',
      description: 'Experience human-like conversations with deep contextual understanding and nuanced responses.',
    },
    {
      icon: Sparkles,
      title: 'Creative Assistant',
      description: 'Get help with writing, brainstorming ideas, and creative tasks with imaginative outputs.',
    },
    {
      icon: Zap,
      title: 'Instant Answers',
      description: 'Receive immediate responses to your questions with accurate and relevant information.',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Communicate in multiple languages with seamless translation and cultural context.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy Focused',
      description: 'Your conversations are private and secure with enterprise-grade encryption.',
    },
    {
      icon: Layers,
      title: 'Customizable Experience',
      description: 'Tailor the AI to your specific needs and preferences for a personalized experience.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
              <Sparkles size={14} className="text-ziada-500 mr-2" />
              <span className="text-xs font-medium text-ziada-700">Intelligent Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Experience the Power of<br />Advanced AI Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ZiadaAI combines cutting-edge technology with an intuitive interface to deliver a seamless, intelligent experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
              <Zap size={14} className="text-ziada-500 mr-2" />
              <span className="text-xs font-medium text-ziada-700">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How ZiadaAI Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with ZiadaAI is easy. Follow these simple steps to begin your AI-powered journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Start a Conversation',
                description: 'Begin by typing a message or question in the chat interface.',
              },
              {
                step: '02',
                title: 'Get Intelligent Responses',
                description: 'ZiadaAI processes your input and provides thoughtful, context-aware responses.',
              },
              {
                step: '03',
                title: 'Continue the Dialogue',
                description: 'Have a natural back-and-forth conversation to explore topics in depth.',
              },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 md:p-8 relative">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-ziada-500 to-ziada-600 text-white font-bold">
                  {item.step}
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8 lg:px-12 bg-gradient-to-r from-ziada-600 to-ziada-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Future of AI?
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
            Join thousands of users who are already enhancing their productivity and creativity with ZiadaAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/chat" 
              className="bg-white text-ziada-600 hover:bg-gray-100 px-8 py-3.5 rounded-full shadow-button button-animation inline-flex items-center justify-center font-medium"
            >
              <MessageSquare size={18} className="mr-2" />
              Start Chatting Now
            </Link>
            <Link 
              to="/features" 
              className="bg-transparent border border-white/30 hover:bg-white/10 px-8 py-3.5 rounded-full button-animation inline-flex items-center justify-center font-medium"
            >
              Learn More
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
