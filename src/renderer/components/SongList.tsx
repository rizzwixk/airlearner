import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SONGS, Song } from '../content/songs';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'text-green-400 bg-green-400/10',
  easy: 'text-lime-400 bg-lime-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  hard: 'text-red-400 bg-red-400/10',
};

const GENRE_COLORS: Record<string, string> = {
  Rock: 'border-blue-500/30 text-blue-300',
  Grunge: 'border-purple-500/30 text-purple-300',
  Metal: 'border-red-500/30 text-red-300',
  Blues: 'border-orange-500/30 text-orange-300',
  Britpop: 'border-green-500/30 text-green-300',
};

function SongCard({ song }: { song: Song }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/song/${song.id}`)}
      className="glass-card p-5 text-left hover:bg-white/5 transition-all cursor-pointer group w-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${GENRE_COLORS[song.genre] || 'border-gray-500/30 text-gray-300'}`}>
            {song.genre}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${DIFFICULTY_COLORS[song.difficulty]}`}>
            {song.difficulty}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        {song.snippets.length} snippet{song.snippets.length > 1 ? 's' : ''}
      </p>
    </button>
  );
}

const SongList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Song Library</h1>
          <p className="text-sm text-gray-400 mt-1">Learn to play popular songs on guitar</p>
        </div>
        <button
          onClick={() => navigate('/fretboard')}
          className="text-sm px-3 py-1.5 glass-card-light hover:bg-white/10 rounded-lg text-gray-300 transition-all cursor-pointer"
        >
          Fretboard Study
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SONGS.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongList;
