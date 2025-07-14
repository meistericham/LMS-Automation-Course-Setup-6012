import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

function CourseProgress() {
  const courses = [
    {
      id: 1,
      name: 'Python Automation',
      progress: 85,
      students: 234,
      change: 12,
      trending: 'up'
    },
    {
      id: 2,
      name: 'Web Scraping',
      progress: 72,
      students: 189,
      change: 8,
      trending: 'up'
    },
    {
      id: 3,
      name: 'API Testing',
      progress: 94,
      students: 156,
      change: -3,
      trending: 'down'
    },
    {
      id: 4,
      name: 'CI/CD Pipeline',
      progress: 68,
      students: 123,
      change: 15,
      trending: 'up'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Course Performance</h2>
      
      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{course.name}</h3>
              <div className="flex items-center space-x-2">
                <SafeIcon 
                  icon={course.trending === 'up' ? FiTrendingUp : FiTrendingDown} 
                  className={`h-4 w-4 ${
                    course.trending === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} 
                />
                <span className={`text-sm font-medium ${
                  course.trending === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {course.change > 0 ? '+' : ''}{course.change}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{course.students} students</span>
              <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="bg-primary-600 h-2 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View detailed analytics
        </button>
      </div>
    </div>
  );
}

export default CourseProgress;