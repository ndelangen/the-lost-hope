# Campaign, icon, and framework JavaScript audit

Research date: 2026-08-14

Baseline: `origin/main` at `a92dcca4417b01529cf2e902a5c69e0c5cfd9e56`

Question: Wayfinder ticket **Measure campaign, icon, and framework JavaScript entering representative routes**

## Executive answer

The suspicion is correct, and the largest problem is sharper than “we use many icons.” Every
normal public route currently downloads **the entire 4,040-export Game Icons barrel**. It accounts
for 6,749,180 of the 7,500,594 source-mapped minified bytes in the shared entry (89.98%). The
catalogue page itself remains lazy; its 8.3 MB generated catalogue and full Lucide/Iconify payloads
are not initial JavaScript for a normal page.

The cause is an import-graph collision:

1. The root renders `CampaignShell` on every route
   ([`src/routes/__root.tsx`](../../src/routes/__root.tsx#L22-L27)).
2. Its sidebar statically imports the exhaustive `EntityReference` adapter and uses it for session
   and event navigation ([`src/components/campaign-shell/sidebar.tsx`](../../src/components/campaign-shell/sidebar.tsx#L14-L16),
   [`src/components/campaign-shell/sidebar.tsx`](../../src/components/campaign-shell/sidebar.tsx#L134-L180)).
3. `EntityReference` statically imports all six curated icon registries
   ([`src/components/entity-reference.tsx`](../../src/components/entity-reference.tsx#L26-L32)). Those
   registries statically select 166 distinct Game Icons (191 distinct catalogue IDs across all
   sources), so a tree-shaken Game Icons subset legitimately belongs to the current shell.
4. The split `/_icons` component also performs
   `import('react-icons/gi').then(module => module.GiEskimo)`
   ([`src/components/icon-catalog-glyph.tsx`](../../src/components/icon-catalog-glyph.tsx#L89-L104)).
   The production output then contains names such as `Gi3dGlasses`, `GiAk47`, and `GiZigArrow`
   despite none being selected by a normal page. Because the same `react-icons/gi` module is needed
   synchronously by the shell and as a lazy module namespace by the catalogue, Rollup retains the
   whole barrel in the shared entry.

A controlled one-line isolation proved causation: replacing only that lazy namespace import with a
static named `GiEskimo` import reduced the shared entry from **7,500,551 raw / 2,972,261 gzip bytes**
to **1,011,458 raw / 339,901 gzip bytes**. All 350 pages still prerendered. The experiment was
reverted; this note is the only repository change.

## Reproduction

Install and build the exact baseline:

```sh
git rev-parse HEAD
bun install --frozen-lockfile
bun run build
```

The build reported 350 prerendered pages and the following client chunks. Exact transfer totals
below use Bun's `gzipSync(contents, { level: 9 })`, matching the measurement harness on PR #95.

Generate source maps only for attribution (the 43-byte source-map comments are excluded from the
production transfer table):

```sh
bunx vite build --sourcemap
bunx source-map-explorer dist/client/assets/index-B2_RGDnw.js \
  --json --no-border-checks > /tmp/lost-hope-entry-analysis.json
```

To enumerate initial JavaScript exactly as the spike does, collect every unique `.js` URL in
`src` or `href` attributes of the prerendered HTML, gzip each file separately at level 9, and sum
the results. This includes route `modulepreload` links, not merely the one `<script>` element.

The catalogue inventory is derived directly from `src/icon-catalog/catalog.json`; its generator
constructs entries from Lucide, Font Awesome, Game Icons, and custom seeds
([`scripts/generate-icon-catalog.ts`](../../scripts/generate-icon-catalog.ts#L347-L374)).

## Current-main route transfer

Every representative route has the same 7,500,551-byte shared entry. Route-specific preloads add
only a few kilobytes except for `/questions`.

| Cold route        | Referenced JS files | Raw bytes | Gzip-9 bytes | Shared-entry share of gzip |
| ----------------- | ------------------: | --------: | -----------: | -------------------------: |
| `/`               |                   8 | 7,511,128 |    2,976,323 |                     99.86% |
| `/events`         |                   3 | 7,507,762 |    2,975,330 |                     99.90% |
| `/pcs/detail/jim` |                  13 | 7,523,508 |    2,982,706 |                     99.65% |
| `/locations/map`  |                   5 | 7,509,491 |    2,976,126 |                     99.87% |
| `/locations/list` |                   5 | 7,509,492 |    2,976,127 |                     99.87% |
| `/questions`      |                   5 | 7,699,445 |    3,035,165 |                     97.93% |

The route HTML confirms `index-B2_RGDnw.js` is a module preload and the executable script on every
sample. `/events`, for example, additionally preloads only its 7,098-byte route module and a
113-byte reference module.

### Feature and interaction coverage

The inspected search, atlas, correction, and portrait interactions do not currently load additional
JavaScript when activated. Their code is already referenced by the route HTML:

| Feature / representative route            |                              JavaScript referenced before interaction |                                    Additional JavaScript on interaction | Causal ownership                                                                                                                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------: | ----------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Campaign search on every normal route     |                                                          Shared entry |                                                                       0 | `CampaignShell` statically imports `CampaignSearch`, which statically imports `searchEntities` and the full campaign module. Typing or pressing Command/Ctrl-K only reveals already-loaded UI. |
| Atlas filters on `/locations/map`         |                  8,940 raw / 3,862 gzip bytes beyond the shared entry |                                                                       0 | The HTML preloads the map route, `locations-index`, segmented-control, and list-icon chunks. Filter and map/list controls execute those preloaded modules.                                     |
| Correction panel on `/pcs/detail/jim`     |          8,705 raw / 4,195 gzip bytes of correction-specific preloads |                                                                       0 | The detail route statically imports `EntityCorrectionSubmission`; its form, submission, and Lucide support chunks are module-preloaded before the panel expands.                               |
| Portrait dialog on `/pcs/detail/jim`      | 3,547 raw / 1,566 gzip bytes for `avatar-viewer` plus its expand icon |                                                                       0 | The detail route statically imports `AvatarViewer`; opening the dialog only changes component state.                                                                                           |
| Questions/correction page at `/questions` |               198,894 raw / 62,899 gzip bytes beyond the shared entry |                                                                       0 | The page, correction submission, message icon, and shield icon chunks are all module-preloaded.                                                                                                |
| Internal catalogue `/_icons`              |                        No catalogue chunks in normal prerendered HTML | Catalogue chunk on navigation; Iconify JSON after Game Icon cards mount | The route is client-only and split, but its legacy Game Icons namespace edge poisons the otherwise shared Game Icons module as described below.                                                |

These are transfer-graph observations, not recommendations to preserve eager loading. A
feature-preserving production design may move some interaction code behind reliable lazy boundaries;
the delivery budget must then count the bytes when the visitor actually invokes the feature.

## Precise shared-entry attribution

The following figures are generated-code byte spans assigned by the production source map. They
are exact minified raw-byte attribution, not source file sizes. Gzip is deliberately reported only
for whole chunks and the controlled counterfactual because compression dictionaries cross module
boundaries; per-module gzip numbers would not add up honestly.

| Shared-entry source category                            | Mapped minified bytes | Entry share |
| ------------------------------------------------------- | --------------------: | ----------: |
| Game Icons (`react-icons/gi/index.mjs`)                 |             6,749,180 |      89.98% |
| Framework and other libraries                           |               419,423 |       5.59% |
| Campaign data (`src/data/**`, including generated refs) |               184,737 |       2.46% |
| Application code excluding icon registries              |                71,325 |       0.95% |
| Generated public/social route data                      |                45,152 |       0.60% |
| Lucide components                                       |                10,351 |       0.14% |
| Font Awesome React components                           |                 9,503 |       0.13% |
| Six application icon registries                         |                 5,894 |       0.08% |
| `react-icons` runtime                                   |                 2,438 |       0.03% |
| Unmapped/build glue                                     |                 1,930 |       0.03% |
| Custom icon (`LongRest`)                                |                   661 |       0.01% |
| **Total**                                               |         **7,500,594** |    **100%** |

The source-map build total is 43 bytes larger than the production entry because it appends a source
map URL. The production entry is 7,500,551 raw bytes and 2,972,261 gzip-9 bytes.

“Framework and other libraries” is not guesswork by subtraction: it is the sum of all mapped
`node_modules` sources except `react-icons` and `lucide-react`. Its largest member is the React DOM
client at 177,077 mapped bytes; TanStack Router/Start, Zod, Seroval, Tailwind Merge, React, and other
runtime dependencies make up the rest.

### What remains after the Game Icons barrel is tree-shaken

The controlled isolation retained every existing curated registry and altered only the `GiEskimo`
loading expression on `/_icons`. Its 1,011,501-byte source-map build attributed:

| Category after isolation                   | Mapped minified bytes | New-entry share |
| ------------------------------------------ | --------------------: | --------------: |
| Framework and other libraries              |               419,373 |          41.46% |
| Curated Game Icons subset                  |               260,437 |          25.75% |
| Campaign data                              |               184,737 |          18.26% |
| Application code excluding icon registries |                71,059 |           7.03% |
| Generated public/social route data         |                45,151 |           4.46% |
| Lucide components                          |                10,351 |           1.02% |
| Font Awesome React components              |                 9,503 |           0.94% |
| Application icon registries                |                 5,864 |           0.58% |
| `react-icons` runtime                      |                 2,438 |           0.24% |
| Unmapped/build glue                        |                 1,930 |           0.19% |
| Custom icon                                |                   658 |           0.07% |

Thus, simply restoring tree-shaking changes the production shared entry by:

| Controlled result                           | Raw bytes | Gzip-9 bytes |  Reduction |
| ------------------------------------------- | --------: | -----------: | ---------: |
| Current main entry                          | 7,500,551 |    2,972,261 |          — |
| Same code with namespace collision isolated | 1,011,458 |      339,901 | 88.6% gzip |
| Current-main `/events` total                | 7,507,762 |    2,975,330 |          — |
| Counterfactual `/events` total              | 1,018,669 |      342,970 | 88.5% gzip |

This is not a proposed production patch. It is an attribution experiment that proves the causal
edge and establishes the upper bound available from fixing it without changing feature ownership.

## Initial versus lazy icon JavaScript

The generated catalogue contains 7,289 entries: 4,040 Game Icons, 1,637 Lucide icons, 1,611 Font
Awesome icons, and one custom icon. Repository size is irrelevant to delivery; their network paths
are materially different.

| Payload                       | When fetched                                   |       Raw bytes |    Gzip-9 / build gzip | Attribution                                                                                                                                   |
| ----------------------------- | ---------------------------------------------- | --------------: | ---------------------: | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared entry                  | Every normal cold route                        |       7,500,551 |              2,972,261 | Entire Game Icons React barrel plus shell, campaign, framework, curated icons                                                                 |
| `/_icons` component chunk     | Only after client navigation to `/_icons`      |       6,240,435 |   729.20 kB build gzip | 5,765,417 bytes of minified catalogue JSON; 456,421 mapped bytes of the complete Lucide set; catalogue UI                                     |
| Iconify Game Icons JSON chunk | After a Game Icon card mounts on `/_icons`     |       6,430,179 | 2,736.82 kB build gzip | `@iconify-json/game-icons/icons.json` loaded by the effect at [`icon-catalog-glyph.tsx`](../../src/components/icon-catalog-glyph.tsx#L62-L84) |
| Font Awesome sprite assets    | SVG request when a catalogue FA glyph is shown | 1,235,050 total |         Not JavaScript | Three public SVG sprites; normal React FA icons do not use these sprites                                                                      |

The `/_icons` route explicitly imports the catalogue JSON, computes its search index, opts out of
SSR, and is marked `noindex`
([`src/routes/[_]icons.tsx`](../../src/routes/[_]icons.tsx#L8-L42)). Its component is correctly split
from normal initial route HTML. The catalogue JSON and full Lucide/Iconify sets therefore do **not**
explain normal-page initial transfer. The one `react-icons/gi` namespace edge inside that lazy
component does.

Lucide behaves as expected on normal routes: named imports tree-shake to 10,351 mapped bytes in the
shared entry. Font Awesome also retains only 9,503 component bytes. Game Icons falls from 6,749,180
to 260,437 mapped bytes when the namespace collision is isolated, showing that the package's named
imports can tree-shake too.

## Why normal routes can reach all curated icons

This part is intentional, separate from the 4,040-icon accident. The shell is global
([`src/components/campaign-shell.tsx`](../../src/components/campaign-shell.tsx#L77-L101)); its sidebar
renders rich hover-preview references; and the reference adapter is exhaustive over entity kinds.
That adapter imports event, item, location, organization, quest, and session registries together.
Those registries hold 191 distinct catalogue IDs (166 Game Icons, 13 Font Awesome, 11 Lucide, one
custom). Consequently a cold route can render any entity preview reachable from the sidebar without
another request, but it pays for every curated registry even when the current viewport shows only a
few icons.

Campaign search independently keeps the canonical graph in the shell: `CampaignShell` imports both
the campaign object and `CampaignSearch`
([`src/components/campaign-shell.tsx`](../../src/components/campaign-shell.tsx#L5-L10)), and search
calls `searchEntities` from the full campaign module. That explains the 184,737 mapped campaign-data
bytes remaining after icon tree-shaking. Icons and canon are therefore two distinct initial-entry
costs with a shared architectural source: an exhaustive hydrated shell.

## What this changes about PR #95's result

PR #95 measured `/events` falling from 2,969,081 to 199,764 referenced gzip bytes after placing the
canon-dependent route body behind a never-hydrated split boundary. That result is real, but it does
not isolate campaign data alone: the route body also reaches `EntityReference`, which reaches all
six icon registries. Moving it out of the loaded graph removes both canon and the poisoned Game
Icons barrel.

Against current main, fixing only the icon namespace collision would put `/events` at 342,970
gzip-9 bytes. PR #95's 199,764 bytes is a further 143,206-byte reduction (41.8% from the icon-fixed
counterfactual). Therefore:

- the prototype still proves static route bodies can shed meaningful canon/application JavaScript;
- the headline 93.3% reduction mostly reflects eliminating the full Game Icons barrel, not merely
  keeping campaign references at build time; and
- production work should fix and measure the icon collision first, then re-baseline selective
  hydration rather than treating 2.97 MB as a canon-only baseline.

The PR's own research note and measurement harness are the source for its numbers:
[`docs/research/minimal-javascript-spike.md`](https://github.com/ndelangen/the-lost-hope/blob/13227e400384f1f86fb90e80a821d2d091f8aa07/docs/research/minimal-javascript-spike.md)
and
[`scripts/prototype-minimal-js.ts`](https://github.com/ndelangen/the-lost-hope/blob/13227e400384f1f86fb90e80a821d2d091f8aa07/scripts/prototype-minimal-js.ts).

## Production constraints and decisions exposed

1. **Remove namespace imports from shared icon barrels.** A build guard should fail if normal-route
   output retains an unapproved percentage of `react-icons/gi`, rather than relying only on the
   total chunk warning.
2. **Keep `/_icons` operationally isolated.** It is a private review tool with a 5.77 MB minified
   catalogue object and complete icon sets. A separate build entry/tool deployment would prevent
   future catalogue changes from perturbing public chunks, even when a new import defeats
   tree-shaking.
3. **Decide how much of the curated registry belongs in the initial shell.** After the accidental
   barrel is fixed, curated Game Icons remain 260,437 mapped raw bytes. Per-entity SVG/static markup,
   per-family chunks, or route/static-boundary ownership can reduce that, but each option must
   preserve sidebar previews and entity reference rendering.
4. **Re-baseline canon independently.** Campaign data remains 184,737 mapped raw bytes after the
   icon fix, plus application code that derives search and previews. The static-route design and a
   compact client search/sidebar projection should be judged from the 340 kB gzip entry, not the
   current 2.97 MB entry.
5. **Measure lazy tools separately from visitor delivery.** Loading `/_icons` intentionally costs
   about 3.47 MB additional gzip across its component and Iconify chunks. It is not a normal visitor
   cost unless linked/prefetched or its modules become shared again.

## Conclusion

There are three layers, not one:

- **Accidental initial cost:** the full Game Icons barrel, about 2.63 MB gzip removable while
  preserving current features.
- **Intentional hydrated-shell cost:** curated icons, campaign/search projections, framework, and
  shell code, about 340 kB gzip after the controlled icon isolation.
- **Intentional lazy tooling cost:** the full catalogue, Lucide gallery, and Iconify Game Icons data,
  fetched only on `/_icons`.

Fixing the accidental barrel first is the highest-confidence action. Selective hydration remains a
valid second solution for canon and rich-reference delivery, but its next measurement must start
from an icon-correct baseline.
