
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  iconClassName = ''
}: FeatureCardProps) => {
  return (
    <div className={`glass-card p-6 md:p-8 transition-all duration-300 hover:translate-y-[-5px] ${className}`}>
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-5 ${iconClassName ? iconClassName : 'bg-gradient-to-br from-ziada-500 to-ziada-600 text-white'}`}>
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
