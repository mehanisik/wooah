```
  ██╗██████╗  ██████╗ ███╗   ██╗    ██████╗ ██████╗ ██╗
  ██║██╔══██╗██╔═══██╗████╗  ██║    ██╔══██╗██╔══██╗██║
  ██║██████╔╝██║   ██║██╔██╗ ██║    ██████╔╝██████╔╝██║
  ██║██╔══██╗██║   ██║██║╚██╗██║    ██╔═══╝ ██╔═══╝ ██║
  ██║██║  ██║╚██████╔╝██║ ╚████║    ██║     ██║     ███████╗
  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝     ╚═╝     ╚══════╝
```

**6-day Push / Pull / Legs hypertrophy tracker that lives in your browser.**

No accounts required. No subscriptions. Your data stays on your device — with optional cloud sync via Supabase.

---

### What it does

A complete workout companion for a structured PPL program with progressive overload. Opens to today's session, tracks every set, and gets out of your way.

- **6-day rotation** — Push A/B, Pull A/B, Legs A/B with compound + isolation work
- **Set logging** — weight/reps per set with RIR targets and rest timers
- **AMRAP tracking** — auto-calculates estimated 1RM (Epley) on final sets
- **Progressive overload** — PR detection with visual flash notifications
- **Exercise swaps** — swap any exercise for its alternatives without losing logs
- **Supersets & circuits** — paired exercises with a dedicated circuit timer (45s work / 15s rest)
- **Workout clock** — auto-starts when you begin, shows duration on completion
- **Undo** — accidentally toggled a set? 5-second undo toast
- **Celebration screen** — workout complete modal with motivational images + progress photo capture
- **Body weight tracking** — log weight over time with trend chart
- **3-month calendar** — color-coded workout history at a glance
- **Progress photos** — stored in IndexedDB (or Supabase Storage when signed in)
- **Stats dashboard** — volume, PRs, workout times, 1RM progression charts
- **Cloud sync** — magic link auth via Supabase, real-time bi-directional sync
- **Dark / Light / System** themes
- **PWA** — installable, works offline, auto-updates via service worker

### Stack

| Layer | Tool |
|-------|------|
| Build | Vite 7 |
| UI | Franken UI v2 (UIkit semantics, no Tailwind) |
| Icons | Lucide |
| Fonts | Bebas Neue, Barlow Condensed, JetBrains Mono |
| Storage | localStorage + IndexedDB + Supabase (optional) |
| Auth | Supabase magic link |
| Hosting | Vercel |
| CI | GitHub Actions (Biome, Gitleaks, Trivy) |

Zero frameworks. Zero build-time CSS tooling. Vanilla JS modules, CSS custom properties, and `import`/`export`.

### Quick start

```bash
bun install
cp .env.example .env        # add your Supabase credentials (optional)
bun run dev                  # http://localhost:5173
```

### Scripts

| Command | What it does |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Production build → `dist/` |
| `bun run preview` | Preview production build |
| `bun run check` | Biome lint + format check |
| `bun run lint` | Lint only |
| `bun run format:check` | Format check only |

### Project structure

```
src/
├── data/program.js          # full 6-day PPL program definition
├── state/store.js           # localStorage state management
├── render/
│   ├── workout.js           # exercise cards, set grids
│   ├── nav.js               # day tabs + special pages
│   ├── stats-bar.js         # header stats (week, streak)
│   ├── stats-page.js        # full stats dashboard
│   ├── calendar.js          # 3-month color-coded calendar
│   ├── bodyweight.js        # weight tracking + chart
│   ├── celebration.js       # post-workout modal
│   ├── greeting.js          # motivational greeting
│   └── photos.js            # progress photo gallery
├── sync/supabase.js         # auth, cloud sync, data migration
├── timers/
│   ├── rest-timer.js        # between-set countdown
│   ├── circuit-timer.js     # HIIT-style circuit overlay
│   └── workout-clock.js     # session duration tracker
├── ui/
│   ├── events.js            # global event handlers, modals
│   ├── exercise-swap.js     # swap exercise alternatives
│   ├── finish.js            # day completion logic + celebration
│   ├── focus-trap.js        # modal accessibility
│   ├── helpers.js           # DOM utilities
│   ├── icons.js             # Lucide icon refresh
│   ├── one-rm.js            # 1RM calculation + history
│   ├── photo-store.js       # IndexedDB / Supabase photo storage
│   ├── toast.js             # toast notifications
│   ├── undo.js              # set toggle undo
│   └── wake-lock.js         # screen wake lock during workouts
└── styles/
    ├── main.css             # import orchestrator
    ├── theme.css            # CSS custom properties
    ├── domain.css           # PPL colors, state colors
    ├── franken-slim.css     # Franken UI subset
    └── components.css       # all component styles
```

### CI/CD

Pushes to `master` and PRs trigger:

1. **Lint & Format** — `biome check` (2-space, single quotes, semicolons)
2. **Build** — Vite production build with placeholder env vars
3. **Secret Scan** — Gitleaks on full git history
4. **Vulnerability Scan** — Trivy fs scan (HIGH + CRITICAL), SARIF → GitHub Security tab

A separate cron workflow pings Supabase every 4 days to prevent free-tier hibernation.

### Supabase setup

If you want cloud sync, create a Supabase project and run `public/setup.sql` against it. Add your project URL and anon key to `.env`.

### License

This is a personal project. No license granted.
