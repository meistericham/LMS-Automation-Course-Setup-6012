import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual values when connecting to Supabase
const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY';

// Check if Supabase is properly configured
if (supabaseUrl === 'https://YOUR_PROJECT_ID.supabase.co' || supabaseAnonKey === 'YOUR_ANON_KEY') {
  console.warn('Supabase not configured. Using mock data mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Role hierarchy and permissions
export const ROLE_HIERARCHY = {
  student: 1,
  instructor: 2,
  admin: 3,
  super_admin: 4
};

export const ROLE_PERMISSIONS = {
  student: [
    'view_courses',
    'enroll_courses',
    'view_own_progress'
  ],
  instructor: [
    'view_courses',
    'create_course',
    'edit_own_course',
    'delete_own_course',
    'view_own_students'
  ],
  admin: [
    'view_courses',
    'create_course',
    'edit_any_course',
    'delete_any_course',
    'view_all_students',
    'manage_students',
    'view_payments'
  ],
  super_admin: [
    'view_courses',
    'create_course',
    'edit_any_course',
    'delete_any_course',
    'view_all_students',
    'manage_students',
    'manage_instructors',
    'manage_admins',
    'view_payments',
    'manage_settings',
    'view_analytics'
  ]
};

// Mock authentication for demo purposes
export const mockAuth = {
  users: [
    {
      id: '1',
      email: 'meistericham@gmail.com',
      name: 'Super Admin',
      role: 'super_admin',
      full_name: 'Super Admin'
    },
    {
      id: '2',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'instructor',
      full_name: 'John Doe'
    },
    {
      id: '3',
      email: 'student@example.com',
      name: 'Student User',
      role: 'student',
      full_name: 'Student User'
    }
  ],
  
  signInWithPassword: async ({ email, password }) => {
    // Mock authentication logic
    const user = mockAuth.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Simple password check for demo
    const validPasswords = {
      'meistericham@gmail.com': 'Sam1122334455!',
      'john.doe@example.com': 'password123',
      'student@example.com': 'password123'
    };
    
    if (validPasswords[email] !== password) {
      throw new Error('Invalid password');
    }
    
    return {
      data: { user },
      error: null
    };
  },
  
  signUp: async ({ email, password }) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role: 'student',
      full_name: email.split('@')[0]
    };
    
    mockAuth.users.push(newUser);
    
    return {
      data: { user: newUser },
      error: null
    };
  },
  
  signOut: async () => {
    return { error: null };
  },
  
  getSession: () => {
    // Check localStorage for session
    const session = localStorage.getItem('lms_session');
    return session ? JSON.parse(session) : null;
  },
  
  onAuthStateChange: (callback) => {
    // Mock auth state change listener
    const session = mockAuth.getSession();
    if (session) {
      callback('SIGNED_IN', session);
    } else {
      callback('SIGNED_OUT', null);
    }
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  }
};