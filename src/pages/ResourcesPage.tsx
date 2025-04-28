import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Video, BookCopy, Globe, PenTool as Tool } from 'lucide-react';
import { PathContext } from '../contexts/PathContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const ResourcesPage = () => {
  const { paths } = useContext(PathContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  
  // Extract all resources from all paths
  const allResources = paths.flatMap(path => path.resources);
  
  // Filter resources based on search and filters
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type);
    
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(resource.difficulty);
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  // Get unique resource types
  const resourceTypes = Array.from(new Set(allResources.map(r => r.type)));
  
  // Get unique difficulty levels
  const difficultyLevels = Array.from(new Set(allResources.map(r => r.difficulty)));
  
  // Toggle selection of a filter
  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const toggleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };
  
  // Get icon for resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen size={18} />;
      case 'video':
        return <Video size={18} />;
      case 'course':
        return <BookCopy size={18} />;
      case 'book':
        return <BookOpen size={18} />;
      case 'tool':
        return <Tool size={18} />;
      default:
        return <Globe size={18} />;
    }
  };
  
  // Get color for difficulty level
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'primary';
      case 'intermediate':
        return 'secondary';
      case 'advanced':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Discover curated resources to help you learn computer science and software development
        </p>
      </motion.div>
      
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="border rounded-lg p-3 dark:border-gray-700">
          <h3 className="font-medium mb-2">Resource Type</h3>
          <div className="flex flex-wrap gap-2">
            {resourceTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleTypeFilter(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTypes.includes(type)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-3 dark:border-gray-700">
          <h3 className="font-medium mb-2">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficultyLevels.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => toggleDifficultyFilter(difficulty)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedDifficulty.includes(difficulty)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div 
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col" hoverable>
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                  </Badge>
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    {getResourceIcon(resource.type)}
                    <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.topics.map(topic => (
                    <span 
                      key={topic}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
                <a 
                  href={resource.url} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
                >
                  View Resource
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 dark:text-gray-400">No resources found matching your criteria.</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;