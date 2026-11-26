# Project guide

This repository is the campaign companion for **The Lost Hope**: a client-side React app for
campaign lore, entities, sessions, quests, and event timelines.

## Campaign knowledge server

Use the `campaign` MCP server (`.mcp.json`, started automatically by Claude Code with
`bun run mcp`) for all story work: planning events, scenes, sessions and arcs, answering canon
questions, and checking ideas. It is faster and more complete than reading `src/data/` files,
because it follows `refs.*` links and backlinks, derives what the party has met, and reloads when
data changes.

- Start with `overview`. Read records with `get`, `links`, `timeline`, `motives`, `met` and `arc`.
- For the published library (creatures, spells, magic items, equipment, species, NPCs, rules,
  encounter ideas), use `library_search` and `library_get`. `get` and `check_idea` also show the
  library entries their records point at, and `check_idea` the ones an idea names in capitals.
  Library entries are rules reference, not canon: the party has met none of them unless campaign
  data says so.
- Run `check_idea` on every suggestion before proposing it, and resolve each warning: a
  contradicted event or motivation, a retired PC, a dead NPC, or a reveal of a record the party has
  not met.
- Only campaign data is canon. Brainstormed ideas in chat are not canon until written into the
  data, and `open_questions` are unknowns: do not invent their answers as fact.
- The server is read-only. Edit canon in `src/data/` following `src/data/AGENTS.md`.

## Toolchain

- Use Bun for dependency management and scripts. The lockfile and Netlify build both use Bun.
- Run the app with `bun run dev` (Vite on port 3000).
- Run focused tests with `bun run test`; use `bun run test:watch` while iterating.
- Before finishing any code or data change, run `bun run verify`. It type-checks, lints, checks
  formatting, runs tests, and builds the production bundle.
- Never render the complete social-image set during local development or verification. Full social
  image rendering is deployment-only and guarded by Netlify's deploy environment. Local commands
  may generate the lightweight social-image path manifests only.

## Repository map

- `src/routes/`: TanStack Router file-based routes.
- `src/components/`: shared application and entity UI.
- `src/lib/campaign.ts`: entity registries, reference resolution, search, and derived views.
- `src/definitions/`: strict Zod schemas and domain types.
- `src/data/`: campaign canon. Follow the nested `src/data/AGENTS.md` instructions.
- `docs/product-goals.md`: product intent, audience, reference-first canon, and the two clocks.
- `QUESTIONS.md`: unresolved campaign-canon questions, not an engineering backlog.

## Conventions

- The app is private and pre-release. When replacing an internal model, move atomically to the
  correct final design even when disruptive. Do not preserve the obsolete shape through gradual
  migrations, dual old/new fields, compatibility aliases or redirects, migration fallbacks,
  adapters, or shims. Update schemas, coded data, derivations, UI, and tests together, then delete
  the old shape completely.
- Prefer the `#/` import alias for code under `src/`.
- Do not edit `src/routeTree.gen.ts` by hand. TanStack Router regenerates it during dev/build.
- Do not edit `src/data/generated/refs.ts` by hand. Run `bun run generate:refs` after adding,
  removing, renaming, or re-keying any referenceable entity. Dev and build also regenerate it, and
  `bun run verify` checks it is current.
- Keep schemas, registry keys, reference namespaces, routes, and UI exhaustive when adding an
  entity kind.
- Treat `docs/product-goals.md` as an architectural constraint. Keep one canonical owner per fact,
  represent relationships with references, and derive views instead of creating parallel copies.
- Follow the existing Oxfmt style; do not hand-format around it.
- For UI changes, exercise the affected flow in a browser and check the console after automated
  verification passes.
- After image-viewer changes, run `bun run test:image-viewer` against the completed build. This
  checks real browser geometry on desktop, mobile, and a short landscape viewport. Install the
  test browser once with `bunx playwright install chromium` if needed.
- After location-connection changes, run `bun run test:location-connections` against the completed
  build to check door and portal navigation, containment, and desktop/mobile map placement.

## Map artwork

- Every avatar source, including historical portraits, must be square. Choose crops per image to
  preserve the face and identifying details in both square and circular thumbnails. Do not
  stretch images or blindly centre-crop them. Register avatar sources with `role: 'avatar'` so
  image generation rejects non-square sources. Keep uncropped backups locally under `output/`.

