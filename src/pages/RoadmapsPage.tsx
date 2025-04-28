import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle } from 'lucide-react';
import { PathContext } from '../contexts/PathContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const RoadmapsPage = () => {
  const { paths } = useContext(PathContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPaths = paths.filter(path => 
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Learning Roadmaps</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Structured learning paths to guide your journey in computer science and software development
          </p>
        </motion.div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search roadmaps..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Roadmaps List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPaths.map((path, index) => (
          <motion.div 
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{path.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{path.description}</p>
                
                {/* Progress bar if there's progress */}
                {path.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2">Resources ({path.resources.length})</h3>
                  <ul className="space-y-2">
                    {path.resources.slice(0, 3).map(resource => (
                      <li key={resource.id} className="flex gap-2">
                        {resource.completed ? (
                          <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <div className="w-[18px] h-[18px] border border-gray-300 dark:border-gray-600 rounded-full mt-0.5 flex-shrink-0"></div>
                        )}
                        <span className="text-sm">{resource.title}</span>
                      </li>
                    ))}
                    {path.resources.length > 3 && (
                      <li className="text-sm text-blue-600 dark:text-blue-400">
                        +{path.resources.length - 3} more resources
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">
                    {path.resources.filter(r => r.difficulty === 'beginner').length} Beginner
                  </Badge>
                  <Badge variant="secondary">
                    {path.resources.filter(r => r.difficulty === 'intermediate').length} Intermediate
                  </Badge>
                  {path.resources.some(r => r.difficulty === 'advanced') && (
                    <Badge variant="warning">
                      {path.resources.filter(r => r.difficulty === 'advanced').length} Advanced
                    </Badge>
                  )}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                <a 
                  href={`/roadmap/${path.id}`} 
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
                >
                  View Roadmap
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapsPage;