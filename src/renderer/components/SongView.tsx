import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SONGS, Song, SongSnippet, TabNote, formatTab } from '../content/songs';

const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'E'];
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OPEN_STRING_MIDI = [64, 59, 55, 50, 45, 40];
const FRET_COUNT = 12;

function getNoteName(midi: number): string {
  return NOTE_NAMES[midi % 12];
}

function TabDisplay({ snippet }: { snippet: SongSnippet }) {
  const tab = formatTab(snippet);
  return (
    <div className="text-xs font-mono leading-relaxed text-gray-300 whitespace-pre">
      {tab}
    </div>
  );
}

const SongView: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();

  const song = SONGS.find((s) => s.id === songId);
  const [selectedSnippetId, setSelectedSnippetId] = useState('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (song && song.snippets.length > 0 && !selectedSnippetId) {
      setSelectedSnippetId(song.snippets[0].id);
    }
  }, [song, selectedSnippetId]);

  const snippet = song?.snippets.find((s) => s.id === selectedSnippetId) || null;
  const notes = snippet?.notes || [];

  useEffect(() => {
    setCurrentNoteIndex(0);
    setPlaying(false);
  }, [selectedSnippetId]);

  useEffect(() => {
    if (!playing || !notes.length) return;
    const timer = setInterval(() => {
      setCurrentNoteIndex((prev) => {
        if (prev >= notes.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [playing, notes.length]);

  const isNoteActive = (note: TabNote, idx: number): boolean => {
    return idx === currentNoteIndex;
  };

  const isNotePlayed = (note: TabNote, idx: number): boolean => {
    return idx <= currentNoteIndex;
  };

  if (!song) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <p className="text-gray-400 mb-4">Song not found</p>
        <button onClick={() => navigate('/')} className="text-primary-400 hover:text-primary-300 cursor-pointer">
          Back to song list
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white transition-colors mb-1 cursor-pointer">
            &larr; Back to songs
          </button>
          <h1 className="text-xl font-bold text-white">{song.title}</h1>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedSnippetId}
            onChange={(e) => setSelectedSnippetId(e.target.value)}
            className="bg-dark-200 border border-white/10 rounded px-3 py-1.5 text-sm text-white cursor-pointer"
          >
            {song.snippets.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="text-xs text-gray-500 mb-2 font-mono">TAB</div>
        {snippet && <TabDisplay snippet={snippet} />}
      </div>

      <div className="flex-1 glass-card p-4 overflow-auto">
        <div className="min-w-[700px]">
          <div className="flex mb-1">
            <div className="w-10 flex-shrink-0" />
            {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-gray-500 font-mono">
                {i === 0 ? 'O' : i}
              </div>
            ))}
          </div>

          {STRING_NAMES.map((openNote, stringIdx) => (
            <div key={stringIdx} className="flex items-center mb-1.5">
              <div className="w-10 flex-shrink-0 text-center">
                <span className={`text-xs font-bold ${stringIdx < 3 ? 'text-yellow-400' : 'text-white'}`}>
                  {openNote}
                </span>
              </div>

              {Array.from({ length: FRET_COUNT + 1 }, (_, fret) => {
                const midi = OPEN_STRING_MIDI[stringIdx] + fret;
                const noteName = getNoteName(midi);

                const matchingNotes = notes
                  .map((n, idx) => ({ ...n, idx }))
                  .filter((n) => n.string === stringIdx && n.fret === fret);

                const isActive = matchingNotes.some((n) => isNoteActive(n, n.idx));
                const isPlayed = matchingNotes.some((n) => isNotePlayed(n, n.idx));

                const orderNumbers = matchingNotes
                  .filter((n) => isNotePlayed(n, n.idx))
                  .map((n) => n.idx + 1);

                return (
                  <div key={fret} className="flex-1 flex items-center justify-center h-8 relative">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-gray-700/50" />
                    {matchingNotes.length > 0 && (
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono relative z-10 transition-all
                          ${isActive ? 'bg-green-500 text-white ring-2 ring-green-300 scale-125' : ''}
                          ${isPlayed && !isActive ? 'bg-primary-600 text-white' : ''}
                          ${!isPlayed ? 'text-gray-600' : ''}
                        `}
                      >
                        {orderNumbers.length > 0 && isPlayed ? orderNumbers.join(',') : noteName.replace('#', '♯')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between glass-card-light p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentNoteIndex(Math.max(0, currentNoteIndex - 1))}
            disabled={currentNoteIndex === 0}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-sm disabled:opacity-30 cursor-pointer transition-all"
          >
            Previous
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className={`px-5 py-1.5 rounded text-sm font-medium transition-all cursor-pointer ${
              playing ? 'bg-red-500/80 hover:bg-red-500 text-white' : 'bg-green-600/80 hover:bg-green-600 text-white'
            }`}
          >
            {playing ? 'Stop' : 'Play'}
          </button>

          <button
            onClick={() => setCurrentNoteIndex(Math.min(notes.length - 1, currentNoteIndex + 1))}
            disabled={currentNoteIndex >= notes.length - 1}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-sm disabled:opacity-30 cursor-pointer transition-all"
          >
            Next
          </button>
        </div>

        <div className="text-sm text-gray-400">
          Note {currentNoteIndex + 1} / {notes.length}
        </div>
      </div>
    </div>
  );
};

export default SongView;
