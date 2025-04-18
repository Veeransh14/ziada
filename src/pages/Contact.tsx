
import { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-ziada-50 border border-ziada-100">
            <Sparkles size={14} className="text-ziada-500 mr-2" />
            <span className="text-xs font-medium text-ziada-700">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about ZiadaAI? Want to learn more about our technology or partnership opportunities? We're here to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div 
            className={`lg:col-span-1 transform transition-all duration-1000 delay-200 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="glass-card p-6 md:p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center mr-4">
                    <Mail size={18} className="text-ziada-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Email</h3>
                    <a href="mailto:hello@ziadaai.com" className="text-gray-900 hover:text-ziada-500 transition-colors duration-200">
                      hello@ziadaai.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center mr-4">
                    <MapPin size={18} className="text-ziada-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Office</h3>
                    <p className="text-gray-900">
                      123 AI Innovation Street<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center mr-4">
                    <Phone size={18} className="text-ziada-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Phone</h3>
                    <a href="tel:+14155550123" className="text-gray-900 hover:text-ziada-500 transition-colors duration-200">
                      +1 (415) 555-0123
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center hover:bg-ziada-100 transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} className="text-ziada-500" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center hover:bg-ziada-100 transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} className="text-ziada-500" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center hover:bg-ziada-100 transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className="text-ziada-500" />
                  </a>
                  <a 
                    href="#" 
                    className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center hover:bg-ziada-100 transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <Github size={18} className="text-ziada-500" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Chat with us */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-ziada-50 flex items-center justify-center mr-4">
                  <MessageSquare size={18} className="text-ziada-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Chat with ZiadaAI</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Have a quick question? Start a conversation with our AI assistant for immediate help.
              </p>
              
              <a 
                href="/chat" 
                className="w-full bg-gradient-to-r from-ziada-600 to-ziada-500 text-white rounded-full py-3 px-6 font-medium shadow-button button-animation inline-flex items-center justify-center"
              >
                <MessageSquare size={18} className="mr-2" />
                Start Chatting
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div 
            className={`lg:col-span-2 transform transition-all duration-1000 delay-300 
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
