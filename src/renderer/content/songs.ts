export interface TabNote {
  string: number;
  fret: number;
}

export interface SongSnippet {
  id: string;
  name: string;
  notes: TabNote[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  difficulty: 'beginner' | 'easy' | 'medium' | 'hard';
  snippets: SongSnippet[];
}

const STRING_NAMES = ['e', 'B', 'G', 'D', 'A', 'E'];

export function formatTab(snippet: SongSnippet): string {
  const lines = STRING_NAMES.map(() => '');

  for (const note of snippet.notes) {
    for (let s = 0; s < 6; s++) {
      if (s === note.string) {
        const fretStr = note.fret.toString();
        lines[s] += fretStr;
        lines[s] += '-'.repeat(Math.max(1, 3 - fretStr.length));
      } else {
        lines[s] += '---';
      }
    }
  }

  return lines.map((line, i) => `${STRING_NAMES[i]}|${line}`).join('\n');
}

export const SONGS: Song[] = [
  {
    id: 'smoke-on-the-water',
    title: 'Smoke on the Water',
    artist: 'Deep Purple',
    genre: 'Rock',
    difficulty: 'beginner',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 5, fret: 0 }, { string: 5, fret: 3 }, { string: 5, fret: 5 },
          { string: 5, fret: 0 }, { string: 5, fret: 3 }, { string: 5, fret: 6 },
          { string: 5, fret: 5 }, { string: 5, fret: 0 }, { string: 5, fret: 3 },
          { string: 5, fret: 5 }, { string: 5, fret: 3 }, { string: 5, fret: 0 },
        ],
      },
    ],
  },
  {
    id: 'seven-nation-army',
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    genre: 'Rock',
    difficulty: 'easy',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 5, fret: 7 }, { string: 5, fret: 7 }, { string: 5, fret: 10 },
          { string: 5, fret: 7 }, { string: 5, fret: 5 }, { string: 5, fret: 3 },
          { string: 5, fret: 2 }, { string: 5, fret: 0 },
          { string: 5, fret: 2 }, { string: 5, fret: 0 }, { string: 5, fret: 3 },
          { string: 5, fret: 2 }, { string: 5, fret: 0 },
        ],
      },
    ],
  },
  {
    id: 'come-as-you-are',
    title: 'Come As You Are',
    artist: 'Nirvana',
    genre: 'Grunge',
    difficulty: 'easy',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 5, fret: 0 }, { string: 5, fret: 0 },
          { string: 5, fret: 3 }, { string: 5, fret: 2 },
          { string: 5, fret: 0 }, { string: 5, fret: 0 },
          { string: 5, fret: 3 }, { string: 5, fret: 2 },
        ],
      },
    ],
  },
  {
    id: 'nothing-else-matters',
    title: 'Nothing Else Matters',
    artist: 'Metallica',
    genre: 'Metal',
    difficulty: 'medium',
    snippets: [
      {
        id: 'intro',
        name: 'Intro',
        notes: [
          { string: 2, fret: 0 }, { string: 0, fret: 0 },
          { string: 2, fret: 0 }, { string: 1, fret: 0 },
          { string: 2, fret: 2 }, { string: 0, fret: 0 },
          { string: 2, fret: 3 }, { string: 0, fret: 0 },
          { string: 2, fret: 2 }, { string: 0, fret: 0 },
          { string: 2, fret: 0 }, { string: 1, fret: 0 },
          { string: 2, fret: 0 }, { string: 0, fret: 0 },
        ],
      },
    ],
  },
  {
    id: 'hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    genre: 'Rock',
    difficulty: 'medium',
    snippets: [
      {
        id: 'intro',
        name: 'Acoustic Intro',
        notes: [
          { string: 0, fret: 2 }, { string: 1, fret: 3 },
          { string: 0, fret: 3 }, { string: 1, fret: 3 },
          { string: 0, fret: 2 }, { string: 1, fret: 3 },
          { string: 0, fret: 0 }, { string: 1, fret: 3 },
          { string: 0, fret: 0 }, { string: 1, fret: 3 },
          { string: 0, fret: 2 }, { string: 1, fret: 3 },
          { string: 0, fret: 3 }, { string: 1, fret: 3 },
          { string: 0, fret: 2 }, { string: 1, fret: 3 },
          { string: 0, fret: 0 }, { string: 1, fret: 3 },
        ],
      },
    ],
  },
  {
    id: 'sunshine-love',
    title: 'Sunshine of Your Love',
    artist: 'Cream',
    genre: 'Blues',
    difficulty: 'easy',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 5, fret: 0 }, { string: 5, fret: 0 },
          { string: 5, fret: 5 }, { string: 5, fret: 3 },
          { string: 5, fret: 0 }, { string: 5, fret: 0 },
          { string: 5, fret: 5 }, { string: 5, fret: 3 },
        ],
      },
    ],
  },
  {
    id: 'iron-man',
    title: 'Iron Man',
    artist: 'Black Sabbath',
    genre: 'Metal',
    difficulty: 'beginner',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 4, fret: 7 }, { string: 4, fret: 7 },
          { string: 4, fret: 5 }, { string: 4, fret: 5 },
          { string: 4, fret: 3 }, { string: 4, fret: 3 },
          { string: 4, fret: 2 }, { string: 4, fret: 2 },
        ],
      },
    ],
  },
  {
    id: 'smells-like-teen-spirit',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    genre: 'Grunge',
    difficulty: 'easy',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 4, fret: 0 }, { string: 4, fret: 0 },
          { string: 3, fret: 0 }, { string: 3, fret: 0 },
          { string: 4, fret: 0 }, { string: 4, fret: 0 },
          { string: 3, fret: 0 }, { string: 3, fret: 0 },
          { string: 4, fret: 0 }, { string: 4, fret: 0 },
          { string: 3, fret: 0 }, { string: 3, fret: 0 },
        ],
      },
    ],
  },
  {
    id: 'wonderwall',
    title: 'Wonderwall',
    artist: 'Oasis',
    genre: 'Britpop',
    difficulty: 'medium',
    snippets: [
      {
        id: 'intro',
        name: 'Intro Riff',
        notes: [
          { string: 1, fret: 0 }, { string: 0, fret: 2 },
          { string: 2, fret: 0 }, { string: 0, fret: 2 },
          { string: 1, fret: 3 }, { string: 0, fret: 3 },
          { string: 2, fret: 2 }, { string: 0, fret: 2 },
        ],
      },
    ],
  },
  {
    id: 'back-in-black',
    title: 'Back in Black',
    artist: 'AC/DC',
    genre: 'Rock',
    difficulty: 'medium',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 4, fret: 7 }, { string: 3, fret: 7 },
          { string: 4, fret: 7 }, { string: 3, fret: 7 },
          { string: 4, fret: 5 }, { string: 3, fret: 5 },
          { string: 4, fret: 5 }, { string: 3, fret: 5 },
          { string: 4, fret: 9 }, { string: 3, fret: 9 },
          { string: 4, fret: 9 }, { string: 3, fret: 9 },
          { string: 4, fret: 7 }, { string: 3, fret: 7 },
          { string: 4, fret: 7 }, { string: 3, fret: 7 },
        ],
      },
    ],
  },
  {
    id: 'stairway',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    genre: 'Rock',
    difficulty: 'hard',
    snippets: [
      {
        id: 'intro',
        name: 'Intro Fingerpicking',
        notes: [
          { string: 5, fret: 0 }, { string: 1, fret: 0 }, { string: 0, fret: 0 },
          { string: 5, fret: 0 }, { string: 2, fret: 0 }, { string: 1, fret: 0 }, { string: 0, fret: 0 },
          { string: 4, fret: 2 }, { string: 2, fret: 0 }, { string: 1, fret: 0 }, { string: 0, fret: 0 },
          { string: 4, fret: 2 }, { string: 2, fret: 2 }, { string: 1, fret: 0 }, { string: 0, fret: 0 },
        ],
      },
    ],
  },
  {
    id: 'enter-sandman',
    title: 'Enter Sandman',
    artist: 'Metallica',
    genre: 'Metal',
    difficulty: 'medium',
    snippets: [
      {
        id: 'main-riff',
        name: 'Main Riff',
        notes: [
          { string: 5, fret: 0 }, { string: 5, fret: 0 }, { string: 5, fret: 0 },
          { string: 5, fret: 3 }, { string: 5, fret: 2 },
          { string: 5, fret: 0 }, { string: 5, fret: 0 }, { string: 5, fret: 0 },
          { string: 5, fret: 5 }, { string: 5, fret: 3 },
        ],
      },
    ],
  },
];
