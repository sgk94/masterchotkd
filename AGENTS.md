# Master Cho's Taekwondo — AGENTS.md

## Agent Rules
- Never modify `CLAUDE.md`. Treat it as read-only project context.
- Put any new agent-specific notes, workflow updates, or working context in this file.

## Authoritative source
**See `CLAUDE.md` for status, file counts, site structure, components, gotchas, and tech-stack details.** This file holds only agent-facing workflow notes.

## Companion docs
- `LAUNCH-RUNBOOK.md` — step-by-step Foxspin → Vercel cutover with Clerk Production, Resend domain verification, DNS staging, GBP/SEO preservation, and rollback plans
- `GO-LIVE.md` — high-level checklist of decisions and questions for Foxspin, complements the runbook

## Working conventions
- Always run `pnpm vitest run` after substantive changes (currently 69 tests / 16 files baseline)
- Always run `pnpm exec tsc --noEmit` before committing
- `pnpm lint` shows pre-existing warnings in test files (img alt, unused `_f`/`_s`); do not introduce new warnings in `src/`
- Branch convention: feature branches off `main`; PR titles describe the why, not the what

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from `main`)
