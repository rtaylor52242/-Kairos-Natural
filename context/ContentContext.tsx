import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContent, ContentContextType } from '../types';
import { INITIAL_CONTENT } from '../constants';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(INITIAL_CONTENT);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const updateContent = (section: keyof AppContent, data: any) => {
    setContent(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isAdminMode, toggleAdminMode }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
