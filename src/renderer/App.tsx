import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import SongList from './components/SongList';
import SongView from './components/SongView';
import Settings from './components/Settings';
import './styles/globals.css';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`h-screen text-white flex flex-col overflow-hidden ${theme === 'light' ? 'light' : ''}`} style={{ backgroundColor: 'var(--dark-400)' }}>
          <TitleBar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<SongList />} />
              <Route path="/song/:songId" element={<SongView />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
