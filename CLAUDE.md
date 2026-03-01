# Wooah! — Project Instructions

## Git Workflow (MANDATORY)

**Never push directly to `master`.** Every change follows this flow:

1. **Branch**: Create a feature branch from `master` (`feat/<name>`, `fix/<name>`, `chore/<name>`)
2. **Commit**: Make atomic commits on the branch
3. **Push**: Push the branch to origin
4. **PR**: Create a pull request to `master` using `gh pr create`
5. **Wait**: CI pipeline (lint, typecheck, tests, build, secrets scan, vuln scan) and CodeRabbit review must run
6. **User approves**: Only the user merges after reviewing CI + CodeRabbit feedback
7. **Cleanup**: Branch auto-deletes after merge

### Branch naming
- `feat/<short-description>` — new features
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling, config, refactors
- `docs/<short-description>` — documentation only

### PR format
- Title: short, under 70 characters
- Body: `## Summary` (bullet points) + `## Test plan` (checklist)

### What NOT to do
- Do NOT push to `master` directly
- Do NOT merge PRs — the user does that
- Do NOT use `--force` push
- Do NOT skip CI by adding `[skip ci]` to commits

## Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Package manager**: `bun` (never npm/yarn)
- **Linter**: Biome (`bun run lint`)
- **Build**: `bun run build`
- **Backend**: Convex (reactive database, auth, file storage)
- **i18n**: Custom hook `useT()` from `@/lib/i18n` — English + Polish

## Key Rules

- All user-facing strings use `useT()` hook — no hardcoded text
- Exercise names, muscle groups, fitness abbreviations (RIR, AMRAP, 1RM) stay in English
- Use Convex Auth (`useConvexAuth`, `getAuthUserId`) for auth — never call `getUser()` inside `onAuthStateChange` (causes navigator.locks deadlock)
- All exercise/program access goes through `getEffectiveProgram(dayIdx)` from store
- `localStorage` keys use `ironppl_` prefix (migration compat)

## CI Pipeline

Runs on every PR to `master` (`.github/workflows/ci.yml`):
1. **Lint** — `bun run lint` (Biome)
2. **Typecheck** — `bunx tsc --noEmit`
3. **Unit Tests** — `bun run test`
4. **Secrets Scan** — Gitleaks
5. **Build** — `bun run build` (needs lint + typecheck)
6. **Vuln Scan** — Trivy (HIGH/CRITICAL)
