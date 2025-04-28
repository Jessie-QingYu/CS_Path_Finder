import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Book, Code, LineChart, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Book className="h-8 w-8 text-blue-600" />,
      title: 'Structured Learning Paths',
      description: 'Follow roadmaps designed by industry experts to guide your learning journey.',
    },
    {
      icon: <Code className="h-8 w-8 text-teal-600" />,
      title: 'Practical Projects',
      description: 'Apply your knowledge with hands-on projects that solidify your skills.',
    },
    {
      icon: <LineChart className="h-8 w-8 text-purple-600" />,
      title: 'Track Your Progress',
      description: 'Monitor your learning journey and celebrate milestones along the way.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-orange-600" />,
      title: 'Customize Your Path',
      description: 'Create personalized learning paths tailored to your specific goals.',
    },
  ];
  
  const pathways = [
    {
      title: 'Full Stack Development',
      description: 'Master both frontend and backend technologies to build complete web applications.',
      path: '/roadmaps',
      color: 'bg-blue-600',
    },
    {
      title: 'Data Science & Analytics',
      description: 'Learn to extract insights and value from data using statistical methods and visualization.',
      path: '/roadmaps',
      color: 'bg-teal-600',
    },
    {
      title: 'Machine Learning & AI',
      description: 'Dive into algorithms that enable computers to learn from and make decisions based on data.',
      path: '/roadmaps',
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="pt-12 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Navigate Your Path in <span className="text-blue-600">Computer Science</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 mx-auto max-w-3xl">
            An open-source platform to guide your learning journey in software development, data science, machine learning, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/roadmaps')}
              icon={<ArrowRight />}
              iconPosition="right"
            >
              Explore Learning Paths
            </Button>
            <Button 
              size="lg" 
              variant="outlined" 
              onClick={() => navigate('/custom-path')}
            >
              Create Custom Path
            </Button>
          </div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Learning Companion</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed to make your computer science learning journey effective, engaging, and tailored to your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Learning Paths Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Learning Paths</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Begin your journey with these carefully crafted learning paths designed by experts in the field.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathways.map((pathway, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card 
                  className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300"
                  hoverable
                  onClick={() => navigate(pathway.path)}
                >
                  <div className={`h-2 ${pathway.color}`}></div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-3">{pathway.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{pathway.description}</p>
                    <Button 
                      variant="text" 
                      icon={<ArrowRight size={16} />} 
                      iconPosition="right"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(pathway.path);
                      }}
                    >
                      Start Learning
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white rounded-3xl mx-4">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your learning journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of learners and kickstart your career in tech with structured learning paths and hands-on projects.
          </p>
          <Button 
            variant="outlined" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-blue-600"
            onClick={() => navigate('/roadmaps')}
          >
            Explore Learning Paths
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;