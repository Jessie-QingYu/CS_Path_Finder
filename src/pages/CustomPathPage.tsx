import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Save, BookOpen, Video, BookCopy, Globe, PenTool as Tool } from 'lucide-react';
import { PathContext } from '../contexts/PathContext';
import { AuthContext } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Types
interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'tool';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
}

interface CustomPath {
  title: string;
  description: string;
  resources: Resource[];
}

const CustomPathPage = () => {
  const { addCustomPath, paths } = useContext(PathContext);
  const { user, login } = useContext(AuthContext);
  
  // Form state
  const [formData, setFormData] = useState<CustomPath>({
    title: '',
    description: '',
    resources: [],
  });
  
  // Resource pool (all available resources from predefined paths)
  const allResources = paths.flatMap(path => path.resources);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  
  // Filter resources for the pool
  const filteredPoolResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type);
    
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(resource.difficulty);
    
    // Don't show resources that are already in the custom path
    const isNotSelected = !formData.resources.some(r => r.id === resource.id);
    
    return matchesSearch && matchesType && matchesDifficulty && isNotSelected;
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
  
  // Add resource to custom path
  const addResourceToPath = (resource: Resource) => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, resource],
    }));
  };
  
  // Remove resource from custom path
  const removeResourceFromPath = (resourceId: string) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter(r => r.id !== resourceId),
    }));
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Save custom path
  const handleSavePath = () => {
    if (!user) {
      // Prompt user to login first
      login();
      return;
    }
    
    if (!formData.title || formData.resources.length === 0) {
      alert('Please add a title and at least one resource to your learning path.');
      return;
    }
    
    addCustomPath(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      resources: [],
    });
    
    alert('Your custom learning path has been saved!');
  };
  
  // Get icon for resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen size={16} />;
      case 'video':
        return <Video size={16} />;
      case 'course':
        return <BookCopy size={16} />;
      case 'book':
        return <BookOpen size={16} />;
      case 'tool':
        return <Tool size={16} />;
      default:
        return <Globe size={16} />;
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
        <h1 className="text-3xl font-bold">Create Your Own Learning Path</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Customize a learning path with resources that match your goals and interests
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Custom Path Builder - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Custom Path</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Path Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development Fundamentals"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your learning path's focus and goals..."
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Selected Resources ({formData.resources.length})</h3>
                {formData.resources.length > 1 && (
                  <button className="text-sm text-blue-600 dark:text-blue-400">
                    Reorder
                  </button>
                )}
              </div>
              
              {formData.resources.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Add resources from the pool on the right to build your learning path.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {formData.resources.map((resource, index) => (
                    <li key={resource.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">{index + 1}.</span>
                        <span className="line-clamp-1">{resource.title}</span>
                      </div>
                      <button 
                        onClick={() => removeResourceFromPath(resource.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Remove resource"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              <Button 
                variant="primary" 
                icon={<Save size={16} />} 
                onClick={handleSavePath}
                disabled={formData.title === '' || formData.resources.length === 0}
                fullWidth
              >
                Save Learning Path
              </Button>
              
              {!user && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  You'll need to sign in to save your learning path
                </p>
              )}
            </div>
          </Card>
        </div>
        
        {/* Resource Pool - Right Column */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Resource Pool</h2>
            
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Resource Type</h3>
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
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Difficulty</h3>
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
            </div>
            
            {/* Resource List */}
            <div className="space-y-4">
              {filteredPoolResources.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">No resources found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredPoolResources.map((resource) => (
                    <motion.div 
                      key={resource.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-4 flex justify-between items-start hover:shadow-md transition-shadow">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getDifficultyColor(resource.difficulty)}>
                              {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                            </Badge>
                            <span className="flex items-center gap-1 text-gray-500 text-xs">
                              {getResourceIcon(resource.type)}
                              <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                            </span>
                          </div>
                          
                          <h3 className="font-semibold">{resource.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{resource.description}</p>
                          
                          <div className="flex flex-wrap gap-1">
                            {resource.topics.map(topic => (
                              <span 
                                key={topic}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => addResourceToPath(resource)}
                          className="ml-2 p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex-shrink-0"
                          aria-label="Add resource"
                        >
                          <Plus size={18} />
                        </button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPathPage;