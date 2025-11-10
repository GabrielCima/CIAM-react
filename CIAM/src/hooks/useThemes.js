import { useState, useEffect } from 'react';

const themes = ['default', 'dark', 'high-contrast'];

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Remover clases de temas anteriores
    themes.forEach(theme => {
      document.documentElement.classList.remove(`theme-${theme}`);
    });
    
    // Agregar clase del tema actual
    if (currentTheme !== 'default') {
      document.documentElement.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  return {
    currentTheme,
    setTheme: setCurrentTheme,
    themes
  };
};