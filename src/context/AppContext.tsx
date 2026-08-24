"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '../types';
import { Language, t } from '../i18n/translations';
import { api } from '../api/client';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof t['en'];
  currentLearner: Employee | null;
  setCurrentLearner: (emp: Employee | null) => void;
  employees: Employee[];
  refreshEmployees: () => Promise<void>;
  currentRoute: string;
  navigate: (route: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');
  const [currentLearner, setCurrentLearnerState] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>('#landing');

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sye_lang', newLang);
    }
  };

  const setCurrentLearner = (emp: Employee | null) => {
    setCurrentLearnerState(emp);
    if (typeof window !== 'undefined') {
      if (emp) {
        localStorage.setItem('sye_current_learner', JSON.stringify(emp));
      } else {
        localStorage.removeItem('sye_current_learner');
      }
    }
  };

  const refreshEmployees = async () => {
    try {
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Failed to load employees:', err);
    }
  };

  const navigate = (route: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = route;
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('sye_lang') as Language;
      if (savedLang) setLangState(savedLang);

      const savedLearner = localStorage.getItem('sye_current_learner');
      if (savedLearner) {
        try {
          setCurrentLearnerState(JSON.parse(savedLearner));
        } catch (e) {
          console.error(e);
        }
      }

      if (window.location.hash) {
        setCurrentRoute(window.location.hash);
      }

      const handleHashChange = () => {
        setCurrentRoute(window.location.hash || '#landing');
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  useEffect(() => {
    refreshEmployees();
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t: t[lang],
        currentLearner,
        setCurrentLearner,
        employees,
        refreshEmployees,
        currentRoute,
        navigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
