import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import StudentProgress from './pages/StudentProgress';
import StudentManagement from './pages/StudentManagement';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import UploadCourse from './pages/admin/UploadCourse';
import ContentManagement from './pages/admin/ContentManagement';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CourseProvider } from './contexts/CourseContext';
import Login from './pages/Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NotificationProvider>
      <AuthProvider>
        <CourseProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <div className="flex h-screen overflow-hidden">
                        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                          <main className="flex-1 overflow-y-auto">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="p-6"
                            >
                              <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route
                                  path="/courses"
                                  element={
                                    <ProtectedRoute requiredPermissions={['view_courses']}>
                                      <CourseList />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                  path="/course/:id"
                                  element={
                                    <ProtectedRoute requiredPermissions={['view_courses']}>
                                      <CourseDetail />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/progress"
                                  element={
                                    <ProtectedRoute requiredPermissions={['view_all_students']}>
                                      <StudentProgress />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/students"
                                  element={
                                    <ProtectedRoute requiredPermissions={['manage_students']}>
                                      <StudentManagement />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route path="/settings" element={<Settings />} />
                                <Route
                                  path="/admin/upload"
                                  element={
                                    <ProtectedRoute requiredRole="instructor" requiredPermissions={['create_course']}>
                                      <UploadCourse />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/admin/content"
                                  element={
                                    <ProtectedRoute requiredRole="instructor" requiredPermissions={['edit_any_course']}>
                                      <ContentManagement />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route path="*" element={<Dashboard />} />
                              </Routes>
                            </motion.div>
                          </main>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </CourseProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;