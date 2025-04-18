
import { useEffect, useState } from 'react';
import { 
  BrainCircuit, 
  Globe, 
  Lock, 
  Zap, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  PenTool,
  LucideIcon
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
}

const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: 'Advanced AI Understanding',
    description: 'Our AI comprehends context, nuance, and even complex queries to provide meaningful responses.',
    category: 'intelligence'
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Communicate in over 100 languages with accurate translations and cultural context.',
    category: 'communication'
  },
  {
    icon: Lock,
    title: 'Private Conversations',
    description: 'Your data stays private with end-to-end encryption and strict privacy controls.',
    category: 'security'
  },
  {
    icon: MessageSquare,
    title: 'Human-like Conversations',
    description: 'Experience natural dialogue with an AI that maintains context throughout the conversation.',
    category: 'communication'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Get instant responses anytime, day or night, without waiting.',
    category: 'reliability'
  },
  {
    icon: Sparkles,
    title: 'Creative Assistant',
    description: 'Get help with writing, brainstorming ideas, and creating content with a creative touch.',
    category: 'creativity'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Enterprise-grade security protocols protect sensitive information at all times.',
    category: 'security'
  },
  {
    icon: RefreshCw,
    title: 'Continuous Learning',
    description: 'Our AI evolves and improves through continuous learning and updates.',
    category: 'intelligence'
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Responses',
    description: 'Receive immediate answers with high accuracy and relevance.',
    category: 'reliability'
  },
  {
    icon: PenTool,
    title: 'Content Generation',
    description: 'Generate articles, stories, emails, and more with a natural, human-like quality.',
    category: 'creativity'
  }
];

const categories = [
  { id: 'all', name: 'All Features' },
  { id: 'intelligence', name: 'Intelligence' },
  { id: 'communication', name: 'Communication' },
  { id: 'security', name: 'Security' },
  { id: 'reliability', name: 'Reliability' },
  { id: 'creativity', name: 'Creativity' }
];

const Features = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>(features);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter features based on selected category
    if (selectedCategory === 'all') {
      setFilteredFeatures(features);
    } else {
      setFilteredFeatures(features.filter(feature => feature.category === selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 delay-100 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
            <Sparkles size={14} className="text-ziada-500 mr-2" />
            <span className="text-xs font-medium text-ziada-700">Capabilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover What ZiadaAI Can Do
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the powerful features that make ZiadaAI a versatile assistant for your personal and professional needs.
          </p>
        </div>
        
        {/* Category Filter */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-200 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 
                ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-ziada-600 to-ziada-500 text-white shadow-button'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-ziada-200 hover:bg-ziada-50'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Features Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 delay-300 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {filteredFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
