# The Lost Hope

A player-first memory and lore companion for a homebrew D&D 5e game. It presents campaign lore,
characters, beasts, locations, organizations, quests, sessions, and a linked event timeline as a
static client-side application, with the intention of eventually sharing it with the other players
and the DM.

The project is reference-first: each fact has one canonical owner and other records link to it.
Quests may synthesize a small amount of repeated context, but do not become a competing source of
canon. See [the product goals](docs/product-goals.md) for the complete intent and scope.

## Development

The project uses Bun, React 19, TypeScript, Vite, TanStack Router, Tailwind CSS, Zod, Vitest,
Oxlint, and Oxfmt.

```bash
bun install
bun run dev
```

The development server listens on <http://localhost:3000>.

Useful commands:

```bash
bun run test        # run Vitest once
bun run test:watch  # run Vitest in watch mode
bun run typecheck   # run TypeScript without emitting files
bun run check       # type-check, lint, and check formatting
bun run verify      # check, test, and build exactly as an agent should before handoff
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
files do not import one another and create module cycles. When adding an entity, update its data
file, kind registry, and `src/data/registry-keys.ts`; the tests verify those registries and all
references.

## Working with Codex

Codex reads `AGENTS.md` for repository-wide commands and conventions, then applies the more
specific `src/data/AGENTS.md` rules for campaign data. The repo-level
`$plan-campaign-entity` skill handles entity discovery, disambiguation, planning, wiring, and
validation.

For code or data changes, the expected handoff gate is:

```bash
bun run verify
```

## Deployment

Netlify runs `bun run build`, publishes `dist/`, and redirects application routes to `index.html`
for client-side routing.
