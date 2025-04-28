import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code, Clock, FolderOpen } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

// Project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  topics: string[];
  skills: string[];
  resources: { title: string; url: string }[];
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: 'todo-app',
    title: 'Todo List Application',
    description: 'Build a full-stack todo list application with user authentication and data persistence.',
    difficulty: 'beginner',
    duration: '1-2 weeks',
    topics: ['Web Development', 'CRUD', 'Authentication'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    resources: [
      { title: 'React Documentation', url: 'https://react.dev' },
      { title: 'Express.js Guide', url: 'https://expressjs.com' },
    ],
  },
  {
    id: 'data-viz',
    title: 'Data Visualization Dashboard',
    description: 'Create an interactive dashboard to visualize and analyze datasets using D3.js or Chart.js.',
    difficulty: 'intermediate',
    duration: '2-3 weeks',
    topics: ['Data Visualization', 'Frontend Development', 'API Integration'],
    skills: ['JavaScript', 'D3.js', 'Chart.js', 'API', 'CSS Grid'],
    resources: [
      { title: 'D3.js Documentation', url: 'https://d3js.org' },
      { title: 'Chart.js Documentation', url: 'https://www.chartjs.org' },
    ],
  },
  {
    id: 'ml-image',
    title: 'Image Classification with TensorFlow',
    description: 'Build an image classification model using TensorFlow and deploy it as a web application.',
    difficulty: 'advanced',
    duration: '3-4 weeks',
    topics: ['Machine Learning', 'Deep Learning', 'Web Development'],
    skills: ['Python', 'TensorFlow', 'JavaScript', 'HTML/CSS', 'React'],
    resources: [
      { title: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' },
      { title: 'TensorFlow.js Documentation', url: 'https://www.tensorflow.org/js' },
    ],
  },
  {
    id: 'chat-app',
    title: 'Real-time Chat Application',
    description: 'Create a real-time chat application using WebSockets and a modern frontend framework.',
    difficulty: 'intermediate',
    duration: '2-3 weeks',
    topics: ['Real-time Communication', 'Web Development', 'Authentication'],
    skills: ['JavaScript', 'Socket.io', 'React', 'Node.js', 'Express'],
    resources: [
      { title: 'Socket.io Documentation', url: 'https://socket.io/docs/v4/' },
      { title: 'React Hooks Tutorial', url: 'https://react.dev/reference/react/hooks' },
    ],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    description: 'Design and develop a personal portfolio website to showcase your skills and projects.',
    difficulty: 'beginner',
    duration: '1-2 weeks',
    topics: ['Web Design', 'Frontend Development', 'Responsive Design'],
    skills: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
    resources: [
      { title: 'CSS Grid Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
      { title: 'Responsive Design Principles', url: 'https://web.dev/responsive-web-design-basics/' },
    ],
  },
  {
    id: 'nlp-sentiment',
    title: 'Sentiment Analysis Tool',
    description: 'Build a sentiment analysis tool that can analyze text from various sources and determine sentiment.',
    difficulty: 'advanced',
    duration: '3-4 weeks',
    topics: ['Natural Language Processing', 'Machine Learning', 'API Development'],
    skills: ['Python', 'NLTK', 'scikit-learn', 'Flask', 'JavaScript'],
    resources: [
      { title: 'NLTK Documentation', url: 'https://www.nltk.org/' },
      { title: 'scikit-learn Documentation', url: 'https://scikit-learn.org/stable/' },
    ],
  },
];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  
  // Filter projects based on search and filters
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(project.difficulty);
    
    return matchesSearch && matchesDifficulty;
  });
  
  // Get difficulty levels
  const difficultyLevels = Array.from(new Set(projectsData.map(p => p.difficulty)));
  
  // Toggle difficulty filter
  const toggleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };
  
  // Get difficulty badge variant
  const getDifficultyVariant = (difficulty: string) => {
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
        <h1 className="text-3xl font-bold">Project Ideas</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Discover hands-on projects to reinforce your learning and build your portfolio
        </p>
      </motion.div>
      
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects by title, description, topics, or skills..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={getDifficultyVariant(project.difficulty)}>
                    {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock size={16} />
                    <span>{project.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <Code size={16} /> Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map(skill => (
                        <span 
                          key={skill}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                      <FolderOpen size={16} /> Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.topics.map(topic => (
                        <span 
                          key={topic}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                <h4 className="font-medium mb-2">Learning Resources:</h4>
                <ul className="space-y-1">
                  {project.resources.map((resource, idx) => (
                    <li key={idx}>
                      <a 
                        href={resource.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 dark:text-gray-400">No projects found matching your criteria.</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;