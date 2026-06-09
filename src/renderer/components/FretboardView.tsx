import React, { useState } from 'react';

const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'E'];
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FRET_COUNT = 12;

// MIDI note numbers for open strings (from high E=1 to low E=6)
const OPEN_STRING_MIDI = [64, 59, 55, 50, 45, 40];

function getNoteName(midi: number): string {
  const noteIndex = midi % 12;
  return NOTE_NAMES[noteIndex];
}

const SCALES: Record<string, number[]> = {
  'Chromatic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'Major': [0, 2, 4, 5, 7, 9, 11],
  'Minor': [0, 2, 3, 5, 7, 8, 10],
  'Major Pentatonic': [0, 2, 4, 7, 9],
  'Minor Pentatonic': [0, 3, 5, 7, 10],
  'Blues': [0, 3, 5, 6, 7, 10],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
  'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
};

const FretboardView: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedScale, setSelectedScale] = useState('Chromatic');
  const [hoveredFret, setHoveredFret] = useState<{ string: number; fret: number } | null>(null);

  const scaleIntervals = SCALES[selectedScale] || SCALES['Chromatic'];
  const rootIndex = NOTE_NAMES.indexOf(selectedRoot);

  const getNoteClass = (midi: number): string => {
    const noteIndex = midi % 12;
    const relativeIndex = (noteIndex - rootIndex + 12) % 12;
    const isInScale = scaleIntervals.includes(relativeIndex);
    const noteName = NOTE_NAMES[noteIndex];

    if (noteName === selectedRoot) return 'bg-primary-600 text-white ring-2 ring-primary-400';
    if (isInScale) return 'bg-primary-600/30 text-primary-200';
    return 'text-gray-600';
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex items-center space-x-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-400">Root:</label>
          <select
            value={selectedRoot}
            onChange={(e) => setSelectedRoot(e.target.value)}
            className="bg-dark-200 border rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            {NOTE_NAMES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-400">Scale:</label>
          <select
            value={selectedScale}
            onChange={(e) => setSelectedScale(e.target.value)}
            className="bg-dark-200 border rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            {Object.keys(SCALES).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-500 ml-auto">
          {selectedScale} in {selectedRoot}
        </div>
      </div>

      <div className="flex-1 glass-card p-4 overflow-auto">
        <div className="min-w-[700px]">
          <div className="flex mb-1">
            <div className="w-10 flex-shrink-0" />
            {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-gray-500 font-mono">
                {i === 0 ? 'Open' : i}
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
                const isHovered = hoveredFret?.string === stringIdx && hoveredFret?.fret === fret;
                const noteClass = getNoteClass(midi);

                return (
                  <div
                    key={fret}
                    className="flex-1 flex items-center justify-center h-8 relative"
                    onMouseEnter={() => setHoveredFret({ string: stringIdx, fret })}
                    onMouseLeave={() => setHoveredFret(null)}
                  >
                    <div className="absolute inset-x-0 top-1/2 h-px bg-gray-700/50" />
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono relative z-10 transition-all cursor-pointer ${noteClass} ${isHovered ? 'scale-125 ring-1 ring-white/30' : ''}`}
                    >
                      {noteName.replace('#', '♯')}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <span>Hover over a note to highlight it</span>
        <span className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-primary-600" />
          <span>Root</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-primary-600/30" />
          <span>Scale notes</span>
        </span>
      </div>
    </div>
  );
};

export default FretboardView;
