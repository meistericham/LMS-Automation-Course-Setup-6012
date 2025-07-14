import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiHome, FiBookOpen, FiBarChart3, FiSettings, FiX, FiUpload, FiUser, FiGrid, FiFileText, FiUsers, FiLogOut } = FiIcons;

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const { currentUser, hasPermission, hasRole, logout } = useAuth();

  const menuItems = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Dashboard', icon: FiGrid, path: '/dashboard' },
    { name: 'Courses', icon: FiBookOpen, path: '/courses', permission: 'view_courses' },
    { name: 'Progress', icon: FiBarChart3, path: '/progress', permission: 'view_all_students' },
    { name: 'Students', icon: FiUsers, path: '/students', permission: 'manage_students' },
    { name: 'Settings', icon: FiSettings, path: '/settings' }
  ];

  const adminMenuItems = [
    { name: 'Upload Course', icon: FiUpload, path: '/admin/upload', role: 'instructor', permission: 'create_course' },
    { name: 'Manage Content', icon: FiFileText, path: '/admin/content', role: 'instructor', permission: 'edit_any_course' }
  ];

  const filteredMenuItems = menuItems.filter(
    item => !item.permission || hasPermission(item.permission)
  );

  const filteredAdminItems = adminMenuItems.filter(
    item => (!item.role || hasRole(item.role)) && (!item.permission || hasPermission(item.permission))
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <SafeIcon icon={FiX} className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">
              Automation Academy
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              <div className="mb-4">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main Menu
                </h3>
                <ul className="mt-2 space-y-1">
                  {filteredMenuItems.map(item => {
                    const isActive = pathname === item.path;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-500'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <SafeIcon
                            icon={item.icon}
                            className={`h-5 w-5 mr-3 ${
                              isActive ? 'text-primary-600' : 'text-gray-500'
                            }`}
                          />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {filteredAdminItems.length > 0 && (
                <div className="mb-4">
                  <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin Controls
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {filteredAdminItems.map(item => {
                      const isActive = pathname === item.path;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-500'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <SafeIcon
                              icon={item.icon}
                              className={`h-5 w-5 mr-3 ${
                                isActive ? 'text-primary-600' : 'text-gray-500'
                              }`}
                            />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </nav>
          </div>

          {/* User profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white">
                  {currentUser?.full_name?.charAt(0) || currentUser?.name?.charAt(0) || <SafeIcon icon={FiUser} className="h-5 w-5" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.full_name || currentUser?.name || 'Guest'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {currentUser?.role?.replace('_', ' ') || 'Not logged in'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;