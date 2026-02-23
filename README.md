# Wooah!

6-day Push/Pull/Legs hypertrophy tracker with progressive overload, volume science, and mesocycle management.

**[wooah.vercel.app](https://wooah.vercel.app)**

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| Auth | Supabase + Google OAuth |
| State | Zustand (localStorage + Supabase sync) |
| Charts | Recharts |
| PWA | Serwist service worker |
| CI | GitHub Actions (Biome, build) |

## Setup

```bash
bun install
cp .env.example .env.local
# Fill in Supabase + Google OAuth credentials
bun run dev
```

### Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run lint` | Lint with Biome |
| `bun run test` | Run tests (Vitest) |

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
- **Progress photos** stored in IndexedDB / Supabase Storage
- **Body weight tracking** with trend chart
- **Cloud sync** via Supabase with offline-first PWA support
- **Dark / Light / System** themes
