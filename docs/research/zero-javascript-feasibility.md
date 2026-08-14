# Zero-client-JavaScript feasibility

Research date: 2026-08-14

## Question

Can The Lost Hope be delivered as static HTML with no client JavaScript while preserving every
current user-visible feature? If not, what is the smallest viable JavaScript architecture that
preserves the existing crawlable HTML and feature set?

## Answer

**Not with every current feature preserved.** The public campaign content can already be served as
plain, crawlable HTML, and ordinary links, images, metadata, the session calendar, and the visual
event timeline remain useful with JavaScript disabled. However, several current controls render as
inert buttons or empty states without hydration. The hard failures include mobile navigation,
campaign search, atlas filters and tree search, correction access and submission, portrait dialogs,
hover previews, and the internal icon-catalogue route.

A zero-JavaScript rebuild could recreate some of those behaviors with native HTML and CSS and move
others to full-page server requests. That would be a product and architecture rewrite, not a build
flag, and it still cannot preserve all of the current instant, client-side behavior exactly. The
strongest delivery option is therefore **smallest viable JavaScript**: keep every public route
prerendered, remove campaign canon from the always-loaded client entry, use native HTML for simple
disclosures, and load isolated interactive code and compact data only on interaction.

## What the site already does

The site is already much closer to a static site than the bundle suggests:

