# Air Learner 2.0

Desktop guitar learning app built with Electron + React + TypeScript. Learn to play popular songs by stepping through tab snippets on an interactive scrolling tab sheet with fretboard visualization.

## Features

- **Scrolling Tab Sheet** — Horizontal tab display with playhead line, step through songs note-by-note
- **Interactive Fretboard** — Full fretboard with root/scale selection, color-coded notes
- **Song Library** — 12 popular songs (Smoke on the Water, Seven Nation Army, Nirvana, Metallica, and more)
- **Dark & Light Mode** — Theme toggle in the title bar
- **Electron Desktop App** — Frameless window with custom title bar

## Download

[Download latest installer](https://github.com/rizzwixk/airlearner/releases/latest)

## Build

```bash
npm install
npm run build:installer    # Build + package into release\Air Learner 2.0 Setup *.exe
```

### Development

```bash
npm run dev                # Vite dev server (browser only)
npm run build:renderer     # Build renderer
npm run build:main         # Compile main process
npx electron .             # Run from dist/
```

## Tech Stack

- **Electron 28** — Desktop shell
- **React 18** — UI (functional components, hooks)
- **TypeScript 5** — Strict mode
- **Vite 5** — Bundler
- **Tailwind CSS 3** — Styling (dark gray theme with light mode toggle)
- **React Router 6** — Client-side routing

## Songs

| Song | Artist | Genre | Difficulty |
|------|--------|-------|-----------|
| Smoke on the Water | Deep Purple | Rock | Beginner |
| Seven Nation Army | The White Stripes | Rock | Easy |
| Come As You Are | Nirvana | Grunge | Easy |
| Nothing Else Matters | Metallica | Metal | Medium |
| Hotel California | Eagles | Rock | Medium |
| Sunshine of Your Love | Cream | Blues | Easy |
| Iron Man | Black Sabbath | Metal | Beginner |
| Smells Like Teen Spirit | Nirvana | Grunge | Easy |
| Wonderwall | Oasis | Britpop | Medium |
| Back in Black | AC/DC | Rock | Medium |
| Stairway to Heaven | Led Zeppelin | Rock | Hard |
| Enter Sandman | Metallica | Metal | Medium |

## License

MIT
