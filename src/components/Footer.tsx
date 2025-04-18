
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-ziada-600 to-ziada-400 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-semibold">Z</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent primary-gradient">
                ZiadaAI
              </span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Elevating conversations with AI that understands, adapts, and delivers meaningful interactions.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-ziada-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-ziada-500 transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-ziada-500 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Features</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Pricing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">API</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Integrations</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Contact</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Careers</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Blog</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Cookie Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-ziada-500 transition-colors duration-200 text-sm">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} ZiadaAI. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by ZiadaAI Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
