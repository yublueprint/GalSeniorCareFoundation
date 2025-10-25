'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AuthContextType, AuthState } from '../types/auth';
import * as authService from '../services/auth.service';

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setState((prev) => ({
          ...prev,
          user,
          loading: false,
          error: null,
        }));
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          user: null,
          loading: false,
          error: error.message,
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    ...state,
    signUp: async (email: string, password: string) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        await authService.signUp(email, password);
   
      } catch (error) {
        const errorMessage = (error as Error).message;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    signIn: async (email: string, password: string) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        await authService.signIn(email, password);

      } catch (error) {
        const errorMessage = (error as Error).message;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    signOut: async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        await authService.signOut();

      } catch (error) {
        const errorMessage = (error as Error).message;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    sendEmailVerification: async () => {
      try {
        await authService.sendEmailVerification();
      } catch (error) {
        const errorMessage = (error as Error).message;
        setState((prev) => ({ ...prev, error: errorMessage }));
        throw error;
      }
    },
    sendPasswordResetEmail: async (email: string) => {
      try {
        await authService.sendPasswordResetEmail(email);
      } catch (error) {
        const errorMessage = (error as Error).message;
        setState((prev) => ({ ...prev, error: errorMessage }));
        throw error;
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
