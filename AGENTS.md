# Air Learner 2.0 - Agent Guidelines

## Project Overview
Desktop guitar learning app built with Electron + React + TypeScript. Users can learn to play popular songs by stepping through tab snippets on an interactive fretboard visualization.

## Tech Stack
- **Electron 28** — Desktop shell (frameless window, custom title bar)
- **React 18** — UI (functional components, hooks)
- **TypeScript 5** — Strict mode
- **Vite 5** — Bundler for renderer
- **Tailwind CSS 3** — Styling (gray/slate primary palette, dark theme)
- **React Router 6** — Client-side routing (HashRouter for file:// protocol)

## Project Structure
```
src/
  main/           # Electron main process
    index.ts      # Window creation, IPC handlers
    preload.ts    # Context bridge for renderer
  renderer/       # React app
    components/   # UI components (TitleBar, SongList, SongView, FretboardView)
    content/      # Song library (songs.ts with tab snippets)
    styles/       # CSS (globals.css)
    App.tsx       # Root component (SongList + SongView + Fretboard routes)
    main.tsx      # React entry point
    index.html    # HTML template
```

## Build Commands
```bash
npm run dev                    # Vite dev server (browser only)
npm run build:renderer         # Build renderer via Vite
npm run build:main             # Compile main process via tsc
npm run build                  # Build both (renderer first!)
npm run build:exe              # Build + package into release\Air Learner 2.0-win32-x64\
npx electron .                 # Run app from dist/ (faster dev loop)
```

**IMPORTANT**: Build order matters. Run `build:renderer` FIRST (Vite has `emptyOutDir: true` which clears dist/), then `build:main`.

## Code Conventions

### TypeScript
- Strict mode enabled
- Use `interface` for object shapes, `type` for unions/aliases
- No `any` — use proper types

### React
- Functional components only, no class components
- One component per file
- Components in `src/renderer/components/`
- No inline styles — use Tailwind classes

### Styling
- Primary color palette: gray/slate (NOT blue)
- Dark theme: dark gray (`--dark-400: #1a1a1a`) background via CSS variables
- Light mode: toggled via `.light` class on root element, managed by ThemeContext in App.tsx
- Theme toggle button in TitleBar (sun/moon icon)
- CSS variables for all themeable colors defined in `:root` and `.light` in globals.css
- Glass cards: `.glass-card` and `.glass-card-light` classes use CSS variables for backgrounds
- Font: system fonts (-apple-system, Segoe UI, sans-serif)
- All interactive elements need `cursor-pointer` class
- Use inline `style={{ borderColor: 'var(--glass-border)' }}` for border colors that need to theme

### Electron
- Frameless window (`frame: false`)
- Custom title bar rendered in React (NOT native)
- No `-webkit-app-region: drag` — it swallows clicks on Windows
- Preload script exposes `window.electronAPI` for IPC
- IPC handlers in `src/main/index.ts`
- Dev mode detection: checks if `dist/index.html` exists on disk
- DevTools open in dev mode, closed in production

## Key Architecture Notes

### Song Library
- Songs defined in `src/renderer/content/songs.ts` with `TabNote[]` snippets
- Each snippet has sequential notes with string/fret positions
- Songs organized by genre, difficulty (beginner → hard)
- Currently 12 songs with well-known riffs

### SongView Component
- Scrolling horizontal tab sheet with playhead line
- Step-through playback: Previous/Next/Play buttons
- Notes scroll into center playhead position
- Notes color-coded: current = green highlight, played = dimmed filled, upcoming = dimmed
- Fret numbers displayed on string lines (tab format)

### FretboardView Component
- Full-screen interactive fretboard (strings E-A-D-G-B-E, frets 0-12)
- Root note & scale selector dropdowns
- Color-coded notes: root = primary-600 filled, scale notes = faded, non-scale = dimmed
- Hover highlighting with scale animation
- Supports 8 scale types (Chromatic, Major, Minor, Major/Minor Pentatonic, Blues, Dorian, Mixolydian)

## Known Issues
- electron-builder code signing fails (symlink permissions on Windows) — run with `npm run build:exe` which uses electron-packager instead
- No microphone/pitch detection integrated yet
- No AI/Ollama feedback integrated yet

## Common Pitfalls
1. Don't use complex SVG paths with ambiguous numbers (crashes Electron's SVG parser)
2. Don't forget `cursor-pointer` on clickable elements
3. Always rebuild renderer BEFORE main process (Vite clears dist/)
4. When opening a new PowerShell window, always set `cd "C:\Users\nitro\OneDrive\Documents\airlearner2.0(pc)"` first