- The Vite configuration gives TanStack Start the registry-derived public-page list, enables
  prerendering, disables automatic discovery and crawling, and disables the SPA fallback
  ([`vite.config.ts`](../../vite.config.ts#L44-L56)). At the time of this research the manifest
  contains 350 public paths; `/_icons` is deliberately excluded.
- Netlify publishes `dist/client` ([`netlify.toml`](../../netlify.toml#L1-L4)). This is also the
  publish directory in Netlify's official TanStack Start guidance
  ([Netlify framework build settings](https://docs.netlify.com/frameworks/#tanstack-start)).
- TanStack describes static prerendering as generating static HTML files that can be served without
  generating them on request
  ([TanStack Start static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering#prerendering)).
- The root document then opts back into the client runtime by rendering both an inline theme script
  and TanStack Router's `<Scripts />` ([`src/routes/__root.tsx`](../../src/routes/__root.tsx#L20-L40)).
  The inspected production output therefore contains route module preloads, TanStack streaming and
  scroll-restoration scripts, and a module entry script.

In the inspected production build, the root entry script is 7,500,551 bytes raw and 2,991,464 bytes
with `gzip -9`. It is requested by the home page before any interaction. This means prerendering is
working, but prerendering and client hydration are currently cumulative: the browser receives the
HTML **and** the application/data needed to reconnect it to React.

## Current feature inventory without JavaScript

| Feature                                                     | With current HTML and no JavaScript | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page content, metadata, entity references, collection links | **Works**                           | Public routes are prerendered and reference navigation is emitted as ordinary `href` links. Navigation becomes a full document request rather than an in-app transition.                                                                                                                                                                                                                                                                                                                                                                                                         |
| Session calendar and event-road rendering                   | **Works**                           | Their geometry and content are present in the prerendered markup. CSS hover labels on timeline marks also continue to work.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Mobile navigation                                           | **Breaks**                          | The mobile menu button only changes React state, while the navigation `<aside>` is emitted hidden below the large breakpoint ([`campaign-shell.tsx`](../../src/components/campaign-shell.tsx#L15-L57), [`layout.tsx`](../../src/components/campaign-shell/layout.tsx#L38-L69)).                                                                                                                                                                                                                                                                                                  |
| Global/home campaign search                                 | **Breaks**                          | Results are calculated from the complete campaign graph after input events, with keyboard selection and programmatic navigation ([`campaign-search.tsx`](../../src/components/campaign-shell/campaign-search.tsx#L32-L109)). The prerendered HTML contains only an inert search input.                                                                                                                                                                                                                                                                                           |
| Theme selection                                             | **Breaks as specified**             | The inline script and React hook read and persist `localStorage`; the toggle itself requires React ([`__root.tsx`](../../src/routes/__root.tsx#L20-L40), [`theme.ts`](../../src/components/campaign-shell/theme.ts#L12-L58)). CSS can follow the OS with `prefers-color-scheme`, but cannot preserve the site's current manual stored preference ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-color-scheme)).                                                                                                                     |
| Sidebar collapsing, nested expansion, and persistence       | **Breaks**                          | These states use React and `localStorage` ([`storage.ts`](../../src/components/campaign-shell/storage.ts#L1-L79)). Static HTML retains only the server-selected initial expansion state.                                                                                                                                                                                                                                                                                                                                                                                         |
| Atlas map/list switch and type filters                      | **Breaks**                          | Buttons call router navigation with URL search state; filter results are computed in memory ([`locations-index.tsx`](../../src/components/locations-index.tsx#L298-L354)).                                                                                                                                                                                                                                                                                                                                                                                                       |
| Location-tree text search and branch expansion              | **Breaks**                          | Text filtering and tree disclosure are React state ([`locations-index.tsx`](../../src/components/locations-index.tsx#L187-L289)).                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Correction access and submissions                           | **Breaks**                          | Access starts in `checking`, is resolved and remembered through Web Crypto and `localStorage`, and entity correction UI returns `null` while checking or locked ([`correction-access.ts`](../../src/lib/correction-access.ts#L23-L98), [`entity-correction-submission.tsx`](../../src/components/entity-correction-submission.tsx#L20-L49)). The questions form intercepts native submit and sends JSON through `fetch` ([`questions-page.tsx`](../../src/components/questions-page.tsx#L17-L63), [`correction-submission.ts`](../../src/lib/correction-submission.ts#L28-L43)). |
| Portrait enlargement                                        | **Breaks**                          | The dialog is only mounted after a React click and is opened with `showModal()` ([`avatar-viewer.tsx`](../../src/components/avatar-viewer.tsx#L14-L66)).                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Entity hover/focus previews                                 | **Breaks**                          | Preview content is not emitted until React sets `open`; placement also depends on live viewport measurements ([`hover-preview.tsx`](../../src/components/ui/hover-preview.tsx#L34-L130)).                                                                                                                                                                                                                                                                                                                                                                                        |
| Automatic event-session hash tracking                       | **Breaks**                          | Scroll and resize listeners update the URL hash from measured element positions ([`events-timeline-hash.ts`](../../src/components/events-timeline-hash.ts#L47-L105)). Normal navigation to an existing fragment can still work.                                                                                                                                                                                                                                                                                                                                                  |
| Broken-image fallback behavior                              | **Breaks**                          | Avatar and map fallback replacement is attached through React `onError` handlers ([`avatar.tsx`](../../src/components/ui/avatar.tsx#L12-L25), [`map-placeholder.tsx`](../../src/components/map-placeholder.tsx#L56-L83)). A verified image pipeline can make this fallback less important, but removing it is still a behavioral change.                                                                                                                                                                                                                                         |
| Internal `/_icons` catalogue                                | **Breaks completely**               | The route explicitly has `ssr: false`, then depends on client-side fuzzy filtering, virtualization, keyboard shortcuts, queue state, and clipboard access ([`[_]icons.tsx`](../../src/routes/%5B_%5Dicons.tsx#L24-L43), [`[_]icons.tsx`](../../src/routes/%5B_%5Dicons.tsx#L72-L209)). It is not a public/crawlable route, but it is part of the current toolset.                                                                                                                                                                                                                |

## What TanStack Start supports

### Static HTML does not mean no hydration

TanStack's documentation defines hydration as the browser work that loads JavaScript, attaches event
handlers, and reconnects server HTML to React. It says full-document hydration is the default
([deferred hydration overview](https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration#deferred-hydration)).
Static prerendering changes **when the HTML is generated**, not whether a client runtime is emitted.

Selective SSR is not a no-JavaScript control. `ssr: false` disables server rendering and runs the
route component on the client; `ssr: "data-only"` also leaves component rendering to the client
([TanStack Start selective SSR](https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr#configuration)).
Those options move work in the wrong direction for this goal.

I found no documented TanStack Start option that globally emits hydrated React routes as
client-JavaScript-free pages. Omitting `<Scripts />` or stripping scripts after the build may be
technically possible as a custom pipeline, but it is outside the documented rendering model and
would strand the current interactive markup. It should not be the delivery architecture.

### Supported boundary-level alternative: deferred hydration

The installed TanStack Start version exposes the documented experimental `<Hydrate>` boundary and
the `never()` and `interaction()` strategies. TanStack documents that:

- server HTML remains visible, styled, and indexable while hydration is deferred;
- a split boundary's child JavaScript is moved to a separate chunk and is not downloaded until its
  hydration trigger, unless it is explicitly prefetched;
- `never()` preserves initial server HTML and never hydrates that boundary on the initial document;
- `interaction()` can hydrate on focus/click/pointer intent; and
- the surrounding TanStack Start document is still one React tree, not independent zero-runtime
  islands.

See the [official deferred hydration guide](https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration#comparison-to-astro-islands)
and its [`never()` recipe](https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration#keep-initial-ssr-html-static).
TanStack marks this facility experimental, so delivery needs browser verification and bundle
regression tests rather than assuming compiler extraction always succeeds.

TanStack Router also supports route code splitting: route components are non-critical configuration
that can load on demand, while the root route cannot be route-split because it is always rendered
([TanStack Router code splitting](https://tanstack.com/router/latest/docs/guide/code-splitting)).
That makes the current root `CampaignShell` import graph the most important seam.

## Could native HTML replace some JavaScript?

Yes, and these replacements are worth using where they preserve the product:

- Mobile navigation, sidebar groups, location-tree branches, and correction-panel disclosure can
  use `<details>/<summary>`. The browser provides click and keyboard disclosure behavior without
  script ([MDN `<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)).
- Atlas map/list navigation and type-filter variants can be ordinary links to canonical URL-backed
  pages. This costs a full-page request but preserves a shareable URL.
- Correction submission can use a native POST form. Browsers can submit form controls directly to
  an action URL without client JavaScript ([MDN `<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)).
  The existing Netlify Function would have to accept form encoding, derive trusted context on the
  server, and return or redirect to a success/error page; Netlify Functions officially return web
  responses to requests ([Netlify Functions overview](https://docs.netlify.com/build/functions/overview/#web-requests)).
- Hover previews can be present in HTML and shown with CSS, accepting less precise collision
  handling. Newer declarative dialog/popover commands can open UI without author JavaScript, but
  compatibility and accessibility need testing before using them for the portrait viewer
  ([MDN `<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#modal_dialogs_using_invoker_commands)).

These substitutions do **not** fully reproduce instant fuzzy search, persisted per-browser shell
state, atlas text filtering, correction draft/status handling, viewport-aware tooltip placement, or
the icon catalogue. Moving search and filtering to a Netlify Function could avoid browser
JavaScript, but it would turn each interaction into a server request and dynamically generated HTML;
that is no longer a static-HTML-only application in the meaningful architectural sense.

## Recommended delivery architecture

Choose **prerendered HTML plus smallest viable JavaScript**, with a hard rule that canonical campaign
data is a build-time input unless an interaction explicitly needs a compact client representation.

1. **Keep the 350-route prerender contract.** Every public URL continues to contain its resolved
   content, metadata, and real `href` references before JavaScript runs.
2. **Deepen the server/build boundary.** Route HTML receives a display-ready projection of only the
   current page. Canonical registries and transitive reference-resolution code must not be imported
   by the root client graph merely because they were used to build that HTML.
3. **Remove the campaign graph from `CampaignShell`.** The root currently imports both campaign
   search and sidebar data. Render compact navigation HTML from a purpose-built projection; use
   native disclosures where possible. This is necessary because the root route is always loaded and
   cannot be route-split.
4. **Make search an interaction-loaded feature.** Put the search component and a compact search
   index (kind, slug, name, minimal aliases/labels) behind an `interaction()` split boundary or fetch
   that index on first focus. Do not ship entity bodies, event descriptions, or resolved relation
   graphs to support search suggestions.
5. **Split other interactive features by intent.** Corrections, atlas filtering/search, portrait
   viewing, and viewport-aware previews should each have isolated client chunks. Prefer native HTML
   for their initial/static presentation; hydrate only the control that needs behavior.
6. **Keep `/_icons` as an explicitly client-only internal exception.** Its six-megabyte catalogue
   chunks must remain absent from public routes. Preserving that tool does not justify loading it on
   campaign pages.
7. **Prefer full-document navigation if client navigation reintroduces graph coupling.** All public
   routes already exist as static HTML. Losing SPA transitions is acceptable if it prevents a page
   visit from accumulating unrelated campaign modules; ordinary links preserve the actual
   navigation feature.
8. **Enforce transfer budgets in the build audit.** Measure compressed JavaScript and images
   separately on representative cold routes. Fail the build if the initial public-route JavaScript
   exceeds the agreed reduction target or if `/_icons` assets enter a public route's preload/import
   graph.

## Decision

Do **not** pursue blanket zero client JavaScript while “all features must be preserved” remains a
requirement. It would either remove features or force a broad server-driven rewrite with inferior
interaction behavior, and TanStack Start does not document it as an output mode.

Pursue the hybrid above. It preserves the strongest part of the existing architecture—canonical
data resolved into crawlable static route HTML—while attacking the actual defect: the entire
campaign graph is currently reachable from the always-loaded client entry. The 50% JavaScript
transfer target should be treated as a floor; once canon is removed from that entry, a substantially
larger reduction is plausible and should be verified from production output rather than assumed.