- To add, revise, remove or use artwork, use the `campaign-images` skill.
- Generate new art in the house style: `bun run art:style <style>` prints the guide and the
  reference pictures for each kind of art (portraits, maps, illustrations, items, library
  creatures). The styles and their references live in `src/data/dm/art-styles.ts`.
- Original artwork lives in Cloudflare R2 (bucket `thelosthope-media-src`), not git. Place
  approved art under `assets/images/` and register it in `scripts/image-sources.ts` as before; git
  ignores those rasters (only the small `assets/images/app/` icons stay committed).
  `assets/images.lock.json` records each registered original by SHA-256 and is derived: never edit
  it by hand. `bun run media:sync` fetches missing art, uploads new or edited art with the Mac's
  `wrangler` login, and rewrites the lock; commit the lock it writes. `generate:images` (and so dev,
  tests and builds) fetches missing originals automatically, from one store shared by every clone and worktree on the machine (`~/.cache/the-lost-hope/media-originals`),
  and refuses to run while a file differs from the lock. A lock conflict is resolved by running
  `media:sync`.
- Without the Mac's `wrangler` login (cloud sessions), commit new originals with
  `git add -f assets/images/...` and expect the `media:gate` check to fail. Before merge, the Mac
  runs `bun run media:sync --adopt` on that branch, which uploads them, locks them and takes them
  back out of git.
- Do not commit responsive JPEG derivatives or generated app icons. The image pipeline recreates
  those during development, tests, and builds. The entire `output/` directory is local and ignored,
  including drafts, prompts, and browser screenshots. Put useful generation context and review
  evidence in the pull request.

- Every location map uses a 3:2 landscape canvas, including schematic maps. Generate new artwork at
  1536 by 1024 pixels unless a larger 3:2 source is needed.
- Extend existing artwork with matching surroundings to fit the canvas. Do not crop rooms, stretch
  geometry, or invent additional explorable areas. Preserve the original draft.
- Store the actual source dimensions in the location's `map` field. When padding a map, translate
  its child locations' `at` coordinates by the added margin, accounting for any uniform scaling.
- Register map artwork in `scripts/image-sources.ts` for responsive progressive-JPEG delivery.

## Icon selection

- Search the canonical catalog before choosing an icon: `bun run icons:search -- "<concept>"`.
- Prefer entries classified as `useful`. Treat `questionable` entries as visual-review candidates,
  and do not use an entry `marked-for-deletion` without deliberately reviewing its reason.
- Lucide is canonical for generic web-UI controls. Use Game Icons for fantasy, RPG, campaign-world,
  item, creature, and event concepts when it communicates the meaning better.
- Reference catalog IDs in the form `lucide/ArrowLeft`, `gi/GiDragonHead`, `fa/FaDragon`, or
  `custom/LongRest`. When adding a custom icon or another icon source, add it to the generator and
  regenerate the catalog with `bun run generate:icons`. See `src/icon-catalog/README.md` for the
  review and override workflow.

## UI architecture

- Treat a route or full screen as the orchestration boundary. Prefer a deliberately fat screen that
  selects inputs, invokes pure builders, owns route state, queries, mutations, and screen state, and
  composes the result. Keep it fat in orchestration and composition, not in reusable algorithms,
  domain derivation, or independent interaction mechanics.
- Keep non-trivial or reusable transformations in pure, testable functions outside React. Pass
  display-ready props into presentational components.
- Give every component one clear UI concern that can be stated in one sentence. Treat line count
  only as a discovery signal: keep one-off page sections inline, and extract only reusable UI
  concepts, independent interaction or accessibility behavior, or stable visual patterns.
- Dedicated domain adapters such as canonical entity-reference links may resolve their own data
  when that lookup is the component's single stated concern. General presentational primitives must
  not query campaign registries or reshape domain data.
- Prefer route-specific composition over “god components” that switch on entity kinds or accept
  many flags to render unrelated screens.
- Abstract semantic repetition, not merely similar-looking JSX. Before adding an abstraction,
  confirm that its callers share the same concept and are likely to evolve together.
- Within an authorized refactor scope, atomically remove dead exports, unreachable branches,
  duplicate rendering, obsolete components, and superseded boundaries. Do not preserve an old UI
  boundary solely for compatibility.
- For UI architecture reviews and refactors, use the `review-ui-architecture` skill.

## Agent skills

### Issue tracker

Work is tracked in GitHub issues on this repo and planned with the `wayfinder` skill
(`wayfinder:map` issues with child tickets). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` at the repo root holds the glossary; ADRs go in `docs/adr/` when one
is needed.
