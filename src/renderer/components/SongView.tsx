import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SONGS, TabNote } from '../content/songs';

const TAB_STRINGS = ['e', 'B', 'G', 'D', 'A', 'E'];
const COL_WIDTH = 52;
const ROW_HEIGHT = 34;

function ScrollingTab({ notes, currentIndex }: { notes: TabNote[]; currentIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (notes.length === 0) return null;

  const totalContentWidth = notes.length * COL_WIDTH;
  const marginLeft = 32;
  const scrollOffset = containerWidth / 2 - marginLeft - currentIndex * COL_WIDTH - COL_WIDTH / 2;
  const minOffset = -(totalContentWidth + marginLeft - containerWidth + 20);
  const clampedOffset = Math.max(minOffset, Math.min(0, scrollOffset));

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl glass-card p-3">
      <div className="absolute left-1/2 top-3 bottom-3 w-0.5 bg-green-500 z-20 shadow-lg shadow-green-500/30" />

      <div className="absolute left-4 top-3 z-10">
        {TAB_STRINGS.map((name) => (
          <div key={name} style={{ height: ROW_HEIGHT }} className="flex items-center">
            <span className="text-xs font-mono font-bold text-gray-400 w-5 text-right">{name}</span>
          </div>
        ))}
      </div>

      <div className="overflow-hidden" style={{ marginLeft }}>
        <div
          className="transition-all duration-300 ease-out"
          style={{ transform: `translateX(${clampedOffset}px)` }}
        >
          <div className="flex">
            {notes.map((note, idx) => (
              <div key={idx} style={{ width: COL_WIDTH }} className="flex-shrink-0">
                {TAB_STRINGS.map((_, si) => (
                  <div
                    key={si}
                    style={{ height: ROW_HEIGHT }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="absolute left-0 right-0 top-1/2 h-px" style={{ backgroundColor: 'var(--string-line)' }} />

                    {note.string === si && (
                      <span
                        className={`relative z-10 text-xs font-mono font-bold w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 ${
                          idx === currentIndex
                            ? 'bg-green-500 text-white scale-110 ring-2 ring-green-300 shadow-lg shadow-green-500/40'
                            : idx < currentIndex
                            ? 'bg-primary-600/50 text-primary-200'
                            : 'text-gray-600'
                        }`}
                      >
                        {note.fret}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
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
        <select
          value={selectedSnippetId}
          onChange={(e) => setSelectedSnippetId(e.target.value)}
          className="bg-dark-200 border rounded px-3 py-1.5 text-sm text-white cursor-pointer"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          {song.snippets.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-0">
        <ScrollingTab notes={notes} currentIndex={currentNoteIndex} />
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
