
import { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Award, 
  Heart, 
  Clock, 
  Shield, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <Target size={24} className="text-ziada-500" />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what AI can achieve to create transformative experiences.'
    },
    {
      icon: <Award size={24} className="text-ziada-500" />,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality AI solutions that exceed expectations.'
    },
    {
      icon: <Heart size={24} className="text-ziada-500" />,
      title: 'Empathy',
      description: 'We design with human needs at the center, creating technology that understands and adapts.'
    },
    {
      icon: <Clock size={24} className="text-ziada-500" />,
      title: 'Efficiency',
      description: 'We value your time and strive to make interactions with our AI fast, productive, and meaningful.'
    },
    {
      icon: <Shield size={24} className="text-ziada-500" />,
      title: 'Trust',
      description: 'We build secure, reliable, and transparent systems that earn and maintain your confidence.'
    },
    {
      icon: <Sparkles size={24} className="text-ziada-500" />,
      title: 'Creativity',
      description: 'We believe in the power of creative thinking to solve problems and inspire new possibilities.'
    }
  ];
  
  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-8 lg:px-12 mb-20">
        <div 
          className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
            <Sparkles size={14} className="text-ziada-500 mr-2" />
            <span className="text-xs font-medium text-ziada-700">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing AI Conversations
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            ZiadaAI was founded with a simple yet ambitious mission: to create AI that communicates with humans in a more natural, helpful, and meaningful way.
          </p>
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-96 bg-gradient-to-br from-ziada-500/10 to-ziada-700/10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center">
                  <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-tr from-ziada-600 to-ziada-400 flex items-center justify-center shadow-xl">
                    <span className="text-white text-2xl md:text-3xl font-bold">Z</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="px-6 md:px-8 lg:px-12 py-20 bg-gray-50">
        <div 
          className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center transform transition-all duration-1000 delay-200 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div>
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
              <span className="text-xs font-medium text-ziada-700">Our Mission</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Creating AI That Understands Human Needs
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to develop artificial intelligence that truly understands human communication, making technology more accessible, helpful, and empowering for everyone, everywhere.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that AI should enhance human capabilities, not replace them. By focusing on natural language understanding and contextual awareness, we're building technology that works alongside humans as a collaborative partner.
            </p>
          </div>
          
          <div>
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
              <span className="text-xs font-medium text-ziada-700">Our Vision</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              A Future Where AI Empowers Everyone
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We envision a world where advanced AI is accessible to all, helping people learn, create, solve problems, and connect in ways that amplify human potential and foster innovation across all aspects of life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By breaking down technology barriers, we aim to create a more inclusive digital landscape where AI serves as a universal tool for progress, creativity, and human advancement.
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transform transition-all duration-1000 delay-300 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
              <Sparkles size={14} className="text-ziada-500 mr-2" />
              <span className="text-xs font-medium text-ziada-700">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Principles That Guide Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values shape every aspect of our technology and organization, ensuring we create AI that's not just intelligent, but also ethical, responsible, and human-centered.
            </p>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 delay-400 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 md:p-8">
                <div className="h-12 w-12 rounded-full bg-ziada-50 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        className={`px-6 md:px-8 lg:px-12 py-20 bg-gradient-to-r from-ziada-600 to-ziada-500 text-white transform transition-all duration-1000 delay-500 
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
            Experience the future of AI conversation and be part of a community that's shaping how humans and machines interact.
          </p>
          <Link 
            to="/chat" 
            className="bg-white text-ziada-600 hover:bg-gray-100 px-8 py-3.5 rounded-full shadow-button button-animation inline-flex items-center justify-center font-medium"
          >
            Start Chatting Now
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
