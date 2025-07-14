import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, ROLE_HIERARCHY, ROLE_PERMISSIONS, mockAuth } from '../lib/supabase';
import { useNotifications } from './NotificationContext';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { showSuccess, showError } = useNotifications();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('lms_session');
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        setCurrentUser(parsedSession.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing session:', error);
        localStorage.removeItem('lms_session');
      }
    }
    setLoading(false);

    // Mock auth state change listener
    const { data: { subscription } } = mockAuth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data: { user }, error } = await mockAuth.signInWithPassword({ email, password });
      
      if (error) throw error;

      // Store session in localStorage
      const session = { user };
      localStorage.setItem('lms_session', JSON.stringify(session));
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      showSuccess(`Welcome back, ${user.full_name}!`);
      
      return { success: true };
    } catch (error) {
      showError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, fullName, role = 'student') => {
    try {
      setLoading(true);
      const { data: { user }, error } = await mockAuth.signUp({ email, password });
      
      if (error) throw error;

      // Update user with full name and role
      const updatedUser = { ...user, full_name: fullName, role };
      
      // Store session in localStorage
      const session = { user: updatedUser };
      localStorage.setItem('lms_session', JSON.stringify(session));
      
      setCurrentUser(updatedUser);
      setIsAuthenticated(true);
      showSuccess('Registration successful!');
      
      return { success: true };
    } catch (error) {
      showError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await mockAuth.signOut();
      localStorage.removeItem('lms_session');
      setCurrentUser(null);
      setIsAuthenticated(false);
      showSuccess('You have been logged out successfully');
    } catch (error) {
      showError('Error logging out');
    }
  };

  const hasPermission = (permission) => {
    if (!currentUser?.role) return false;
    return ROLE_PERMISSIONS[currentUser.role]?.includes(permission) || false;
  };

  const hasRole = (requiredRole) => {
    if (!currentUser?.role) return false;
    return ROLE_HIERARCHY[currentUser.role] >= ROLE_HIERARCHY[requiredRole];
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    hasPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}