import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiBookOpen, FiAward, FiMessageCircle } = FiIcons;

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'enrollment',
      user: 'Alice Johnson',
      action: 'enrolled in',
      target: 'Python Automation Course',
      time: '2 hours ago',
      icon: FiUser,
      color: 'blue'
    },
    {
      id: 2,
      type: 'completion',
      user: 'Bob Smith',
      action: 'completed',
      target: 'Web Scraping Module',
      time: '4 hours ago',
      icon: FiBookOpen,
      color: 'green'
    },
    {
      id: 3,
      type: 'certificate',
      user: 'Carol Davis',
      action: 'earned certificate for',
      target: 'API Testing Course',
      time: '1 day ago',
      icon: FiAward,
      color: 'yellow'
    },
    {
      id: 4,
      type: 'comment',
      user: 'David Wilson',
      action: 'commented on',
      target: 'CI/CD Pipeline Lesson',
      time: '2 days ago',
      icon: FiMessageCircle,
      color: 'purple'
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-full ${colorClasses[activity.color]} flex-shrink-0`}>
              <SafeIcon icon={activity.icon} className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-gray-600">{activity.action}</span>
                {' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
}

export default RecentActivity;