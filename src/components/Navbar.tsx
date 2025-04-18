
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 lg:px-12 ${
        isScrolled ? 'py-4 glass-morphism' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-ziada-600 to-ziada-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-semibold">Z</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent primary-gradient">
            ZiadaAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? 'text-ziada-600 font-medium'
                  : 'text-gray-600 hover:text-ziada-500'
              } transition-colors duration-300 link-underline`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Try Button */}
        <div className="hidden md:block">
          <Link 
            to="/chat" 
            className="bg-gradient-to-r from-ziada-600 to-ziada-500 text-white rounded-full px-6 py-2.5 font-medium shadow-button button-animation"
          >
            Try ZiadaAI
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-ziada-500 transition-colors duration-200"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-morphism shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'text-ziada-600 font-medium'
                    : 'text-gray-600'
                } py-2 px-4 rounded-lg hover:bg-gray-100/50 transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/chat" 
              className="bg-gradient-to-r from-ziada-600 to-ziada-500 text-white rounded-full py-3 px-6 font-medium text-center shadow-button mt-2"
            >
              Try ZiadaAI
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
