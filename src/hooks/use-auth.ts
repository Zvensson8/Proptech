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
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => void;
};

// Create context with default values
const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: false,
  isAdmin: false,
  signIn: async function() {
    return {};
  },
  signOut: function() {}
});

// Create a separate provider component
export function AuthProvider(props) {
  // State declarations
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Handle sign in
  async function doSignIn(email: string, password: string): Promise<{ error?: string }> {
    setLoading(true);

    let error: string | undefined;

    // Find user in mock data
    const u = mockUsers.find((m) => m.email === email && m.password === password);
    if (u) {
      setUser({
        id: "user-" + Date.now(),
        email: u.email,
        name: u.email.split('@')[0]
      });
      setIsAdmin(u.role === 'admin');
    } else {
      error = 'Invalid credentials';
    }

    setLoading(false);
    return { error };
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