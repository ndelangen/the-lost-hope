# Static rendering architecture on Netlify

Status: decision recommendation  
Research date: 2026-08-11  
Wayfinder ticket: [Choose the static-rendering architecture on Netlify](https://github.com/ndelangen/the-lost-hope/issues/67)

## Decision

Adopt **TanStack Start with full build-time prerendering of an explicit public-route manifest**, keep Vite and TanStack Router, hydrate each generated document in React, and deploy through Netlify's official TanStack Start adapter.

This is a static-first architecture, not a runtime-SSR-first site and not a generic SPA shell:

- Every public content URL is an input to the build and emits its own complete HTML document.
- The browser hydrates that same document, preserving TanStack Router navigation and existing React interactions.
- One pure manifest derived from campaign registries owns the exhaustive set of public URLs and provides the common input for prerendering, sitemap generation, social-image generation, and completeness tests.
- The existing route shapes remain unchanged, including every deliberate `/detail/` segment.
- Netlify serves the generated documents from its CDN. Its runtime remains available only for the existing correction endpoint and explicitly non-public/client-only tools.
- A missing URL returns a real 404. The current site-wide rewrite to the homepage is removed.

TanStack Start is the right framework layer because it adds full-document rendering and build output around the TanStack Router model the repository already uses. Its current documentation describes Start as release-candidate software whose API is feature-complete and considered stable, while still warning that it can contain bugs. That maturity risk is real, but smaller and more containable here than maintaining a custom SSR and hydration stack. Pin the TanStack and Netlify adapter versions used by the migration and prove the exact build on a Netlify deploy preview before production.

## Repository evidence

### The current output is one empty SPA document

- [`src/main.tsx`](../../src/main.tsx) creates a browser router and mounts it with `createRoot`; it does not hydrate server-rendered markup.
- [`index.html`](../../index.html) contains only `<div id="app"></div>` plus a generic `The Lost Hope` title. Route content and route-specific head data are absent from the response body.
- [`netlify.toml`](../../netlify.toml) publishes `dist` and rewrites every path to `/index.html` with a `200`. Therefore a request for an entity URL receives the homepage shell, not an entity document.
- [`src/routes/__root.tsx`](../../src/routes/__root.tsx) renders only `CampaignShell`; it does not yet own an `<html>`, `<head>`, and `<body>` document or render TanStack Router's `HeadContent` and `Scripts` components.

### The app is already close to Start's application shape

- The repository uses Vite, React 19, TanStack Router's file-route plugin, and source-coded synchronous campaign data ([`package.json`](../../package.json)).
- [`src/router.tsx`](../../src/router.tsx) already exports a fresh-router factory, which is the request-safe shape required for server rendering. [`src/main.tsx`](../../src/main.tsx) is a second, browser-only router definition and should disappear in the atomic migration.
- The existing file routes, typed links, params, search validation, and route tree can stay. Start is built on TanStack Router rather than replacing it.
- Campaign URL construction is already centralized around nine entity kinds and the deliberate `/${collection}/detail/${slug}` shape in [`src/lib/campaign.ts`](../../src/lib/campaign.ts).

### All current content is available at build time

The campaign registries currently contain 280 detail records:

| Kind          | Records |
| ------------- | ------: |
| Sessions      |      12 |
| Events        |     122 |
| Locations     |      49 |
| NPCs          |      40 |
| Beasts        |      10 |
| PCs           |      10 |
| Quests        |      18 |
| Organizations |       5 |
| Items         |      14 |

Those records and all non-detail page content are imported from the repository. There is no content database or request-time content dependency. That makes complete static generation the natural production mode.

### The UI needs a bounded isomorphic-rendering pass

Most browser APIs are already used in effects or event handlers, but several initial renders are not deterministic:

- [`src/components/campaign-shell/theme.ts`](../../src/components/campaign-shell/theme.ts) reads `window.matchMedia` inside a `useState` initializer. That throws during server rendering.
- [`src/components/campaign-shell/storage.ts`](../../src/components/campaign-shell/storage.ts) reads `localStorage` in initializers. The server falls back, but a browser with stored sidebar state can produce different first-render markup and a hydration mismatch.
- Session dates are formatted with an implicit host locale in [`src/routes/index.tsx`](../../src/routes/index.tsx), [`src/routes/sessions/detail.$slug.tsx`](../../src/routes/sessions/detail.$slug.tsx), and [`src/components/entity-reference.tsx`](../../src/components/entity-reference.tsx). Build-machine and browser locales can produce different text.

These are migration tasks, not arguments against prerendering. Render a deterministic public baseline on the server and the first client pass, then apply browser preferences after hydration. Use explicit locale/time-zone formatting for canonical content. TanStack Start documents isomorphic-by-default execution, `ClientOnly`, and `useHydrated` specifically for this boundary.

## Target architecture

### 1. Start owns the document and hydration lifecycle

Replace the SPA bootstrap with TanStack Start's Vite plugin and document model:

- Add `@tanstack/react-start` and `@netlify/vite-plugin-tanstack-start`.
- Replace the standalone `tanstackRouter(...)` Vite plugin with `tanstackStart(...)`; retain the existing ref-generation, Tailwind, and React plugins in compatible order.
- Keep a single `getRouter()` factory in `src/router.tsx`.
- Make the root route render the full `<html lang="en">`, `<head>`, and `<body>` document, with `HeadContent`, the campaign shell/outlet, and `Scripts`.
- Move the existing pre-paint theme script into the Start-managed document head while making React's initial theme state deterministic.
- Remove the browser-only `src/main.tsx` and the old root `index.html` once the Start output is authoritative. Do not keep dual SPA and Start bootstraps.

TanStack Router's official head API deduplicates nested title/meta entries and requires `HeadContent` and `Scripts`. Route `head()` functions can therefore supply title, description, canonical link, Open Graph, Twitter, and structured-data hooks from the same route/entity descriptor used by the build.

### 2. A derived public-page manifest is the completeness boundary

Create one pure module that returns descriptors similar to:

```ts
type PublicPage = {
  path: string
  kind: 'home' | 'intro' | 'collection' | 'entity' | 'other'
  entity?: Entity
}
```

The exact descriptor will be settled with metadata and preview-image design, but its ownership is architectural:

- Enumerate the finite non-entity public pages once.
- Derive all entity detail descriptors by iterating `COLLECTIONS` and `allEntities(kind)` and calling the existing `entityHref(kind, slug)`.
- Represent deliberate redirects, non-indexable pages, and internal routes as different policies rather than pretending they are content documents.
- Feed the public descriptors to Start's `pages` configuration.
- Feed the same descriptors to sitemap, social-image, generated Netlify-routing, and verification steps.

Do not rely only on link crawling for dynamic routes. TanStack Start automatically discovers static route patterns but explicitly excludes parameterized patterns because it cannot invent parameter values. It can discover dynamic URLs by crawling links, yet UI state or a future navigation change could hide a valid page. Explicit registry-derived `pages` are the guarantee; `autoStaticPathsDiscovery` and `crawlLinks` should remain enabled as redundant discovery checks.

Recommended prerender behavior:

```ts
tanstackStart({
  prerender: {
    enabled: true,
    autoSubfolderIndex: false,
    autoStaticPathsDiscovery: true,
    crawlLinks: true,
    failOnError: true,
  },
  pages: publicPages.map(({ path }) => ({ path })),
})
```

Use `filter` or per-page policy to exclude `/_icons`, API endpoints, and anything later classified private. Build verification must compare the expected manifest with actual emitted HTML, so an accidentally omitted page fails the build.

### 3. Preserve extensionless URLs on Netlify without redirecting them

Start's `autoSubfolderIndex: false` emits `/page.html` instead of `/page/index.html`. Use that shape together with generated Netlify `200` rewrites from the existing extensionless route to its generated HTML file. Netlify documents that a `200` rewrite changes the served response without changing the browser URL.

Also set the repository-owned Netlify setting:

```toml
[build.processing.html]
pretty_urls = false
```

Netlify's Pretty URLs feature is enabled by default and otherwise forwards `/about` to `/about/`. Disabling it in `netlify.toml`, then internally rewriting `/about` to `/about.html`, preserves the current extensionless URL and lets `GET /about` return `200` rather than a trailing-slash redirect. Generate the finite rewrite set or safe collection patterns from the public manifest; do not hand-maintain hundreds of entity rules.

Keep `/locations`' existing deliberate redirect behavior unless the route-contract decision explicitly changes it. Preserving an existing redirect is different from allowing public content pages to fall back to a generic document.

Remove the current `/* -> /index.html` SPA rewrite. It masks omissions and makes nonexistent paths return homepage content with `200`. A generated `404.html` or Start's real not-found response should handle unknown paths.

### 4. Use Netlify's official Start adapter, but keep public delivery static

Netlify's current official setup is:

- `@netlify/vite-plugin-tanstack-start` in `vite.config.ts`;
- build command `vite build` (the repository can continue wrapping this as `bun run build`);
- publish directory `dist/client`.

The adapter is preferable to custom Netlify packaging because it owns Start's platform integration and local production emulation. Public URLs should still be served from emitted files; runtime rendering is a safety boundary for explicitly non-public/client-only surfaces, not a substitute for missing public artifacts.

Keep the existing `/api/corrections/submit` Netlify Function as a separate endpoint. There is no architectural need to rewrite working correction submission into a Start server function during this migration.

For `/_icons`, use Start's per-route client-only mode (`ssr: false`), mark it `noindex`, exclude it from the public manifest and sitemap, and route only that explicit path through the Start runtime/client shell. Do not restore a site-wide shell fallback. This preserves the internal tool without making its browser-heavy virtualized interface part of the crawlable site contract.

### 5. Metadata and preview assets attach at the route descriptor seam

The rendering architecture should not choose the visual template, rasterizer, or copy rules; those belong to their own decisions. It must provide a stable seam:

- A pure metadata builder receives a `PublicPage` and canonical campaign data.
- Each route's `head()` returns its builder output.
- The preview-image build iterates the same manifest and writes deterministic assets before HTML prerendering.
- Prerendered head tags point to absolute production URLs for those assets.
- Sitemap and canonical URLs use the same path source.

This keeps campaign facts in their existing canonical records and prevents a second hand-maintained SEO database.

## Alternatives considered

| Approach                                                      | Finding                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **TanStack Start + explicit prerender manifest**              | **Choose.** It preserves the current router and Vite application model, provides full-document rendering and hydration, has first-party static prerendering, and has an official Netlify adapter.                                                                                                                                                                                          |
| Custom Vite SSR/SSG around bare TanStack Router               | Viable, but not justified. Vite describes its SSR API as low-level and aimed at library/framework authors. The repository would own client/server entries, request routing, route loading, dehydration, asset-manifest injection, HTML emission, and dev/prod parity. TanStack Router's standalone SSR guide also warns that these APIs remain experimental while sharing Start internals. |
| Keep the SPA and enable Netlify's crawler prerender extension | Reject. Netlify describes this as serving crawler-specific generated HTML while ordinary visitors continue receiving the JavaScript SPA. That does not make route HTML a deterministic build artifact, does not give every user the same no-JavaScript document, and retains user-agent-dependent delivery.                                                                                |
| Runtime SSR for every request                                 | Reject as the primary mode. It would make pages crawlable, but it adds a function invocation and failure mode to immutable source-coded content and does not meet the build-time-static destination. Keep runtime rendering only for explicitly excluded surfaces.                                                                                                                         |
| Move to Astro, Next.js, or another host                       | Reject. It would replace the established TanStack route model and create a broad UI migration without solving a repository constraint that Start already addresses. Netlify can remain the host.                                                                                                                                                                                           |

## Implementation constraints

The migration should be atomic. Do not retain compatibility shims, duplicate route trees, or old/new entry points.

1. Pin and install a compatible TanStack Start/Router/Netlify-adapter set; migrate the build and root document.
2. Introduce the derived route manifest and static-output completeness tests.
3. Make the public render path server-safe and hydration-stable:
   - browser preferences after a deterministic first render;
   - explicit date/number locale and time zone;
   - DOM-only code in effects, event handlers, `ClientOnly`, or explicitly client-only routes.
4. Add route-owned head data from pure canonical-data builders.
5. Generate preview assets, sitemap, robots policy, Netlify rewrites, and 404 output from the manifest.
6. Replace `dist` with `dist/client`, remove the global SPA rewrite, and configure Pretty URLs in `netlify.toml`.
7. Prove a deploy preview before production.

## Required proof before production

Automated build checks should fail unless:

- every expected public content path has exactly one generated HTML artifact;
- no parameterized public route is left without all registry values;
- every generated document contains its primary heading/body content and ordinary crawlable links;
- every generated document contains its required canonical, description, social, and structured metadata;
- every referenced social image exists and meets the chosen dimensions/content contract;
- `/_icons` and other excluded pages are absent from the sitemap and have an explicit non-indexing policy;
- an unknown path does not receive homepage HTML with `200`;
- hydration produces no console errors with JavaScript enabled, including stored light/dark and sidebar preferences.

On a Netlify deploy preview and again in production, verify representative home, collection, every entity kind, location map/list, the deliberate locations redirect, internal icons, correction submission, and 404 cases. Fetch public pages with ordinary browser, bot, and link-unfurler user agents and confirm that status, canonical URL, head data, and primary HTML content do not depend on user agent or JavaScript execution.

## Primary sources

- [TanStack Start overview](https://tanstack.com/start/latest/docs/framework/react/overview) — Start's Router/Vite relationship, full-document SSR, and current RC status.
- [TanStack Start static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering) — emitted static HTML, explicit `pages`, automatic static-route discovery, dynamic-route limitations, link crawling, output shape, and failure controls.
- [TanStack Start build from scratch](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch) — router factory and root full-document structure.
- [TanStack Router document head management](https://tanstack.com/router/latest/docs/guide/document-head-management) — `head()`, `HeadContent`, `Scripts`, and nested tag deduplication.
- [TanStack Start execution model](https://tanstack.com/start/latest/docs/framework/react/guide/execution-model) — isomorphic execution, client-only boundaries, `useHydrated`, and hydration mismatch guidance.
- [TanStack Router standalone SSR](https://tanstack.com/router/latest/docs/guide/ssr) — hydration mechanics and the warning on standalone SSR API stability.
- [Vite server-side rendering](https://vite.dev/guide/ssr.html) — low-level SSR scope, client/server entries, SSR manifests, and SSG through prerendering.
- [Netlify's TanStack Start guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/) — official adapter, build command, `dist/client`, and local platform emulation.
- [Netlify redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/) — `200` rewrite semantics, static-file shadowing, 404 behavior, and Pretty URL normalization.
- [Netlify file-based configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/) — repository-owned `build.processing.html.pretty_urls` configuration.
- [Netlify prerendering](https://docs.netlify.com/site-deploys/post-processing/prerendering/) — the crawler-specific behavior of Netlify's prerender extension.
