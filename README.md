# Wooah!

6-day Push/Pull/Legs hypertrophy tracker with progressive overload, volume science, and mesocycle management.

**[wooah.vercel.app](https://wooah.vercel.app)**

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui (Base UI) |
| Backend | Convex (reactive database, real-time sync) |
| Auth | Convex Auth + Google OAuth |
| Charts | Recharts |
| File Storage | Convex File Storage |
| PWA | Serwist service worker |
| i18n | English + Polish via `useT()` hook |
| CI | GitHub Actions (Biome, tsc, Vitest, CodeQL, Trivy) |

## Setup

```bash
bun install
cp .env.example .env.local
# Fill in Convex deployment URL
```

Start the Convex dev server and Next.js in separate terminals:

```bash
bun run dev:convex   # Convex backend (watches convex/ for changes)
bun run dev          # Next.js frontend
```

### Environment variables

| Variable | Description |
|---|---|
| `CONVEX_DEPLOYMENT` | Convex deployment identifier (e.g. `dev:your-deployment`) |
| `NEXT_PUBLIC_CONVEX_URL` | Convex cloud URL (e.g. `https://your-deployment.convex.cloud`) |

Google OAuth credentials (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`) are set via `bunx convex env set` on the Convex dashboard, not in `.env.local`.

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start Next.js dev server |
| `bun run dev:convex` | Start Convex dev server (watches for schema/function changes) |
| `bun run build` | Production build |
| `bun run lint` | Lint with Biome |
| `bun run test` | Run unit tests (Vitest) |

## Features

- **6-day PPL split** with exercise swaps, custom exercises, and program builder
- **Per-set logging** with weight, reps, RIR targets, and auto rest timer
- **1RM tracking** (Epley) with personal record detection
- **Volume science** — MEV/MAV/MRV landmarks per muscle group
- **Mesocycle management** — 4+1 week cycles, RIR progression, deload detection
- **Plate calculator** and dynamic warmup set generator
- **Superset timer** with partner exercise detection
- **Calendar heatmap** with streak tracking and workout history
- **Stats dashboard** — volume, PRs, workout duration, 1RM progression charts
- **Progress photos** stored in Convex File Storage
- **Body weight tracking** with trend chart
- **Real-time sync** across devices via Convex
- **Dark / Light / System** themes

## Project structure

```
src/
  app/              Next.js app router pages
  components/       React components (workout, stats, calendar, photos, etc.)
  hooks/            Custom hooks (auth, undo, swipe, clock)
  lib/
    i18n/           Translation files (en.ts, pl.ts)
    workout/        Workout logic (deload, readiness, superset)
    store/types.ts  Shared type interfaces
convex/
  schema.ts         Database schema (13 tables)
  auth.ts           Google OAuth setup
  sessions.ts       Workout session CRUD
  sets.ts           Set log tracking
  photos.ts         File storage (upload/download/delete)
  preferences.ts    User settings
  ...               Other server functions
```
