import React from "react";

// Mock user data for development
const mockUsers = [
  { email: "admin@example.com", password: "password", role: "admin" },
  { email: "user@example.com", password: "password", role: "user" }
];

// Simple user type
type SimpleUser = {
  id: string;
  email: string;
  name: string;
};

// Define context type
type AuthContextType = {
  user: SimpleUser | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

// Create context with default values
const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: false,
  isAdmin: false,
  signIn: function() {},
  signOut: function() {}
});

// Create a separate provider component
export function AuthProvider(props) {
  // State declarations
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Handle sign in
  function doSignIn(email, password) {
    setLoading(true);
    
    // Find user in mock data
    for (let i = 0; i < mockUsers.length; i++) {
      const u = mockUsers[i];
      if (u.email === email && u.password === password) {
        setUser({
          id: "user-" + Date.now(),
          email: u.email,
          name: u.email.split('@')[0]
        });
        setIsAdmin(u.role === 'admin');
        break;
      }
    }
    
    setLoading(false);
  }

  // Handle sign out
  function doSignOut() {
    setUser(null);
    setIsAdmin(false);
  }

  // Create context value
  const value = {
    user: user,
    loading: loading,
    isAdmin: isAdmin,
    signIn: doSignIn,
    signOut: doSignOut
  };

  // Return provider
  return React.createElement(
    AuthContext.Provider,
    { value: value },
    props.children
  );
}

// Simple hook to use auth context
export function useAuth() {
  return React.useContext(AuthContext);
}