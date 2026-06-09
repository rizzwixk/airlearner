import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import SongList from './components/SongList';
import SongView from './components/SongView';
import FretboardView from './components/FretboardView';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="h-screen bg-dark-400 text-white flex flex-col overflow-hidden">
        <TitleBar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<SongList />} />
            <Route path="/song/:songId" element={<SongView />} />
            <Route path="/fretboard" element={<FretboardView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
