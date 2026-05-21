# Master Cho's Taekwondo — AGENTS.md

## Agent Rules
- Put any new agent-specific notes, workflow updates, or working context in this file.

## Authoritative source
**See `CLAUDE.md` for project status, site structure, components, gotchas, and tech-stack details.** This file holds only agent-facing workflow notes.

## Companion docs
- `LAUNCH-RUNBOOK.md` — step-by-step Foxspin → Vercel cutover with Clerk Production, Resend domain verification, DNS staging, GBP/SEO preservation, and rollback plans
- `GO-LIVE.md` — high-level checklist of decisions and questions for Foxspin, complements the runbook

## Working conventions
- Use `pnpm` (packageManager is pnpm 10.18.x); do not introduce npm/yarn lockfiles
- Always run `pnpm vitest run` after substantive changes (current local baseline: 278 tests / 59 files)
- CI runs `pnpm vitest run --coverage` with thresholds in `vitest.config.ts`
- Always run `pnpm exec tsc --noEmit` before committing
- `pnpm lint` currently exits 0 with pre-existing warnings in `src/components/members/resource-card.tsx`, `src/components/members/youtube-facade.tsx`, test image mocks, and generated `coverage/` output if present; do not introduce new warnings
- Playwright E2E tests live under `tests/e2e/*` and expect a running app at `PLAYWRIGHT_BASE_URL` or `http://localhost:3000`
- Branch convention: feature branches off `main`; PR titles describe the why, not the what

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from `main`)
