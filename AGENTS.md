# Project guide

This repository is the campaign companion for **The Lost Hope**: a client-side React app for
campaign lore, entities, sessions, quests, and event timelines.

## Toolchain

- Use Bun for dependency management and scripts. The lockfile and Netlify build both use Bun.
- Run the app with `bun run dev` (Vite on port 3000).
- Run focused tests with `bun run test`; use `bun run test:watch` while iterating.
- Before finishing any code or data change, run `bun run verify`. It type-checks, lints, checks
  formatting, runs tests, and builds the production bundle.

## Repository map

- `src/routes/`: TanStack Router file-based routes.
- `src/components/`: shared application and entity UI.
- `src/lib/campaign.ts`: entity registries, reference resolution, search, and derived views.
- `src/definitions/`: strict Zod schemas and domain types.
- `src/data/`: campaign canon. Follow the nested `src/data/AGENTS.md` instructions.
- `docs/product-goals.md`: product intent, audience, reference-first canon, and the two clocks.
- `QUESTIONS.md`: unresolved campaign-canon questions, not an engineering backlog.

## Conventions

- The app is private and pre-release. Refactor atomically to the correct final design, even when
  disruptive. Never introduce gradual migrations, dual old/new fields, aliases, redirects,
  fallbacks, adapters, or compatibility shims. Update schemas, coded data, derivations, UI, and
  tests together, then delete the old shape completely.
- Prefer the `#/` import alias for code under `src/`.
- Do not edit `src/routeTree.gen.ts` by hand. TanStack Router regenerates it during dev/build.
- Keep schemas, registry keys, reference namespaces, routes, and UI exhaustive when adding an
  entity kind.
- Treat `docs/product-goals.md` as an architectural constraint. Keep one canonical owner per fact,
  represent relationships with references, and derive views instead of creating parallel copies.
- Follow the existing Oxfmt style; do not hand-format around it.
- For UI changes, exercise the affected flow in a browser and check the console after automated
  verification passes.
