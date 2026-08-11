# Build-time social-image renderer

Research date: 2026-08-11

Wayfinder ticket: [Choose the build-time social-image renderer](https://github.com/ndelangen/the-lost-hope/issues/68)

Audited repository commit: `79274f79cb15970703faf287c828d319aaae0e91`

## Decision

Generate every route's 1200 by 630 PNG at build time with **direct `satori` followed by
`@resvg/resvg-js`**. Do not use `@vercel/og`, Sharp, or a browser in the initial pipeline.

Satori is the deliberately small layout boundary: a pure React-like tree plus checked-in font and
image bytes becomes SVG. `resvg-js` is the raster boundary: that SVG becomes PNG. The approved
World window card fits Satori's documented subset after expressing the layout as flexbox and
absolute layers rather than copying the prototype's Tailwind classes verbatim. Satori supports the
needed gradients, `objectFit`, and `objectPosition: top`; the underlying resvg renderer does not use
system libraries and promises identical pixels on supported platforms.
[Satori CSS and asset support](https://github.com/vercel/satori#css) and
[resvg reproducibility](https://github.com/linebender/resvg#reproducibility)

The generator should be an explicit Bun prebuild step which consumes the same canonical
public-route descriptors used by prerendering and metadata. It must read only repository-owned
assets, emit content-addressed PNGs into one generator-owned public directory, and finish before the
TanStack Start/Vite build starts. Vite copies `public` assets unchanged into the output directory,
so Netlify can serve the images as ordinary immutable deploy assets; there is no runtime function or
image service in this decision.
[Vite `publicDir`](https://vite.dev/config/shared-options#publicdir),
[TanStack Start static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering),
and [TanStack Start on Netlify](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#netlify)

## Final pipeline

For each entry in the 293-page public-route manifest:

1. Build one serializable preview descriptor from visible canonical data: route key, kind, title,
   derived description, context, footnote, kind colors, synchronous icon SVG, and one verified local
   image path or the atmospheric fallback. No social-only lore store is introduced.
2. Resolve all inputs locally. Read raster images and fonts into buffers and pass raster images as
   buffers/data URLs. A missing declared asset fails validation before rendering; remote URLs never
   make the build network-dependent.
3. Render a dedicated, stateless World window component with inline style objects. Use flexbox and
   absolute layers, separate elements for the two dark overlays, `objectFit: cover`, and
   `objectPosition: top`. Do not import application CSS or depend on Tailwind processing.
4. Call Satori with fixed `width: 1200`, `height: 630`, the exact checked-in static font buffers,
   and its default `embedFont: true`. Embedded glyph paths remove fonts from the downstream SVG
   renderer's environment.
5. Pass the SVG string to `new Resvg(svg).render().asPng()`. Assert the result is an opaque 1200 by
   630 PNG under the contract's 1 MB operational target, then write it atomically.
6. Name the file from a stable route key plus a content digest, for example
   `/social-previews/pcs--detail--swift.<digest>.png`. The digest covers the normalized descriptor,
   explicit template-version constant, renderer package versions, font bytes, referenced raster
   bytes, and icon SVG bytes. The metadata builder and generator must call the same path/digest
   function.
7. At the start of a clean generation, remove stale files only inside the generator-owned output
   directory. At the end, assert a one-to-one mapping between all 293 canonical pages and the 293
   output files.

Install `satori` and `@resvg/resvg-js` as exact, lockfile-pinned development dependencies. The
current `resvg-js` package documents direct Bun execution and supplies platform packages for macOS,
Linux, and Windows. Netlify detects Bun projects, permits a pinned `BUN_VERSION`, and caches project
dependencies. The implementation should pin Bun in Netlify rather than accepting a moving build
image default.
[`resvg-js` Bun support](https://github.com/thx/resvg-js#bun),
[Bun Node-API support](https://bun.com/docs/runtime/node-api), and
[Netlify dependency management](https://docs.netlify.com/build/configure-builds/manage-dependencies/#bun)

### Build and cache shape

Use an ordinary script boundary rather than embedding image generation inside a Vite plugin:

```json
{
  "scripts": {
    "generate:social-images": "bun scripts/generate-social-images.tsx",
    "build": "bun run generate:social-images && vite build"
  }
}
```

The first implementation should render all 293 cards on every clean build. That is the simplest
correctness model and the local proof took about 81 seconds per sequential set. Content-addressed
filenames already let Netlify's deploy/CDN reuse unchanged files across deploys; Netlify treats
static assets as fresh until a deploy changes them.
[Netlify static-asset caching](https://docs.netlify.com/build/caching/caching-overview/#default-caching-behavior)

If real Netlify measurements later make generation material to build time, cache finished PNGs by
the complete digest above and restore only exact hits. Do not key only on route data: a template,
font, icon, raster input, Satori, or resvg change must invalidate the output. Do not add worker-pool
complexity or a second image library until the measured build warrants it.

## Asset decisions

### Fonts

Check in licensed **static TTF or OTF files** and their license alongside the generator. Load only
the weights the card actually uses, once per process, and reuse the font objects across all cards.
Do not rely on Netlify/macOS system fonts, fetch Google Fonts during the build, or use WOFF2. Satori
requires callers to provide font data and currently supports TTF, OTF, and WOFF but not WOFF2; with
font embedding enabled it converts text to SVG paths.
[Satori fonts and embedding](https://github.com/vercel/satori#fonts)

The proof exposed an additional practical constraint: the current Google Fonts variable Inter TTF
failed in Satori's OpenType parser, while the upstream Inter 4.1 static Regular, Bold, and Black TTFs
rendered successfully. Therefore the implementation should vendor tested static faces, not assume
that every nominally supported TTF shape works. Inter 4.1 is available under the SIL Open Font
License from the font owner's release.
[Inter 4.1 release](https://github.com/rsms/inter/releases/tag/v4.1)

### Raster images

Use a repository image only after the public-manifest asset validator proves it exists and is a
supported local raster file. Read it once and pass bytes/data URLs to Satori; this avoids network I/O
inside both Satori and resvg. Preserve the approved top alignment explicitly with
`objectPosition: top`. Missing, external, or rejected images take the approved kind-colored
atmospheric fallback; they must not trigger a runtime fetch or broken-image behavior.
[Satori image buffers and data URLs](https://github.com/vercel/satori#images)

The current route audit found only seven present campaign images and 29 missing declared local
paths, so the fallback is the normal build path for most cards, not an edge case.
[Public route renderability audit](https://github.com/ndelangen/the-lost-hope/blob/research/public-route-renderability/docs/public-route-renderability-audit.md#4-resolve-asset-gaps-before-claiming-no-javascript-or-preview-completeness)

### SVG and icons

Render icons as synchronous inline `<svg>`/`<path>` nodes or pre-resolved SVG data owned by the
preview descriptor. Satori's own tests cover inline SVG. Do not render the application's
`IconCatalogGlyph` directly: Game Icons are currently populated by a client effect, which cannot run
in a build-only stateless renderer. The preview pipeline should adapt the existing canonical icon
identifier to SVG once, not establish a second icon catalogue.
[Satori inline-SVG tests](https://github.com/vercel/satori/blob/main/test/svg.test.tsx)

## Renderer comparison

| Pipeline                       | Fit for this build                                                                                                                                                                                                                                                                                                                                                                                                 | Decision                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Direct Satori + `resvg-js`     | Pure/stateless JSX to SVG, explicit buffer/file control, local fonts and images, documented Bun support, small native raster boundary, and resvg's cross-platform pixel-reproducibility promise. The approved design fits its flex/absolute CSS subset.                                                                                                                                                            | **Choose.**                                                                            |
| `@vercel/og`                   | Convenient `ImageResponse` wrapper over Satori and Resvg, with default 1200 by 630 sizing, Noto Sans, and dynamic-response cache headers. Its documented workflow is a Node 22+ Vercel function/API endpoint. Those response conveniences do not help a static prebuild, and direct use gives clearer file and hashing control.                                                                                    | Do not add the wrapper.                                                                |
| Satori + Sharp                 | Sharp accepts SVG input, supports Bun installation, and ships common-platform binaries. It could post-process to JPEG/WebP or perform photo transforms, but it adds libvips and optional-binary concerns without improving Satori layout or matching resvg's stated pixel-identity guarantee.                                                                                                                      | Reserve for a measured output-format/optimization need.                                |
| Playwright/Chromium screenshot | Would reproduce arbitrary browser CSS and therefore the prototype most literally. It also requires a version-matched browser download, Linux dependencies, font loading and image-decode waits, fixed viewport/DPR, disabled motion, and a controlled OS. Playwright warns that screenshots vary with OS, browser, hardware, settings, and headless mode; it also says CI browser caching is often not worthwhile. | Keep only as fallback if an approved visual requirement cannot be expressed in Satori. |

Sources for the comparison:

- [`@vercel/og` overview and limitations](https://vercel.com/docs/og-image-generation) and
  [`ImageResponse` API](https://vercel.com/docs/og-image-generation/og-image-api)
- [Sharp SVG input](https://sharp.pixelplumbing.com/api-constructor/) and
  [Sharp installation/platform support](https://sharp.pixelplumbing.com/install/)
- [Playwright browser installation](https://playwright.dev/docs/browsers),
  [visual-rendering variability](https://playwright.dev/docs/test-snapshots), and
  [CI browser-cache guidance](https://playwright.dev/docs/ci#caching-browsers)

## Representative local proof

The proof ran on the repository's current Bun toolchain on macOS ARM64 with:

- Bun `1.3.9`
- `satori@0.29.0`
- `@resvg/resvg-js@2.6.2`
- upstream Inter 4.1 static Regular/Bold/Black TTFs
- the real `public/assets/pcs/swift.jpg`
- inline SVG paths
- image-rich, long-title atmospheric, and sparse atmospheric descriptors

It rendered the three cases repeatedly into **293 PNGs**, then repeated the entire 293-card pass in
a separate output directory. The script used the approved full-bleed image/fallback composition,
two dark overlays, top-aligned `object-cover`, protected left text, and a circular inline icon.

| Observation                     | Result                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| Dimensions and format           | Every file was a 1200 by 630, 8-bit RGBA PNG.                                                     |
| First sequential 293-card pass  | 82,948 ms; 126,570,327 bytes total.                                                               |
| Second sequential 293-card pass | 80,608 ms; 126,570,327 bytes total.                                                               |
| Full-set SHA-256, both passes   | `07fae61b631faa6136980e5d2efc81e2dad018d55ab4e0f553c6e6d6178186c4`                                |
| Byte determinism                | All per-file hashes and the full-set digest matched.                                              |
| File sizes                      | 270,186 to 721,794 bytes; mean 431,981 bytes. Every proof card stayed below 1 MB.                 |
| Image-rich case                 | Real JPEG embedded successfully; the inspected output kept the face/top of the portrait in frame. |
| Long and sparse cases           | Both atmospheric fallbacks rendered legibly with no remote resource.                              |

This proves the selected packages load under Bun, the real JPEG and inline-SVG paths work, the
approved top-aligned composition is expressible, 293 sequential cards are build-feasible, and two
same-environment full runs are byte-identical. It does **not** prove the complete future descriptor
set, Linux installation, or end-to-end Netlify output; those remain implementation acceptance gates.

The failed variable-font attempt is part of the evidence, not an implementation blocker. Satori
threw in `@shuding/opentype.js` while parsing the Google Fonts variable Inter TTF. Replacing it with
the font owner's pinned static Inter 4.1 faces made the complete proof pass. The generator must turn
font parse failures into a clear build error and its fixture suite must exercise every vendored face.

## Implementation acceptance gates

The delivery plan should include these renderer-specific gates in addition to the broader
crawlability contract:

1. Exact versions of Bun, Satori, and `resvg-js` are pinned; the lockfile contains the Netlify Linux
   native package selected by a clean Netlify install.
2. A renderer fixture suite covers image-rich, atmospheric, long-title, sparse-data, and every
   route-kind icon/color variant. Each fixture is exactly 1200 by 630 and below 1 MB.
3. Two clean local generations produce identical hashes. A clean Linux CI or Netlify build compares
   representative fixture hashes with a second clean Linux build; only then claim whole-pipeline
   cross-build reproducibility.
4. The full production generation emits exactly one file for every public-manifest entry, no file
   for excluded/internal routes, no stale owned files, and no undeclared network request.
5. Every metadata image URL maps to the generated file with matching PNG content type, dimensions,
   and content digest.
6. A visual review at native size and reduced preview size confirms top-aligned image crops, text
   protection, safe margins, and honest fallbacks before the first release.

## Newly surfaced work

No additional Wayfinder decision is needed. Static font files, the full-digest cache key, the
same-environment determinism fixtures, and a clean Netlify/Linux proof are concrete constraints for
the existing implementation/cutover plan. A separate image-optimization decision should be opened
only if measured production output exceeds the 1 MB per-card contract or Netlify build/deploy cost
becomes material; the representative PNGs did neither.
