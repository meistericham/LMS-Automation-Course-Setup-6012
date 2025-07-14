import React, { createContext, useContext, useState } from 'react';

const CourseContext = createContext();

export function useCourses() {
  return useContext(CourseContext);
}

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Python Automation Fundamentals',
      description: 'Learn the basics of Python automation, from simple scripts to complex workflows.',
      category: 'Programming',
      level: 'beginner',
      duration: '4 weeks',
      students: 234,
      rating: 4.8,
      progress: 85,
      lessons: [
        { title: 'Introduction to Python Automation', duration: '15 min', completed: true },
        { title: 'Setting Up Your Environment', duration: '20 min', completed: true },
        { title: 'Basic Python Scripts', duration: '25 min', completed: true },
        { title: 'File Operations', duration: '30 min', completed: false },
        { title: 'Web Automation', duration: '35 min', completed: false },
        { title: 'Data Processing', duration: '28 min', completed: false },
        { title: 'Error Handling', duration: '22 min', completed: false },
        { title: 'Best Practices', duration: '18 min', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Web Scraping Mastery',
      description: 'Master web scraping techniques using Python and popular libraries.',
      category: 'Data Collection',
      level: 'intermediate',
      duration: '6 weeks',
      students: 189,
      rating: 4.7,
      progress: 72,
      lessons: [
        { title: 'Web Scraping Basics', duration: '20 min', completed: true },
        { title: 'Using BeautifulSoup', duration: '25 min', completed: true },
        { title: 'Handling JavaScript', duration: '30 min', completed: false },
        { title: 'Data Storage', duration: '22 min', completed: false },
        { title: 'Advanced Techniques', duration: '35 min', completed: false },
        { title: 'Legal Considerations', duration: '15 min', completed: false },
      ]
    },
    {
      id: 3,
      title: 'API Testing & Automation',
      description: 'Comprehensive guide to API testing and automation strategies.',
      category: 'Testing',
      level: 'intermediate',
      duration: '5 weeks',
      students: 156,
      rating: 4.9,
      progress: 94,
      lessons: [
        { title: 'API Testing Fundamentals', duration: '18 min', completed: true },
        { title: 'REST API Testing', duration: '25 min', completed: true },
        { title: 'Authentication Testing', duration: '22 min', completed: true },
        { title: 'Performance Testing', duration: '28 min', completed: true },
        { title: 'Automation Frameworks', duration: '30 min', completed: false },
      ]
    },
    {
      id: 4,
      title: 'CI/CD Pipeline Automation',
      description: 'Build and manage continuous integration and deployment pipelines.',
      category: 'DevOps',
      level: 'advanced',
      duration: '8 weeks',
      students: 123,
      rating: 4.6,
      progress: 68,
      lessons: [
        { title: 'CI/CD Concepts', duration: '20 min', completed: true },
        { title: 'Setting Up Jenkins', duration: '35 min', completed: true },
        { title: 'Docker Integration', duration: '40 min', completed: false },
        { title: 'Testing Automation', duration: '30 min', completed: false },
        { title: 'Deployment Strategies', duration: '25 min', completed: false },
        { title: 'Monitoring & Alerting', duration: '28 min', completed: false },
      ]
    },
    {
      id: 5,
      title: 'Docker for Automation',
      description: 'Containerize your automation scripts and workflows using Docker.',
      category: 'DevOps',
      level: 'intermediate',
      duration: '4 weeks',
      students: 98,
      rating: 4.5,
      progress: 45,
      lessons: [
        { title: 'Docker Basics', duration: '25 min', completed: true },
        { title: 'Creating Containers', duration: '30 min', completed: false },
        { title: 'Docker Compose', duration: '35 min', completed: false },
        { title: 'Automation Workflows', duration: '40 min', completed: false },
      ]
    },
    {
      id: 6,
      title: 'Database Automation',
      description: 'Automate database operations, backups, and maintenance tasks.',
      category: 'Database',
      level: 'advanced',
      duration: '6 weeks',
      students: 87,
      rating: 4.7,
      progress: 23,
      lessons: [
        { title: 'Database Automation Basics', duration: '20 min', completed: true },
        { title: 'Backup Automation', duration: '25 min', completed: false },
        { title: 'Data Migration', duration: '30 min', completed: false },
        { title: 'Performance Monitoring', duration: '28 min', completed: false },
        { title: 'Maintenance Scripts', duration: '22 min', completed: false },
      ]
    }
  ]);

  const addCourse = (course) => {
    setCourses(prev => [...prev, { ...course, id: Date.now() }]);
  };

  const updateCourse = (id, updates) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const value = {
    courses,
    addCourse,
    updateCourse,
    deleteCourse
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}