# Icon catalog

The catalog is the project's source of truth for choosing icons. It covers every canonical Lucide
icon, every Font Awesome 5 and Game Icons export available through `react-icons`, and project-owned
custom icons.

## Find an icon

Search by intent rather than browsing package exports:

```sh
bun run icons:search -- "dragon fire"
bun run icons:search -- "arrow left" --source=lucide
bun run icons:search -- "modern weapon" --all
```

The command uses the same typo-tolerant fuzzy index as the page. It searches labels, identifiers,
aliases, associated terms, descriptions, categories, upstream tags, and possible uses. It searches
`useful` entries by default. Use `--all` when auditing the catalog.

The same data is viewable at `/_icons`, where every match is rendered in the three review sections
and its identifier can be inspected and copied. Search text, review group, source, and category are
stored in the URL so a filtered catalog view can be shared or revisited. The page virtualizes its
fixed-height grid: every result remains in one continuous scroll, but only nearby rows are mounted.
Game Icons render data is loaded only when a Game Icons row becomes visible.

## Apply review decisions

Hover over a catalog card and press `U`, `Q`, or `D` (or choose the matching button). The shortcuts
are ignored while typing in a search or select control. Those choices build three in-memory lists.
The page's **Copy command** button produces a command like:

```sh
bun run icons:classify -- --useful='gi/GiDragonHead,lucide/ArrowLeft' \
  --questionable='fa/FaFlask' --delete='fa/FaFacebook'
```

The parameters accept comma-separated catalog IDs. `--delete` marks entries for deletion review;
it does not delete icon files. The command writes durable decisions to `overrides.json` and
regenerates `catalog.json`. Add `--dry-run` to validate a command without changing files.

## Files and maintenance

- `catalog.json` is generated. Do not edit it by hand.
- `metadata.ts` owns the shared taxonomy and initial classification rules.
- Each generated entry stores concise `associatedTerms` separately from its complete search
  `keywords`, so the most helpful related concepts can be shown directly on the card.
- `overrides.json` owns deliberate per-icon review decisions and metadata corrections.
- `upstream/` stores the condensed, pinned source metadata used during generation.
- `search.ts` is the shared ranked-search implementation used by the page and CLI.
- `src/lib/custom-icons.tsx` owns custom renderers and their required metadata.

After adding or changing an icon, run `bun run generate:icons`. `bun run verify` checks that the
generated catalog is current.

To preserve a manual review decision across regeneration, add an entry to `overrides.json`:

```json
{
  "gi/GiExample": {
    "classification": "questionable",
    "classificationReason": "Needs visual review for setting fit.",
    "useCases": ["A specific campaign concept"]
  }
}
```

`useful` means recommended for selection, `questionable` means visually or contextually review it,
and `marked-for-deletion` means retain it in the review view but do not choose it without a
deliberate decision.
