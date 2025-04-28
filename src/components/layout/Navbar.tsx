import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, GraduationCap } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, login, logout } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Roadmaps', path: '/roadmaps' },
    { name: 'Resources', path: '/resources' },
    { name: 'Projects', path: '/projects' },
    { name: 'Custom Path', path: '/custom-path' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`sticky top-0 z-50 py-4 px-4 md:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap size={28} className="text-blue-600" />
          <span className="text-xl font-bold">CS PathFinder</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-5">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="ml-5 flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
              <Button onClick={logout} variant="outlined" size="sm">
                Logout
              </Button>
            ) : (
              <Button onClick={login} variant="primary" size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 right-0 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg md:hidden`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium py-2 hover:text-blue-600 transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <Button onClick={logout} variant="outlined" size="sm" fullWidth>
                  Logout
                </Button>
              ) : (
                <Button onClick={login} variant="primary" size="sm" fullWidth>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;