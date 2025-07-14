import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import CourseProgress from '../components/CourseProgress';

const { FiUsers, FiBookOpen, FiTrendingUp, FiAward } = FiIcons;

function Dashboard() {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: FiUsers, color: 'blue' },
    { title: 'Active Courses', value: '8', icon: FiBookOpen, color: 'green' },
    { title: 'Completion Rate', value: '87%', icon: FiTrendingUp, color: 'yellow' },
    { title: 'Certificates Issued', value: '456', icon: FiAward, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your automation courses.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecentActivity />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CourseProgress />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;