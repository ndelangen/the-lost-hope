# The Lost Hope

A player-first memory and lore companion for a homebrew D&D 5e game. It presents campaign lore,
characters, beasts, locations, organizations, quests, sessions, and a linked event timeline as a
statically published React application, with the intention of eventually sharing it with the other
players and the DM. Every public route ships complete HTML and then hydrates for interactive use.

The project is reference-first: each fact has one canonical owner and other records link to it.
Quests may synthesize a small amount of repeated context, but do not become a competing source of
canon. See [the product goals](docs/product-goals.md) for the complete intent and scope.

## Development

The project uses Bun, React 19, TypeScript, Vite, TanStack Start, Tailwind CSS, Zod, Vitest, Oxlint,
and Oxfmt.

```bash
bun install
bun run dev
```

The development server listens on <http://localhost:3000>.

Useful commands:

```bash
bun run test        # run Vitest once
bun run test:watch  # run Vitest in watch mode
bun run generate:refs # regenerate typed cross-entity refs from entity registries
bun run generate:social-images # generate all content-addressed 1200x630 social cards
bun run typecheck   # run TypeScript without emitting files
bun run check       # type-check, lint, and check formatting
bun run verify      # full check, test, and build gate for code or data handoff
bun run build       # create the production bundle in dist/
bun run preview     # serve the production bundle locally
```

## Project structure

- `src/routes/` contains TanStack Router file routes.
- `src/components/` contains the campaign shell and shared entity views.
- `src/definitions/` contains strict Zod schemas for campaign data.
- `src/data/` contains the campaign canon and typed cross-entity references.
- `src/lib/campaign.ts` resolves references and derives search, navigation, timelines, and reverse
  links.
- `QUESTIONS.md` records unresolved campaign-canon questions.

Entity names derive their URL slugs. Cross-entity relationships use inert `refs.*` tokens so data
files do not import one another and create module cycles. When adding, removing, renaming, or
re-keying an entity, update its data file and kind registry, then run `bun run generate:refs`.
The dev server and production build also regenerate refs automatically; dev watches the registries
for live updates. The generated file lives under `src/data/generated/`, and the verification gate
checks that it is current and that all references resolve.

## Working with Codex

`AGENTS.md` is the canonical repository-wide guide. It points campaign-data work to the more
specific `src/data/AGENTS.md`; keep durable policy in those files rather than copying it into
tool-specific prompts.

The repository also provides focused, progressively loaded workflows:

- `$plan-campaign-entity` for planning or implementing reference-first campaign-data changes.
- `$review-ui-architecture` for evidence-backed React architecture reviews and authorized
  structural refactors.

For code or data changes, the expected handoff gate is:

```bash
bun run verify
```

## Deployment

Netlify runs `bun run build` and publishes `dist/client/`. The build derives one 293-page public
manifest from the campaign registries, prerenders complete HTML for every entry, creates its
canonical metadata and structured data, generates a content-addressed social card, and audits the
finished output. The generated social cards, redirects, robots file, 404 fallback, and social-image
path module are deploy artifacts and are intentionally not committed.

TanStack Start's Netlify adapter supplies hydrated server handling without an SPA catch-all. The
generated redirects serve extensionless public URLs from their matching static HTML files, while
`/locations` permanently redirects to `/locations/map` and unknown URLs use the real 404 fallback.
