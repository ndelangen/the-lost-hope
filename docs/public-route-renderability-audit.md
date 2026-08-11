# Public route static-renderability audit

Audited against commit `79274f79cb15970703faf287c828d319aaae0e91` on 11 August 2026.

## Recommendation

The campaign can be emitted as content-complete static HTML without changing its canonical URL
design. All public page data is imported synchronously from repository-owned registries; there are
no route loaders, remote page queries, or user-specific facts in the primary lore. Build one pure
public-route manifest from those registries, use that same manifest for prerendering, metadata,
social-card generation, sitemap generation, and coverage tests, and hydrate the result for the
existing interactions.

At the audited commit the manifest contains **293 canonical content URLs**: 13 static pages and 280
entity-detail pages. `/locations` is a behavior-preserving redirect alias to `/locations/map`, not a
separate canonical content page. The internal `/_icons` route and the correction-submission function
are not public pages.

This is not currently a static-HTML site. The production build emits one 813-byte `index.html` whose
`#app` element is empty, and the Netlify catch-all returns it with status 200 for known pages,
unknown slugs, and unknown paths alike. The source of that behavior is the empty app mount in
[`index.html`](../index.html#L20-L22), the browser-only mount in
[`src/main.tsx`](../src/main.tsx#L18-L23), and the catch-all rewrite in
[`netlify.toml`](../netlify.toml#L5-L8).

## Exhaustive route inventory

### Static public content URLs

These are the complete non-parameterized content pages in the generated route tree
([`src/routeTree.gen.ts`](../src/routeTree.gen.ts#L172-L197)):

| Canonical URL     | Initial content                                                                       | Build treatment                      |
| ----------------- | ------------------------------------------------------------------------------------- | ------------------------------------ |
| `/`               | Campaign overview, current story state, open quests, party, collection links          | Emit and index                       |
| `/intro`          | Campaign introduction, pitch, and house rules                                         | Emit and index                       |
| `/questions`      | Public access-code landing page; protected questions appear only after browser unlock | Emit and index the locked shell only |
| `/beasts`         | Beast catalogue                                                                       | Emit and index                       |
| `/events`         | Full campaign timeline                                                                | Emit and index                       |
| `/items`          | Item catalogue                                                                        | Emit and index                       |
| `/npcs`           | NPC catalogue                                                                         | Emit and index                       |
| `/organizations`  | Organization catalogue                                                                | Emit and index                       |
| `/pcs`            | Current and historical PC roster                                                      | Emit and index                       |
| `/quests`         | Open, committed, and resolved quest catalogue                                         | Emit and index                       |
| `/sessions`       | Session calendar                                                                      | Emit and index                       |
| `/locations/map`  | World-atlas map view                                                                  | Emit and index                       |
| `/locations/list` | World-atlas tree view                                                                 | Emit and index                       |

`/locations` is also a current player-facing address, but its route intentionally redirects to
`/locations/map` ([`src/routes/locations/index.tsx`](../src/routes/locations/index.tsx#L1-L7)).
Preserve it as an explicit permanent host redirect and omit it from the sitemap. Acceptance checks
should distinguish canonical content URLs (direct 200) from this redirect alias (3xx to a direct
200); treating it as another document would create duplicate content.

The index-route source files contain trailing slashes in their generated full paths, while the
router's public `to` paths and all shared collection links omit them
([`src/routeTree.gen.ts`](../src/routeTree.gen.ts#L198-L224),
[`src/lib/campaign.ts`](../src/lib/campaign.ts#L234-L268)). Treat the no-trailing-slash spelling in
the table as canonical, choose one host-level normalization policy for slash variants, and assert
that every variant resolves to the canonical URL rather than emitting duplicate pages.

### Dynamic public content URLs

The exact dynamic URL set is:

```text
for each kind in COLLECTIONS:
  for each entity in allEntities(kind):
    /{COLLECTION_PATH[kind]}/detail/{entity.slug}
```

This is an exhaustive enumeration, not a pattern that permits arbitrary slugs. `COLLECTIONS` and
`COLLECTION_PATH` exhaust the nine entity kinds
([`src/lib/campaign.ts`](../src/lib/campaign.ts#L50-L84)); `allEntities` reads the canonical
campaign model ([`src/lib/campaign.ts`](../src/lib/campaign.ts#L86-L92),
[`src/lib/campaign.ts`](../src/lib/campaign.ts#L292-L297)); and that model is built from the nine
repository registries ([`src/lib/campaign-registries.ts`](../src/lib/campaign-registries.ts#L1-L24)).
The detail-path mapping preserves every deliberate `/detail/` URL
([`src/lib/campaign.ts`](../src/lib/campaign.ts#L246-L289)).

The audited registry snapshot is:

| Kind         | Canonical registry                 | Detail URL shape               |   Count |
| ------------ | ---------------------------------- | ------------------------------ | ------: |
| Session      | `src/data/sessions/_index.ts`      | `/sessions/detail/{slug}`      |      12 |
| Event        | `src/data/events/_index.ts`        | `/events/detail/{slug}`        |     122 |
| Location     | `src/data/locations/_index.ts`     | `/locations/detail/{slug}`     |      49 |
| NPC          | `src/data/npcs/_index.ts`          | `/npcs/detail/{slug}`          |      40 |
| Beast        | `src/data/beasts/_index.ts`        | `/beasts/detail/{slug}`        |      10 |
| PC           | `src/data/pcs/_index.ts`           | `/pcs/detail/{slug}`           |      10 |
| Quest        | `src/data/quests/_index.ts`        | `/quests/detail/{slug}`        |      18 |
| Organization | `src/data/organizations/_index.ts` | `/organizations/detail/{slug}` |       5 |
| Item         | `src/data/items/_index.ts`         | `/items/detail/{slug}`         |      14 |
| **Total**    |                                    |                                | **280** |

Do not duplicate those 280 slugs in a manually maintained list. The project requires one canonical
owner per fact ([`docs/product-goals.md`](product-goals.md#L28-L36)); a copied list would drift as
campaign data changes. The generated manifest must snapshot the resulting 293 URLs and fail its
test if a registry entity is missing, duplicated, or produces a URL outside the approved detail
shape.

### URL states that are not pages

- Location `?filter=` values are interactive projections of `/locations/map` and
  `/locations/list`, not documents to prerender. There are nine filter dimensions and arbitrary
  comma-separated input, so enumerating them would create duplicate or malformed crawl targets.
  Keep the base view canonical; preserve the query in browser navigation only. The current parser
  and serializer live in [`src/lib/locations-search.ts`](../src/lib/locations-search.ts#L1-L30).
- Event `#session-{slug}` values are in-document anchors on `/events`, not separate HTTP resources.
  The hash behavior is implemented as progressive scroll enhancement in
  [`src/components/events-timeline-hash.ts`](../src/components/events-timeline-hash.ts#L1-L24).
- The icon-catalog search parameters belong to the excluded internal route.

## Excluded routes and content boundaries

### `/_icons`

`/_icons` is the only internal UI route. It is a developer classification tool with clipboard,
keyboard, filtering, and virtual-grid behavior
([`src/routes/[_]icons.tsx`](../src/routes/[_]icons.tsx#L24-L37),
[`src/routes/[_]icons.tsx`](../src/routes/[_]icons.tsx#L138-L193)). It must not appear in the public
manifest, sitemap, structured data, or social-card output. Because the generic SPA fallback is to
be removed, production should return 404 for this path unless a later decision deliberately keeps
the tool deployed; `robots.txt` alone is not an access boundary.

The route also materially affects production payloads even when not linked. The audited client
build included a 6.24 MB minified `___icons` route chunk and a 6.43 MB icon-data chunk. Static-route
work should keep internal tooling out of the public production graph if the chosen build system can
do so without sacrificing the developer route.

### Correction submission

`/.netlify/functions/submit-correction` is a backend endpoint, not a crawlable page. Entity-detail
pages render primary lore independently of it. Their correction UI begins in `checking` state and
renders nothing until a browser effect validates remembered access
([`src/lib/correction-access.ts`](../src/lib/correction-access.ts#L23-L69),
[`src/components/entity-correction-submission.tsx`](../src/components/entity-correction-submission.tsx#L20-L29)).
That is a safe static boundary: prerender lore, never access codes or unlocked correction state.

`/questions` similarly prerenders only its locked landing form. The protected question list is a
browser-unlocked state ([`src/components/questions-page.tsx`](../src/components/questions-page.tsx#L17-L67)).
The page is readable but cannot unlock or submit without JavaScript. If “useful without JavaScript”
is intended to include correction workflows rather than primary campaign content, this route needs
a normal server-handled form path; otherwise document it as an interaction-only exception.

No current route models DM-only or private-character data. If either is added later, it must be
absent from the public registry/manifest rather than hidden after its HTML has been generated.

## Static renderability by page family

| Family             | Canonical inputs                                                         | Primary HTML without browser APIs                                     | Enhancement-only behavior                        |
| ------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------ |
| Home               | `campaign`, sorted sessions/events, open quests, active PCs, collections | Yes after shared-shell fix                                            | Search, keyboard shortcut                        |
| Intro              | `campaign.notes`, `pitch`, `houseRules`                                  | Yes                                                                   | None required                                    |
| Generic catalogues | `entityCollectionItems(kind)` over registries                            | Yes                                                                   | Link hover previews                              |
| PCs                | Active/non-active PC derivations                                         | Yes                                                                   | Portrait/link hover behavior                     |
| Events             | Session timeline derivations                                             | Yes; layout geometry is pure                                          | Hash synchronization and scroll restoration      |
| Locations map      | Location registry, coordinates, selected type query                      | Yes for default pins and links                                        | Type filters and view switch                     |
| Locations list     | Location tree derivation                                                 | Partly: default-expanded levels render; deeper disclosure requires JS | Search, filters, expand/collapse, view switch    |
| Quests             | Quest catalogue derivation                                               | Yes                                                                   | Link hover previews                              |
| Sessions           | Session registry and calendar builder                                    | Yes after date determinism fix                                        | Link hover previews                              |
| Entity details     | `getEntity(kind, slug)` plus pure related-data builders                  | Yes after shared-shell and asset fixes                                | Correction form, portrait dialog, hover previews |
| Questions          | Raw `QUESTIONS.md`, but gated in browser                                 | Locked landing only                                                   | Access validation and submissions                |

The key enabling fact is that detail routes synchronously call `getEntity` and render repository
data—for example the beast route
([`src/routes/beasts/detail.$slug.tsx`](../src/routes/beasts/detail.$slug.tsx#L13-L45)) and session
route ([`src/routes/sessions/detail.$slug.tsx`](../src/routes/sessions/detail.$slug.tsx#L14-L77)).
No page route defines a loader. Browser APIs are concentrated in shared shell and interaction
components, not in canonical data derivation.

## Blockers and required boundaries

### 1. Add a real server/prerender entry and hydrate it

The current entry calls `createRoot` only when `#app` is empty. If a build merely injects HTML,
[`src/main.tsx`](../src/main.tsx#L18-L23) does nothing and every interaction stays inert. Replace the
duplicate router setup in `main.tsx` with the existing per-instance router factory
([`src/router.tsx`](../src/router.tsx#L1-L20)), then use `hydrateRoot` when prerendered markup exists.
The server/prerender side must create a fresh router per URL, load that URL, and render the same
route tree. Keep `createRoot` only for an intentional development fallback, if one remains.

All route content is build-local, so no general data-fetching or serialized loader-data layer is
needed at present. Do not introduce one speculatively.

### 2. Make the shared shell server-safe and hydration-deterministic

`useTheme` reads `window.matchMedia` in a render-time state initializer, which throws in a server
runtime ([`src/components/campaign-shell/theme.ts`](../src/components/campaign-shell/theme.ts#L32-L38)).
Give server and first client render the same deterministic theme state, then adopt persisted/system
preference after hydration. The small inline head script may still apply the early root class to
avoid a flash, but the React-visible toggle state must agree during hydration.

The sidebar persistence hooks catch missing `localStorage` on the server, but the first browser
render can use a different stored expansion/collapse state
([`src/components/campaign-shell/storage.ts`](../src/components/campaign-shell/storage.ts#L3-L13),
[`src/components/campaign-shell/storage.ts`](../src/components/campaign-shell/storage.ts#L33-L71)).
Initialize both sides from the route-derived fallback and restore storage in an effect. This keeps
the initial HTML stable and retains preferences after hydration.

Other browser uses are already effect- or event-bound: portrait portals, hover previews, campaign
search, event hash synchronization, and correction access do not execute while rendering their
closed/default state. They may warn about `useLayoutEffect` under a raw React server renderer, so
the chosen renderer must either support the pattern or those hooks should use an isomorphic layout
effect; they are not data blockers.

### 3. Normalize date-only rendering

Session data uses `new Date('YYYY-MM-DD')`, which represents UTC midnight
([`src/data/sessions/arrival-in-fajanet.ts`](../src/data/sessions/arrival-in-fajanet.ts#L5-L9)).
Several visible render paths use environment-default locale and local-time getters, including the
home page, session detail, reference previews, and calendar builder
([`src/routes/sessions/detail.$slug.tsx`](../src/routes/sessions/detail.$slug.tsx#L36-L44),
[`src/components/entity-reference.tsx`](../src/components/entity-reference.tsx#L200-L215),
[`src/lib/session-calendar.ts`](../src/lib/session-calendar.ts#L35-L45)). A Netlify build timezone,
browser timezone, or browser locale can therefore change the text or even the calendar day and
cause hydration mismatches.

Treat session dates as date-only values at the presentation boundary: use explicit locale and UTC
getters/formatting (or migrate the domain field to a date-only representation in a separate atomic
change). One formatter should own all visible session dates and metadata.

### 4. Resolve asset gaps before claiming no-JavaScript or preview completeness

A recursive audit of campaign data found 42 unique URL values: 36 local asset URLs and 6 external
URLs. Only 7 local files exist; **29 local URLs are missing**. The missing set is:

```text
/assets/locations/badesh.png
/assets/locations/fairhaven.png
/assets/locations/fajanet-guildhall.png
/assets/locations/fajanet-tunnels.png
/assets/locations/fajanet.png
/assets/locations/forest-near-badesh.png
/assets/locations/holy-site-mountains.png
/assets/locations/mountain-top.png
/assets/locations/puzzle-room-mountain.png
/assets/locations/the-boat.png
/assets/locations/the-green-light.png
/assets/locations/the-mountain-cliff.png
/assets/locations/the-tavern.png
/assets/locations/the-trapdoor.png
/assets/npcs/abraham.png
/assets/npcs/angel-of-the-mountain.png
/assets/npcs/bob.png
/assets/npcs/displacer-beast.png
/assets/npcs/dragon-children.png
/assets/npcs/dragon-of-the-mountain.png
/assets/npcs/giant-spider.png
/assets/npcs/goblin-grass-keepers.png
/assets/npcs/light.png
/assets/npcs/mystery-girl.png
/assets/npcs/phoenix-chick.png
/assets/npcs/rare-animal-dealer.png
/assets/npcs/tavern-owner.png
/assets/npcs/the-father.png
/assets/pcs/revin.png
```

These paths are canonical data—for example the Badesh map
([`src/data/locations/badesh.ts`](../src/data/locations/badesh.ts#L8-L12)) and Abraham portrait
([`src/data/npcs/abraham.ts`](../src/data/npcs/abraham.ts#L3-L8))—but the only campaign images
tracked under `public/assets` are seven PC images. `LocationMapImage` replaces missing images only
after a browser `onError`, so no-JavaScript HTML displays a broken image instead of its fallback
([`src/components/map-placeholder.tsx`](../src/components/map-placeholder.tsx#L60-L83)).

Choose one atomic policy before preview generation: add the intended files, or replace missing URLs
with canonical placeholder/fallback values. Add a build test that walks every local media URL and
fails when the file is absent. Social cards must use verified local assets or deterministic
kind-specific artwork; they must not rely on runtime image errors. The one remote D&D Beyond
portrait should similarly be cached or receive a deterministic fallback if used in build-generated
cards.

Most fantasy icons are also loaded in a client effect: Game Icons initially render a placeholder
and import their SVG body after mount
([`src/components/icon-catalog-glyph.tsx`](../src/components/icon-catalog-glyph.tsx#L51-L83)).
That is acceptable for decorative page chrome, but the social-card generator needs a synchronous
build-time icon resolver.

### 5. Generate route-owned head data in the HTML file

There are no route head declarations. `index.html` owns only the generic title “The Lost Hope” and
contains no description, canonical link, Open Graph/Twitter fields, or structured data
([`index.html`](../index.html#L3-L18)). The public web manifest is still the generic “Create TanStack
App Sample,” and `robots.txt` currently allows every route without naming a sitemap
([`public/manifest.json`](../public/manifest.json#L1-L20),
[`public/robots.txt`](../public/robots.txt#L1-L3)).

Each public-manifest entry should carry or derive display-ready `title`, `description`, canonical
URL, structured-data kind, and social-image output path. Entity metadata must derive from the same
canonical entity object used by the page. Static pages need explicit builders, not one site-wide
fallback. Render these fields into each emitted HTML document; post-load DOM mutation is invisible
to many link-preview fetchers.

### 6. Replace the catch-all success response with real artifact and 404 semantics

Current preview evidence was identical for `/`, `/pcs`, `/pcs/detail/jim`,
`/pcs/detail/not-real`, and `/not-real`: each returned status 200, 813 bytes, the title “The Lost
Hope,” and an empty `#app`. The detail components do have an in-app `Entry not found` branch
([`src/components/entity-page.tsx`](../src/components/entity-page.tsx#L183-L190)), but it cannot set
the direct HTTP response and should not define which slugs exist.

Emit only registry-backed detail artifacts, add a useful static `404.html`, and remove or narrow the
200 catch-all. Direct requests for unknown routes and unknown entity slugs must return 404. Client
navigations can render the same not-found presentation, but host status behavior is authoritative
for crawlers. Keep `/locations` as the one explicit route redirect.

## Recommended manifest boundary

Create one pure module, for example `src/lib/public-route-manifest.ts`, whose output is serializable
and contains no React components or browser APIs:

```ts
type PublicRouteEntry = {
  path: string
  canonicalPath: string
  pageKind: 'home' | 'intro' | 'questions' | 'collection' | 'locations' | 'detail'
  indexable: boolean
  title: string
  description: string
  imagePath: string
  entity?: { kind: EntityKind; slug: string }
}

type PublicRedirect = {
  from: string
  to: string
  status: 301
}
```

The module should:

1. Declare the 13 static entries once.
2. Flat-map `COLLECTIONS` and `allEntities(kind)` into the 280 detail entries using
   `COLLECTION_PATH`/`entityHref`.
3. Export `/locations` separately as a redirect.
4. Omit internal routes and non-page endpoints by construction.
5. Reject duplicate paths, missing entities, and non-canonical slash/query/hash variants.

The build pipeline should consume the manifest in this order:

1. Validate registries, references, URLs, and local assets.
2. Generate deterministic metadata and social-card assets.
3. Prerender one content-complete HTML document per manifest entry.
4. Generate `sitemap.xml` and `robots.txt` from indexable entries.
5. Generate host redirect rules and `404.html` from the explicit redirect/not-found policy.
6. Build/hydrate the client application against the same router and route manifest.

Do not derive the manifest by scraping `routeTree.gen.ts`: it knows route patterns but cannot know
which slugs are valid, which routes are public, or which page metadata to derive. Do not let the
social-card generator independently rediscover entities either. The public-route manifest is the
shared projection; campaign registries remain the canonical source.

## Verification contract

Add automated checks that fail the build unless all of the following hold:

- Manifest counts equal 13 static plus every current entity in all nine registries; paths are
  unique and every detail path resolves back to the same entity.
- Every manifest URL emits an HTML artifact with a non-empty `<main>`/primary heading, ordinary
  internal links, route-specific title and description, one canonical URL, structured data, and
  absolute Open Graph/Twitter image URLs.
- Every social image exists, has the required dimensions/content type, and was derived from the
  same manifest entry.
- Every local content asset exists; remote assets have an explicit verified/fallback policy.
- `sitemap.xml` contains every indexable canonical content URL exactly once and excludes redirects,
  queries, fragments, `/_icons`, functions, and 404.
- `/locations` redirects to `/locations/map`; every canonical content URL returns 200 directly;
  unknown paths and unknown slugs return 404.
- A no-JavaScript parse of every page finds its primary readable content and crawlable links.
- Hydration produces no mismatches or console errors in representative pages from every family,
  including a detail page with an avatar, a Game Icon, a missing-data fallback, `/events`, both
  location views, `/sessions`, and the locked `/questions` page.
- Production Netlify fetches repeat the status, HTML, canonical, sitemap, robots, and social-image
  assertions after deployment.

The route manifest, asset validator, and HTML assertions should run inside `bun run verify`, so a
new campaign entity automatically becomes a required static page and preview rather than relying on
a maintainer to remember a separate SEO checklist.
