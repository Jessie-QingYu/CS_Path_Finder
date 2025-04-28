import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Types for learning paths
interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'tool';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  completed?: boolean;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  resources: LearningResource[];
  progress?: number;
  isCustom?: boolean;
  userId?: string;
}

interface PathContextType {
  paths: LearningPath[];
  customPaths: LearningPath[];
  addCustomPath: (path: Omit<LearningPath, 'id'>) => void;
  updatePathProgress: (pathId: string, resourceId: string, completed: boolean) => void;
  deletePath: (pathId: string) => void;
}

export const PathContext = createContext<PathContextType>({
  paths: [],
  customPaths: [],
  addCustomPath: () => {},
  updatePathProgress: () => {},
  deletePath: () => {},
});

interface PathProviderProps {
  children: React.ReactNode;
}

export const PathProvider: React.FC<PathProviderProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  // Predefined learning paths
  const [paths, setPaths] = useState<LearningPath[]>([
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description: 'Learn to build complete web applications from frontend to backend',
      resources: [
        {
          id: 'html-css',
          title: 'HTML & CSS Fundamentals',
          description: 'Learn the building blocks of web development',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
          type: 'course',
          difficulty: 'beginner',
          topics: ['HTML', 'CSS', 'Web Development'],
        },
        {
          id: 'javascript',
          title: 'JavaScript Essentials',
          description: 'Master the core language of web development',
          url: 'https://javascript.info/',
          type: 'course',
          difficulty: 'beginner',
          topics: ['JavaScript', 'Web Development'],
        },
        {
          id: 'react',
          title: 'React.js - Building User Interfaces',
          description: 'Create interactive UIs with the popular React library',
          url: 'https://react.dev/',
          type: 'article',
          difficulty: 'intermediate',
          topics: ['React', 'Frontend', 'JavaScript'],
        },
        {
          id: 'node',
          title: 'Node.js Backend Development',
          description: 'Build scalable server-side applications with Node.js',
          url: 'https://nodejs.org/en/learn',
          type: 'course',
          difficulty: 'intermediate',
          topics: ['Node.js', 'Backend', 'JavaScript'],
        },
        {
          id: 'databases',
          title: 'Database Design & SQL',
          description: 'Learn to design and interact with databases',
          url: 'https://www.postgresql.org/docs/current/tutorial.html',
          type: 'course',
          difficulty: 'intermediate',
          topics: ['SQL', 'Databases', 'PostgreSQL'],
        },
      ],
    },
    {
      id: 'datascience',
      title: 'Data Science & Analytics',
      description: 'Master the tools and techniques for analyzing and visualizing data',
      resources: [
        {
          id: 'python',
          title: 'Python for Data Science',
          description: 'Learn the primary language for data analysis',
          url: 'https://www.python.org/about/gettingstarted/',
          type: 'course',
          difficulty: 'beginner',
          topics: ['Python', 'Data Science'],
        },
        {
          id: 'pandas',
          title: 'Data Analysis with Pandas',
          description: 'Master the popular Python library for data manipulation',
          url: 'https://pandas.pydata.org/docs/getting_started/index.html',
          type: 'article',
          difficulty: 'intermediate',
          topics: ['Python', 'Pandas', 'Data Analysis'],
        },
        {
          id: 'visualization',
          title: 'Data Visualization Techniques',
          description: 'Learn to create effective visualizations',
          url: 'https://matplotlib.org/stable/tutorials/index.html',
          type: 'course',
          difficulty: 'intermediate',
          topics: ['Data Visualization', 'Matplotlib', 'Seaborn'],
        },
        {
          id: 'statistics',
          title: 'Statistical Analysis',
          description: 'Understand the statistical foundations of data science',
          url: 'https://www.khanacademy.org/math/statistics-probability',
          type: 'course',
          difficulty: 'intermediate',
          topics: ['Statistics', 'Probability', 'Data Science'],
        },
        {
          id: 'ml-intro',
          title: 'Introduction to Machine Learning',
          description: 'Get started with core ML concepts and algorithms',
          url: 'https://scikit-learn.org/stable/user_guide.html',
          type: 'course',
          difficulty: 'advanced',
          topics: ['Machine Learning', 'scikit-learn', 'AI'],
        },
      ],
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning & AI',
      description: 'Dive into the world of artificial intelligence and machine learning',
      resources: [
        {
          id: 'ml-fundamentals',
          title: 'Machine Learning Fundamentals',
          description: 'Understanding the core concepts of ML',
          url: 'https://www.coursera.org/learn/machine-learning',
          type: 'course',
          difficulty: 'intermediate',
          topics: ['Machine Learning', 'AI', 'Algorithms'],
        },
        {
          id: 'deep-learning',
          title: 'Neural Networks & Deep Learning',
          description: 'Build and train neural networks for various tasks',
          url: 'https://www.deeplearning.ai/',
          type: 'course',
          difficulty: 'advanced',
          topics: ['Deep Learning', 'Neural Networks', 'AI'],
        },
        {
          id: 'nlp',
          title: 'Natural Language Processing',
          description: 'Learn how computers process and analyze human language',
          url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
          type: 'course',
          difficulty: 'advanced',
          topics: ['NLP', 'Deep Learning', 'AI'],
        },
        {
          id: 'computer-vision',
          title: 'Computer Vision',
          description: 'Working with images and video data',
          url: 'https://www.tensorflow.org/tutorials/images/classification',
          type: 'article',
          difficulty: 'advanced',
          topics: ['Computer Vision', 'Deep Learning', 'AI'],
        },
        {
          id: 'llm-intro',
          title: 'Introduction to Large Language Models',
          description: 'Understanding the technology behind ChatGPT and other LLMs',
          url: 'https://openai.com/research/',
          type: 'article',
          difficulty: 'advanced',
          topics: ['LLM', 'NLP', 'AI'],
        },
      ],
    },
  ]);

  // Custom paths created by users
  const [customPaths, setCustomPaths] = useState<LearningPath[]>(() => {
    const savedPaths = localStorage.getItem('customPaths');
    return savedPaths ? JSON.parse(savedPaths) : [];
  });

  // Save custom paths to localStorage when they change
  useEffect(() => {
    localStorage.setItem('customPaths', JSON.stringify(customPaths));
  }, [customPaths]);

  // Add a new custom learning path
  const addCustomPath = (path: Omit<LearningPath, 'id'>) => {
    const newPath: LearningPath = {
      ...path,
      id: `custom-${Date.now()}`,
      isCustom: true,
      userId: user?.id,
      progress: 0,
      resources: path.resources.map(resource => ({
        ...resource,
        completed: false,
      })),
    };
    
    setCustomPaths(prev => [...prev, newPath]);
  };

  // Update progress on a learning path
  const updatePathProgress = (pathId: string, resourceId: string, completed: boolean) => {
    // Determine if we're updating a predefined or custom path
    if (pathId.startsWith('custom-')) {
      setCustomPaths(prev => 
        prev.map(path => {
          if (path.id === pathId) {
            const updatedResources = path.resources.map(resource => 
              resource.id === resourceId 
                ? { ...resource, completed } 
                : resource
            );
            
            const completedCount = updatedResources.filter(r => r.completed).length;
            const progress = (completedCount / updatedResources.length) * 100;
            
            return { 
              ...path, 
              resources: updatedResources,
              progress: Math.round(progress),
            };
          }
          return path;
        })
      );
    } else {
      setPaths(prev => 
        prev.map(path => {
          if (path.id === pathId) {
            const updatedResources = path.resources.map(resource => 
              resource.id === resourceId 
                ? { ...resource, completed } 
                : resource
            );
            
            const completedCount = updatedResources.filter(r => r.completed).length;
            const progress = (completedCount / updatedResources.length) * 100;
            
            return { 
              ...path, 
              resources: updatedResources,
              progress: Math.round(progress),
            };
          }
          return path;
        })
      );
    }
  };

  // Delete a custom path
  const deletePath = (pathId: string) => {
    if (pathId.startsWith('custom-')) {
      setCustomPaths(prev => prev.filter(path => path.id !== pathId));
    }
  };

  return (
    <PathContext.Provider value={{ 
      paths, 
      customPaths, 
      addCustomPath, 
      updatePathProgress,
      deletePath,
    }}>
      {children}
    </PathContext.Provider>
  );
};