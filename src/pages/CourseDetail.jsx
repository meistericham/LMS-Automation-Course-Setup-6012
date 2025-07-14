import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CourseVideoPlayer from '../components/CourseVideoPlayer';
import { useCourses } from '../contexts/CourseContext';

const { FiPlay, FiClock, FiUsers, FiStar, FiBookOpen, FiCheckCircle, FiCircle } = FiIcons;

function CourseDetail() {
  const { id } = useParams();
  const { courses, updateCourse } = useCourses();
  const [activeLesson, setActiveLesson] = useState(0);
  
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  // YouTube video IDs for demo purposes
  const youtubeIds = [
    "dQw4w9WgXcQ", // This is just a placeholder - Rick Roll
    "ZdJG9CcGYts",
    "mLW9LBdmh5g",
    "PoRJizFvM7s",
    "PkZNo7MFNFg",
    "DHjqpvDnNGE",
    "rfscVS0vtbw",
    "8jLOx1hD3_o"
  ];

  const handleLessonComplete = () => {
    const updatedLessons = [...course.lessons];
    updatedLessons[activeLesson] = {
      ...updatedLessons[activeLesson],
      completed: true
    };
    
    updateCourse(course.id, {
      lessons: updatedLessons,
      progress: Math.round((updatedLessons.filter(l => l.completed).length / updatedLessons.length) * 100)
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-primary-100 mb-6 text-lg">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUsers} className="h-5 w-5" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiStar} className="h-5 w-5 text-yellow-300" />
                <span>{course.rating} rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiBookOpen} className="h-5 w-5" />
                <span>{course.lessons?.length || 8} lessons</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-primary-500 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm">{course.progress}% complete</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CourseVideoPlayer 
              videoId={youtubeIds[activeLesson]} 
              title={course.lessons?.[activeLesson]?.title || `Lesson ${activeLesson + 1}`}
              onComplete={handleLessonComplete}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Content</h2>
            
            <div className="space-y-4">
              {course.lessons?.map((lesson, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    activeLesson === index 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveLesson(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <SafeIcon 
                        icon={lesson.completed ? FiCheckCircle : FiCircle} 
                        className={`h-5 w-5 ${
                          lesson.completed ? 'text-green-500' : 'text-gray-400'
                        }`} 
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <SafeIcon icon={FiPlay} className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              )) || (
                // Default lessons if none provided
                Array.from({ length: 8 }, (_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      activeLesson === index 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveLesson(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SafeIcon 
                          icon={index < 3 ? FiCheckCircle : FiCircle} 
                          className={`h-5 w-5 ${
                            index < 3 ? 'text-green-500' : 'text-gray-400'
                          }`} 
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Lesson {index + 1}: {[
                              'Introduction to Python Automation',
                              'Setting Up Your Environment',
                              'Basic Automation Scripts',
                              'Advanced Workflows',
                              'Error Handling',
                              'Testing Strategies',
                              'Deployment',
                              'Best Practices'
                            ][index]}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {['15 min', '20 min', '25 min', '30 min', '18 min', '22 min', '28 min', '35 min'][index]}
                          </p>
                        </div>
                      </div>
                      <SafeIcon icon={FiPlay} className="h-5 w-5 text-gray-400" />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Course Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Lessons</span>
                <span className="font-medium">{course.lessons?.length || 8}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">
                  {course.lessons?.filter(l => l.completed).length || 3}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Remaining</span>
                <span className="font-medium">2h 45m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className={`font-medium capitalize ${
                  course.level === 'beginner' ? 'text-green-600' :
                  course.level === 'intermediate' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {course.level}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">What You'll Learn</h3>
            <ul className="space-y-3">
              {[
                'Automation fundamentals and principles',
                'Setting up automation environments',
                'Creating efficient workflows',
                'Error handling and debugging',
                'Testing and deployment strategies',
                'Best practices and optimization'
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;