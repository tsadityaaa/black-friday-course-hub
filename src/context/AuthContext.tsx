import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { users, User, Subscription } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  subscriptions: Subscription[];
  subscribe: (courseId: string, pricePaid: number) => void;
  isSubscribed: (courseId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("currentUser");
    const storedSubscriptions = localStorage.getItem("subscriptions");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedSubscriptions) {
      setSubscriptions(JSON.parse(storedSubscriptions));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const token = btoa(`${foundUser.id}:${Date.now()}`); // Mock JWT
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      
      // Load user's subscriptions
      const storedSubs = localStorage.getItem(`subscriptions_${foundUser.id}`);
      if (storedSubs) {
        setSubscriptions(JSON.parse(storedSubs));
      } else {
        setSubscriptions([]);
      }
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // Create new user (mock - just for session)
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    };
    
    const token = btoa(`${newUser.id}:${Date.now()}`);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    setSubscriptions([]);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setUser(null);
    setSubscriptions([]);
  };

  const subscribe = (courseId: string, pricePaid: number) => {
    if (!user) return;
    
    const newSubscription: Subscription = {
      id: `sub-${Date.now()}`,
      userId: user.id,
      courseId,
      pricePaid,
      subscribedAt: new Date().toISOString(),
    };
    
    const updatedSubscriptions = [...subscriptions, newSubscription];
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem(`subscriptions_${user.id}`, JSON.stringify(updatedSubscriptions));
  };

  const isSubscribed = (courseId: string): boolean => {
    return subscriptions.some((sub) => sub.courseId === courseId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        subscriptions,
        subscribe,
        isSubscribed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
