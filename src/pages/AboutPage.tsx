import { motion } from 'framer-motion';
import { Github, Heart, Code, Users } from 'lucide-react';
import Card from '../components/ui/Card';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Qing Yu (Jessie)',
      role: 'Founder',
      image: '',
    },
    {
      name: 'Community Member',
      role: 'Content Developer',
      image: '',
    },
    {
      name: 'Community Member',
      role: 'Developer Advocate',
      image: '',
    },
  ];

  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">About CS PathFinder</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          An open-source platform dedicated to helping people navigate their path in computer science and software development
        </p>
      </motion.div>
      
      {/* Mission Section */}
      <section className="py-12 bg-blue-50 dark:bg-blue-900/20 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              CS PathFinder aims to democratize computer science education by providing structured learning paths, 
              curated resources, and project ideas for anyone interested in software development, data science, 
              machine learning, and related fields. We believe that education should be accessible, personalized, 
              and community-driven.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold">Community-Driven</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-full mb-4">
                  <Code className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="font-bold">Open Source</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold">Accessible Learning</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Community Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                  />
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Open Source Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Open Source Project</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
              CS PathFinder is proudly open source, built by the community for the community. 
              We welcome contributions from anyone who wants to help improve our platform.
            </p>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">How to Contribute</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Fork the Repository</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Start by forking the repository on GitHub to your own account.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Make Your Changes</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Implement your improvements, fix bugs, or add new features.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Submit a Pull Request</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We'll review your changes and merge them if they align with our project goals.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="flex justify-center mt-8">
                <a 
                  href="https://github.com/Jessie-QingYu/CS_Path_Finder" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-900 text-white dark:bg-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
                >
                  <Github size={20} />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </p>
            <Card className="p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;