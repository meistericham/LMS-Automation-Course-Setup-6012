import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiCommand, FiCpu, FiCode, FiShield, FiTerminal, FiServer } = FiIcons;

function LandingPage() {
  const features = [
    {
      title: 'AI-Powered Learning',
      description: 'Advanced algorithms adapt to your learning pace and style',
      icon: FiCpu,
      delay: 0.2
    },
    {
      title: 'Real-world Projects',
      description: 'Build automation solutions for actual industry scenarios',
      icon: FiCode,
      delay: 0.3
    },
    {
      title: 'Cloud Integration',
      description: 'Learn to automate cloud infrastructure and deployments',
      icon: FiServer,
      delay: 0.4
    },
    {
      title: 'Security First',
      description: 'Master secure automation practices and protocols',
      icon: FiShield,
      delay: 0.5
    }
  ];

  const stats = [
    { value: '95%', label: 'Success Rate' },
    { value: '50K+', label: 'Students' },
    { value: '200+', label: 'Automation Projects' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-500 rounded-full opacity-10"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Automate Your Future
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master the art of automation with cutting-edge technology and real-world applications
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <SafeIcon icon={FiTerminal} className="h-5 w-5" />
                  <span>Start Learning</span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/courses"
                  className="px-8 py-4 bg-gray-800 rounded-lg font-bold text-lg border border-gray-700 hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <SafeIcon icon={FiCommand} className="h-5 w-5" />
                  <span>Explore Courses</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Future of Automation Learning
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover our advanced learning platform designed for the next generation of automation engineers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Master Automation?
                </h2>
                <p className="text-xl mb-8 text-gray-200">
                  Join thousands of professionals revolutionizing their careers with our cutting-edge automation courses
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    Get Started Now
                    <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© 2023 Automation Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;