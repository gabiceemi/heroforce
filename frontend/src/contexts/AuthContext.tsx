'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

type User = {
  id: number;
  name: string;
  email: string;
  character: string | null;
};

type AuthContextProps = {
  user: User | null;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function refreshUser() {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch {
      logout();
    }
  }

  async function login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
  }

  async function register(name: string, email: string, password: string) {
    const response = await api.post('/auth/register', { name, email, password });
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      api.get('/auth/me')
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, refreshUser, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
