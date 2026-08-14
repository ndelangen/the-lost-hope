# Minimal-JavaScript delivery spike

Spike date: 2026-08-14

## Question

Can TanStack Start keep the campaign's canon-dependent route content as complete prerendered HTML,
remove that canon from a cold page's JavaScript transfer, and still load isolated interactive code
on demand?

This is a throwaway prototype, not a production implementation. Run its build and transfer report
with:

```sh
bun run prototype:minimal-js
```

## Baseline

The untouched production build emitted a 7,500,551-byte root entry chunk, 2,992,705 bytes with
`gzip -9`. It contained campaign events and was referenced by every inspected public route.

The first controlled experiment wrapped only the root `CampaignShell` in a split `never()`
boundary. `/events` still referenced 2,969,081 gzip bytes across its initial JavaScript files.
This disproved the assumption that making the root shell static would by itself remove canon from
route preloads: route modules also import the shared campaign model.

## Successful route experiment

The `/events` route was changed to render a child containing all canon-dependent derivation inside
its own split `never()` boundary. The child still ran during prerendering, but the client route
module no longer pulled its campaign imports into the route preload graph.

| Representative cold route | Referenced JS before route boundary | Referenced JS after route boundary | Reduction |
| ------------------------- | ----------------------------------: | ---------------------------------: | --------: |
| `/events`                 |                2,969,081 bytes gzip |                 199,764 bytes gzip |     93.3% |

The final build still prerendered all 350 public pages. Browser verification against Vite Preview
confirmed that `/events` contained its heading, 134-event summary, complete event timeline, and
ordinary entity-reference links before any interaction. Following an event reference performed a
normal full-page navigation to the correct detail page.

The same build left routes not moved behind a static boundary essentially unchanged:

- `/`: 2,978,392 referenced JavaScript bytes gzip.
- `/pcs/detail/jim`: 2,982,442 referenced JavaScript bytes gzip.

This is useful evidence that the reduction came from the route boundary rather than a misleading
global chunk rename or compression change.

## Interaction experiment

A real theme toggle was put behind an `interaction()` split boundary as a control island outside
the never-hydrated static tree.

- The initial `/events` request loaded only its 199,764 gzip bytes of referenced JavaScript.
- The first theme interaction then requested three chunks: the theme island, its root glue, and its
  Lucide helper. Their files total about 1.9 KB with `gzip -9`.
- That triggering pointer click was swallowed: it hydrated the control but did not toggle the
  theme. A second click changed the document theme and accessible label correctly.
- The browser console had no warnings or errors.

An interaction boundary declared inside a component module that was itself only reachable through
the never-loaded static boundary did not wake up. The working control had to be a true sibling in
the hydrated root graph. That makes island placement and shell composition a design constraint, not
just a matter of wrapping existing JSX.

## Verdict

The core delivery hypothesis holds, but the easy implementation hypothesis does not.

**Validated:**

- Canon can remain a build/prerender input while complete route HTML and reference links are
  preserved.
- A representative canon-heavy route can beat the 50% JavaScript target substantially; this spike
  achieved a 93.3% reduction.
- Small independent features can download and hydrate only after interaction, but transparent
  replay of the triggering pointer action did not work in this spike.

**Falsified or still unproven:**

- Wrapping only the root shell is insufficient. Every route that imports the campaign graph needs a
  server/build-only projection or a correctly placed static boundary.
- Arbitrarily nested islands do not automatically work inside a never-hydrated parent module.
- The experimental interaction boundary cannot be assumed to preserve the first user action.
  Essential controls need on-load hydration, earlier intent hydration, or feature-specific proof
  that event replay works.
- This prototype does not preserve all features. Its outer static shell leaves mobile navigation,
  sidebar controls, and campaign search inert, and most routes still preload the campaign graph.

The production architecture should therefore keep a small hydrated shell that imports only compact
navigation and search projections, make canon-heavy route bodies static/server-owned, and declare
interactive islands from the hydrated graph rather than from never-loaded modules. The next
decision needs to compare that design against native-HTML replacements and verify it across search,
corrections, atlas controls, and detail pages before delivery.
