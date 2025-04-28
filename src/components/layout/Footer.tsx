import { Heart, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  
  const footerLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contribute', href: 'https://github.com/Jessie-QingYu/CS_Path_Finder' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <footer className={`py-8 px-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">CS PathFinder</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              An open-source learning platform for computer science and software development.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Jessie-QingYu/CS_Path_Finder" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/roadmaps" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Learning Roadmaps</Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Learning Resources</Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Project Ideas</Link>
              </li>
              <li>
                <Link to="/custom-path" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Custom Learning Path</Link>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  {link.path ? (
                    <Link to={link.path} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} CS PathFinder. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> by the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;