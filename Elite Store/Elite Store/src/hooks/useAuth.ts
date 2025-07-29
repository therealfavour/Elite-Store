import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - in real app, this would be server-side
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email
      };
      setUser(newUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email
      };
      setUser(newUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };
}