# Progressive JPEG delivery audit

Date: 2026-08-14

Wayfinder ticket: [Inventory raster delivery and prove a progressive JPEG derivative matrix](https://github.com/ndelangen/the-lost-hope/issues/98)

Baseline: freshly fetched `origin/main` at `a92dcca4417b01529cf2e902a5c69e0c5cfd9e56`

## Decision

Use deterministic, checked-in, content-addressed build derivatives as the production source of
responsive images. Keep the originals in the repository, but outside the published directory.
Repository size is not a constraint, and this approach guarantees true progressive JPEGs without
depending on a Netlify plan-specific transformation allowance.

For content portraits, generate two families:

| Family           | Shape                                                     | Candidate widths                                                | Quality | Intended slots                                                                                                                           |
| ---------------- | --------------------------------------------------------- | --------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `avatar-square`  | center-cropped square, with a future focal-point override | 32, 64, 128, 192, 256, 384, 512                                 | 78–80   | 14/20 px references and navigation; 32–64 px timeline/journal marks; 64 px previous portraits; 112/176 px cards; 160 px detail portraits |
| `portrait-full`  | preserve source aspect ratio                              | 640, 768, 960, 1024, 1280, capped at the source's natural width | 80–82   | the interaction-opened fullscreen portrait viewer                                                                                        |
| `social-preview` | fixed 1200×630                                            | 1200 only                                                       | 85      | Open Graph and Twitter previews                                                                                                          |

Never upscale. Omit candidates larger than the source, de-duplicate equal natural widths, and make
every `w` descriptor equal the derivative's actual natural width. The tested ImageMagick quality
scale is encoder-specific; quality values must be re-reviewed if the encoder changes.

This is sufficient to exceed the 50% image-transfer target:

- The four 20 px sidebar portraits currently cost **1,407,244 bytes** because every normal page
  references the originals eagerly. Their four 64 px progressive derivatives total **8,500 bytes**,
  a **99.4% reduction**, and 64 px covers a 20 CSS px slot through 3× DPR.
- The eight local content rasters total **7,175,674 bytes**. Re-encoding even their full natural
  sizes at progressive JPEG quality 80 totals **1,323,346 bytes**, an **81.6% reduction** before
  responsive sizing.
- The current 350 generated social PNGs total **111,485,151 bytes**. Converting all 350 to 1200×630
  progressive JPEG quality 85 totals **19,413,461 bytes**, an **82.6% reduction**; each request
  transfers one preview, not the whole set.

Netlify Image CDN is technically viable and the current Deploy Preview empirically returns true
progressive JPEG, but Netlify's public API contract promises `fm=jpg`, not progressive scan mode.
Legacy Free also records Image Transformations without publishing a universal allowance. Keep Image
CDN as an optional fallback or future substitution, not the contract on which delivery correctness
depends.

## What is delivered today

### Source inventory

`file` and ImageMagick inspected magic bytes rather than trusting extensions. `Opaque` is based on
the decoded alpha plane, not merely the presence of an alpha channel.

| Source                                      |               Actual format |            Dimensions |                   Bytes | Alpha                                          | Current use                                                                                               |
| ------------------------------------------- | --------------------------: | --------------------: | ----------------------: | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `assets/npcs/sir-fabulous-divine-steed.png` |                     PNG RGB |             1254×1254 |               2,510,449 | opaque                                         | one beast detail; references; one social background                                                       |
| `assets/npcs/wolfie.png`                    |                     PNG RGB |             1024×1024 |               2,012,017 | opaque                                         | two beast details; references; two social backgrounds                                                     |
| `assets/pcs/cassian.jpg`                    |               baseline JPEG |             1254×1254 |                 662,301 | opaque                                         | PC roster/detail/nav; five event details; references/timelines; six social backgrounds                    |
| `assets/pcs/devan.jpg`                      |               baseline JPEG |             1024×1024 |                 269,158 | opaque                                         | PC roster/detail/nav; five event details; references/timelines; six social backgrounds                    |
| `assets/pcs/jim-kenku.jpg`                  | **PNG RGBA despite `.jpg`** |               808×808 |               1,240,535 | alpha channel exists but every pixel is opaque | one 64 px previous portrait with fullscreen viewer; nine event details/timelines; nine social backgrounds |
| `assets/pcs/jim.jpg`                        |               baseline JPEG |             1024×1024 |                 363,092 | opaque                                         | PC roster/detail/nav; two event details; references/timelines; three social backgrounds                   |
| `assets/pcs/swift.jpg`                      |               baseline JPEG |               635×800 |                 112,693 | opaque                                         | PC roster/detail/nav; five event details; references/timelines; six social backgrounds                    |
| `assets/pcs/william.jpg`                    |               baseline JPEG |               150×150 |                   5,429 | opaque                                         | one retired-PC card/detail; one social background                                                         |
| D&D Beyond Theron URL                       |               baseline JPEG |             2944×1824 | 1,728,415 on 2026-08-14 | opaque                                         | retired-PC card and detail; third-party browser request                                                   |
| `logo192.png`                               |                 indexed PNG |               192×192 |                   5,347 | meaningful transparency                        | web-app manifest only                                                                                     |
| `logo512.png`                               |                 indexed PNG |               512×512 |                   9,664 | meaningful transparency                        | web-app manifest only                                                                                     |
| `tanstack-circle-logo.png`                  |                    PNG RGBA |               600×600 |                 265,387 | meaningful transparency                        | no source-code reference found                                                                            |
| `favicon.ico`                               |          four embedded PNGs | 16, 24, 32, 64 square |                   3,870 | meaningful transparency                        | browser favicon                                                                                           |

There are **eight local content rasters**, one remote content raster, three transparent PNG app/logo
files, and one transparent multi-size favicon. `bun run audit:public-build` independently reports
350 prerendered pages, 350 social images, and nine local content images; the ninth local content
image is the SVG placeholder.

The source tree also contains many data references to absent NPC, beast, and map PNGs. The runtime
deliberately substitutes the SVG avatar or a generated map placeholder for those paths, so they are
not current raster deliveries. They must enter the derivative pipeline if real files are added.

### Meaningful transparency requires a product decision

No current content portrait needs transparency. `jim-kenku.jpg` is safe to convert directly because
its decoded alpha minimum and maximum are both 1.0.

The favicon, two manifest icons, and unused TanStack logo do contain transparent pixels. They are
not image-footprint drivers: the automatically requested favicon is 3,870 bytes; manifest icons are
normally fetched for installation, and the 265 KB TanStack PNG is unreferenced. Options are:

1. Treat app chrome as a narrow exception to the “progressive JPEG for content raster delivery”
   rule. This preserves appropriate transparency for browser/PWA icons.
2. If “no transparency anywhere” is absolute, render the favicon and manifest icons onto an agreed
   opaque brand background, keep them as crisp PNG/ICO (not lossy JPEG), and delete the unreferenced
   TanStack PNG after a caller audit.

Do not silently flatten these assets to black or white, and do not convert small sharp icons to
lossy JPEG merely for format uniformity.

### Rendered size classes from actual layout

The prerendered HTML proves the browser is currently given plain original `src` URLs without
`srcset`, `sizes`, or intrinsic `width`/`height` attributes.

| Class               | Actual CSS size/layout                                                                | Loading today                             | Evidence and implication                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tiny reference      | 14 px (`size-3.5`)                                                                    | eager/default                             | Entity-reference icons reuse full portraits. 32/64 px derivatives cover 1×–3× DPR.                                                                                                  |
| Navigation          | 20 px (`size-5`) on every ordinary route                                              | eager/default                             | Four active-PC originals total 1.407 MB on every page. 32/64 px candidates are the largest immediate win.                                                                           |
| Timeline            | 48 px event bullets                                                                   | eager/default                             | Use 64/128/192 candidates; lazy-load offscreen timeline entries.                                                                                                                    |
| Journal             | 56 px mobile, 64 px from `sm`; 32 px reference cards                                  | eager/default                             | Use 64/128/192 for marks and 32/64/128 for references.                                                                                                                              |
| Previous portrait   | 64 px                                                                                 | `lazy`                                    | Use 64/128/192; the modal gets the separate full-aspect family.                                                                                                                     |
| PC cards            | retired max 112 px; active max 176 px                                                 | `lazy`                                    | Use 128–384 normally, 512 for 3× DPR.                                                                                                                                               |
| Detail portrait     | fixed 160 px                                                                          | **`lazy` even above the fold**            | Use 192/384/512. Remove lazy loading when this is the route's likely LCP image.                                                                                                     |
| Fullscreen portrait | viewport-contained; mounted only after a click                                        | eager when mounted                        | Use full-aspect 640–1280 candidates; no bytes before interaction.                                                                                                                   |
| Map                 | full content width, up to roughly 960–992 CSS px on desktop; current CSS crops to 3:1 | `lazy`                                    | No map raster actually exists. Current declared sources claim 1200×700, which conflicts with the 3:1 crop. Resolve the intended shape before generating 480/768/1024/1200 variants. |
| Content image       | `max-width: 100%`                                                                     | `lazy`                                    | No current raster content atom exists. Add responsive handling before the first file is introduced.                                                                                 |
| Hero                | none                                                                                  | n/a                                       | There is no current raster hero class; do not invent a delivery contract without a layout.                                                                                          |
| Social preview      | fixed 1200×630                                                                        | fetched by social consumers from metadata | One fixed progressive JPEG at quality 85; responsive markup does not apply.                                                                                                         |

The session journal and event timeline make portrait assets appear on pages that are not character
pages. A safe implementation must update the shared `Avatar`, event mark, navigation, and social
preview seams rather than patching only PC routes.

## Derivative experiment

All committed samples are in
[`docs/research/assets/progressive-jpeg-audit/`](./assets/progressive-jpeg-audit/). Each sample was
stripped, converted to sRGB, 4:2:0 chroma-subsampled, quality-controlled, and encoded with multiple
JPEG scans. `/usr/bin/file` identifies every committed `.jpg` as `progressive`.

Representative direct links:

- Cassian at 384 px: [q70](./assets/progressive-jpeg-audit/cassian-w384-q70.jpg),
  [q80](./assets/progressive-jpeg-audit/cassian-w384-q80.jpg),
  [q85](./assets/progressive-jpeg-audit/cassian-w384-q85.jpg)
- High-compression opaque PNG source at 384 px:
  [Sir Fabulous q80](./assets/progressive-jpeg-audit/sir-fabulous-w384-q80.jpg)
- Mislabeled opaque RGBA source at 384 px:
  [Jim as a kenku q80](./assets/progressive-jpeg-audit/jim-kenku-w384-q80.jpg)
- Social previews at 1200×630:
  [portrait-backed q80](./assets/progressive-jpeg-audit/social-cassian-w1200-q80.jpg),
  [portrait-backed q85](./assets/progressive-jpeg-audit/social-cassian-w1200-q85.jpg),
  [plain q80](./assets/progressive-jpeg-audit/social-plain-w1200-q80.jpg),
  [plain q85](./assets/progressive-jpeg-audit/social-plain-w1200-q85.jpg)

### Portrait bytes by width and quality

| Source         | Width |     q70 |     q80 |     q85 | q80 PSNR |
| -------------- | ----: | ------: | ------: | ------: | -------: |
| Cassian        |    96 |   2,742 |   3,280 |   3,712 | 30.93 dB |
| Cassian        |   192 |   7,977 |   9,955 |  11,526 | 31.70 dB |
| Cassian        |   384 |  27,744 |  35,261 |  41,569 | 32.14 dB |
| Cassian        |   768 | 113,073 | 146,537 | 174,303 | 32.26 dB |
| Cassian        |  1254 | 299,882 | 383,545 | 458,193 | 33.85 dB |
| Sir Fabulous   |    96 |   2,097 |   2,494 |   2,820 | 34.95 dB |
| Sir Fabulous   |   192 |   5,387 |   6,714 |   7,806 | 36.60 dB |
| Sir Fabulous   |   384 |  16,517 |  21,175 |  25,314 | 37.21 dB |
| Sir Fabulous   |   768 |  60,759 |  80,665 |  97,353 | 36.27 dB |
| Sir Fabulous   |  1254 | 160,579 | 209,122 | 249,705 | 37.31 dB |
| Jim as a kenku |    96 |   2,299 |   2,728 |   3,072 | 33.96 dB |
| Jim as a kenku |   192 |   6,411 |   7,896 |   9,139 | 35.32 dB |
| Jim as a kenku |   384 |  20,310 |  25,707 |  30,169 | 36.53 dB |
| Jim as a kenku |   768 |  70,937 |  90,846 | 107,538 | 38.86 dB |
| Jim as a kenku |   808 |  82,936 | 106,661 | 126,851 | 37.95 dB |

Visual inspection at native size found q70, q80, and q85 indistinguishable in 96–384 px slots. A 2×
enlarged crop of the 768 px Cassian image exposed mild q70 texture loss around hair and skin; q80
retained that texture well, while q85 added bytes with little visible benefit. That supports q78–80
for responsive portraits and q80–82 for fullscreen derivatives. The fixed social cards contain text,
so q85 is the conservative recommendation even though q80 also looked equivalent at native size.

### Full-size re-encoding and responsive examples

| Source         |  Original | Full progressive q80 | Saving | 64 px q80 |                          192 px q80 | 384 px q80 |
| -------------- | --------: | -------------------: | -----: | --------: | ----------------------------------: | ---------: |
| Sir Fabulous   | 2,510,449 |              209,122 |  91.7% |     1,550 |                               6,714 |     21,175 |
| Wolfie         | 2,012,017 |              168,869 |  91.6% |     1,493 |                               5,582 |     17,792 |
| Cassian        |   662,301 |              383,545 |  42.1% |     1,885 |                               9,955 |     35,261 |
| Devan          |   269,158 |              163,531 |  39.2% |     2,197 |                              12,035 |     37,678 |
| Jim as a kenku | 1,240,535 |              106,661 |  91.4% |     1,658 |                               7,896 |     25,707 |
| Jim            |   363,092 |              205,876 |  43.3% |     1,783 |                               8,628 |     29,022 |
| Swift          |   112,693 |               80,391 |  28.7% |     2,635 |                              13,672 |     37,615 |
| William        |     5,429 |                5,351 |   1.4% |     1,770 | 5,351 (natural width capped at 150) |      5,351 |
| Theron remote  | 1,728,415 |              294,671 |  83.0% |     1,258 |                               4,691 |     13,788 |

A six-size q80 tree (32, 64, 192, 384, 768, natural full) for all nine content sources totals
2,689,039 bytes across 54 derivatives, less than one current Sir Fabulous original. This is storage
evidence only; a visitor receives just the candidate selected for a slot.

### Social preview experiment

| Preview                              | Current PNG |    Progressive q80 | Saving | Progressive q85 | Saving |
| ------------------------------------ | ----------: | -----------------: | -----: | --------------: | -----: |
| Cassian portrait-backed              |     960,855 |             79,761 |  91.7% |          93,551 |  90.3% |
| Locations list, no raster background |     238,812 |             36,319 |  84.8% |          40,960 |  82.8% |
| All 350 previews                     | 111,485,151 | not batch-measured |      — |      19,413,461 |  82.6% |

The q80 and q85 cards retained crisp readable text at native 1200×630. Progressive JPEG is suitable
for these cards because they use gradients, photographs, large anti-aliased type, and no alpha.

### Progressive behavior

Google's browser-platform guidance describes progressive JPEG as full-frame scans that initially
show a low-detail image and refine it as transfer continues, with a small decode-cost tradeoff. It
also notes that progressive encoding is usually slightly smaller than baseline except for very small
files ([web.dev JPEG guide](https://web.dev/learn/images/jpeg)). This can improve perceived loading,
but it does not replace responsive sizing: a 2 KB right-sized image finishes before a 662 KB original
has had a chance to make progressive scans feel useful.

The encoder contract is also explicit in libjpeg-turbo: `-progressive` stores multiple scans of
increasing quality, allowing a decoder to show a quick low-quality first scan before refinement
([libjpeg-turbo usage](https://github.com/libjpeg-turbo/libjpeg-turbo/blob/main/doc/usage.txt)).

## Browser delivery contract

### `srcset` and `sizes`

Use width descriptors, not DPR-only descriptors, because the same portrait appears at many CSS
sizes. The HTML Standard requires every width descriptor to match the resource's natural width; when
`sizes` is present, all candidates must use width descriptors. `sizes` gives the intended layout
width, and the user agent combines it with device density and other conditions to select a candidate
([WHATWG images](https://html.spec.whatwg.org/dev/images.html)).
If `sizes` is omitted, browsers treat the source size as `100vw`, which is disastrous for a 14 or
20 px slot. Selection remains user-agent-discretionary, so browser tests should assert `currentSrc`
at representative viewport widths and device pixel ratios rather than assuming an exact candidate.

Component-specific contracts should be explicit:

| Component role                      | `sizes` contract                                                                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Entity reference                    | `14px`                                                                                                                                   |
| Campaign navigation                 | `20px`                                                                                                                                   |
| Event timeline                      | `48px`                                                                                                                                   |
| Journal mark                        | `(min-width: 640px) 64px, 56px`                                                                                                          |
| Journal reference                   | `32px`                                                                                                                                   |
| Previous portrait                   | `64px`                                                                                                                                   |
| Retired PC card                     | `112px` (or an exact small-viewport calculation before the max width is reached)                                                         |
| Active PC card                      | `(min-width: 432px) 176px, calc((100vw - 3rem) / 2)`                                                                                     |
| Detail portrait                     | `160px`                                                                                                                                  |
| Fullscreen                          | `(min-width: 640px) calc(100vw - 4rem), calc(100vw - 1.5rem)`; accept some over-selection for height-constrained portrait screens        |
| Future full-width map/content image | `(min-width: 1280px) 960px, (min-width: 1024px) calc(100vw - 23rem), calc(100vw - 2rem)`; verify against the real shell in browser tests |

The fallback `src` must also be a role-appropriate derivative, never the original. A build audit
should reject any prerendered content `<img>` whose `src` or `srcset` points at source-original
directories.

### Intrinsic dimensions and layout

Every image must include numeric `width` and `height` attributes with the derivative/source aspect
ratio while CSS controls its rendered size. The HTML Standard strongly encourages dimensions for
responsive/lazy images; without known dimensions a lazy image can begin at zero size and cause
selection or layout problems ([WHATWG images](https://html.spec.whatwg.org/dev/images.html),
[MDN `<img>` reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)).

For square-cropped avatar derivatives, use equal intrinsic dimensions. For fullscreen sources, use
the preserved source aspect. Map sources need an explicit decision because their data says 1200×700
while current CSS crops the UI to 3:1.

### Lazy loading and priority

- Do **not** set `loading="lazy"` on a likely LCP/above-the-fold detail portrait. Chrome's LCP
  guidance warns this always delays LCP. Keep it discoverable in prerendered HTML, use eager/default
  loading, and apply `fetchpriority="high"` only to the one image measured or strongly expected to be
  LCP ([web.dev LCP guidance](https://web.dev/articles/optimize-lcp)).
- Keep the visible 14/20 px navigation/reference images eager but right-sized; optionally mark
  non-critical navigation images `fetchpriority="low"` if measurement shows competition.
- Use native `loading="lazy"` for below-fold cards, previous portraits, maps, content images, and
  offscreen timeline/journal marks. Browser guidance says to omit lazy loading for hero/above-fold
  images and use it below the fold
  ([web.dev lazy-loading guidance](https://web.dev/learn/performance/lazy-load-images-and-iframe-elements)).
- The fullscreen image is conditionally mounted only after the user opens the viewer. Load it eagerly
  at that moment; do not preload every fullscreen candidate.
- Do not assign `fetchpriority="high"` to many images. It is a hint, and overuse removes its value.

## Netlify comparison

### Checked-in build derivatives — recommended

1. Store canonical originals outside `public/`.
2. Generate deterministic, content-addressed derivatives and a typed manifest locally.
3. Check the derivatives and manifest into Git. A cheap build verification step checks source
   digests, dimensions, scan mode, and manifest completeness without re-encoding; Netlify only copies
   static files. Run the encoder locally when a source changes.
4. Emit names such as `/media/<source-digest>/avatar-square-w64-q80.jpg`. Changing a source changes
   the URL.
5. Set `Cache-Control: public, max-age=31536000, immutable` for content-addressed derivatives.

This guarantees the progressive scan contract, eliminates on-demand transformation usage, works on
any static host, and makes browser-immutable caching safe. Netlify automatically caches static
assets at its edge for up to one year and invalidates them on atomic deploys; its default browser
header is `max-age=0,must-revalidate`, so explicit immutable browser caching is useful only when the
URL contains a content digest
([Netlify caching](https://docs.netlify.com/build/caching/caching-overview/)).

### Netlify Image CDN — viable optional alternative

Netlify documents on-demand relative or allowlisted remote sources, width/height, contain/cover/fill,
position, `fm=jpg`, integer quality, edge caching, atomic-deploy invalidation, and propagated custom
headers at `/.netlify/images`
([Image CDN overview](https://docs.netlify.com/image-cdn/overview/)). Image CDN is listed as available
on credit-based Free, Personal, and Pro plans
([platform primitives](https://docs.netlify.com/start/core-concepts/primitives/)).

The current Deploy Preview was probed with:

```text
/.netlify/images?url=/assets/pcs/cassian.jpg&w=<width>&fm=jpg&q=80
```

| Width |   Bytes | Observed format  |
| ----: | ------: | ---------------- |
|    32 |   1,060 | progressive JPEG |
|    64 |   1,984 | progressive JPEG |
|   192 |   9,556 | progressive JPEG |
|   384 |  33,426 | progressive JPEG |
|   768 | 139,147 | progressive JPEG |
|  1254 | 383,726 | progressive JPEG |

The 384 px response reported `Cache-Status: "Netlify Edge"; hit; ttl=31535998` and
`Cache-Control: public,max-age=0,must-revalidate`. This proves the current implementation works and
is edge-cached; it does **not** turn undocumented progressive output into an API guarantee. A
provider-side encoder change could legally keep returning JPEG but change scan mode.

Current credit-based Free provides 300 monthly credits with a hard limit. Production deploys cost
15 credits, bandwidth costs 20 credits/GB, web requests cost 2 credits/10,000, and preview/branch
deploys cost zero; image serving is included in web bandwidth
([Netlify credit rules](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)).
Netlify's current pricing explanation also states that Image CDN transformations have no separate
charge on the credit model
([Netlify pricing explanation](https://www.netlify.com/blog/pricing-netlify-for-3-billion-builders/)).
An account created before 2025-09-04 may instead be on Legacy Free, documented with 100 GB/month and
300 build minutes/month hard limits. Netlify records Image Transformations for legacy accounts but
directs owners to their dashboard for plan-specific usage rather than publishing one universal
allowance
([legacy plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/),
[legacy billing](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-for-legacy-plans/)).

Therefore Image CDN is plausibly free for this site's traffic, but “will never depend on a paid
allowance” is not proven until the owner checks the site's exact Billing details. Checked-in static
derivatives avoid that uncertainty entirely. Image CDN transformations happen on demand and do not
consume build time; by contrast, generating a fresh derivative tree during every Netlify build would
consume Legacy Free's 300 build minutes. Pre-generating and committing the tree avoids both costs.

## Pipeline safeguards

The production implementation should fail the build when any of these conditions is violated:

1. **Magic and extension:** decode every source and reject a mismatched extension (`jim-kenku.jpg`
   demonstrates why).
2. **Alpha:** reject meaningful alpha in content inputs; allow fully opaque RGBA to flatten. Maintain
   an explicit, narrow app-icon exception or require an approved opaque background.
3. **Natural dimensions:** record width/height/aspect in the manifest; never upscale and never label a
   derivative with a false `w` descriptor.
4. **Output mode:** use `file`, `identify`, or a JPEG parser to assert every content `.jpg` is
   progressive, not merely MIME `image/jpeg`.
5. **Byte regression:** cap every derivative relative to its source and class. At minimum, reject a
   variant larger than the source; stronger initial caps can use the measured table.
6. **HTML audit:** reject original source URLs in any content `<img>` `src`/`srcset`; reject missing
   `sizes`, `width`, or `height`; reject a likely LCP image marked lazy.
7. **Reference completeness:** fail if campaign data references a missing source unless it explicitly
   opts into the existing placeholder state. Generate portrait/event/social variants from one
   canonical media manifest so a reference cannot bypass optimization.
8. **Cache correctness:** only apply browser `immutable` to content-addressed URLs. Stable URLs must
   revalidate.
9. **Visual fixtures:** keep the portrait, opaque-PNG, text-heavy social, and eventual map samples as
   regression fixtures. Re-review at native size when encoder, quality, crop, or color handling
   changes.
10. **External media:** vendor Theron's current source into the canonical repository or explicitly
    proxy/snapshot it. Do not leave a 1.73 MB third-party URL outside the manifest and cache contract.

JPEG may be unsuitable for a future map, diagram, or screenshot with small text and hard edges;
Mozilla's format guidance recommends lossless formats when text must remain crisp
([MDN image formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)).
No real map raster exists today, so progressive JPEG for maps is not yet proven. Treat the first real
map as a required visual gate rather than asserting that “JPEG for everything” is already safe.

## Reproduction

Run from the isolated research checkout at the baseline above. ImageMagick 7 and macOS `file` were
used.

### Inventory format, dimensions, alpha, and bytes

```sh
for image_file in $(rg --files public -g '*.{png,jpg,jpeg,gif,webp,avif,bmp,tif,tiff}' | sort); do
  bytes=$(wc -c < "$image_file" | tr -d ' ')
  meta=$(identify -format '%w,%h,%m,%[channels],%[colorspace],%[interlace],%[opaque]' "$image_file")
  alpha=$(magick "$image_file" -alpha extract -format '%[fx:minima],%[fx:maxima]' info:)
  printf '%s,%s,%s,%s\n' "$image_file" "$bytes" "$meta" "$alpha"
done
```

### Find raster references and inspect prerendered markup

```sh
rg -n --glob '*.ts' --glob '*.tsx' \
  "avatar:\\s*['\"]|url:\\s*['\"]/assets/|type:\\s*['\"](?:image|map)['\"]" src/data
bun run build
bun run audit:public-build
rg -a -n -o '<img[^>]+>' \
  dist/client/pcs.html \
  dist/client/pcs/detail/jim.html \
  dist/client/beasts/detail/sir-fabulous-divine-steed.html
```

### Generate a true progressive derivative

```sh
magick public/assets/pcs/cassian.jpg \
  -auto-orient -colorspace sRGB -resize '384x>' -strip \
  -sampling-factor 4:2:0 -quality 80 -interlace Plane \
  docs/research/assets/progressive-jpeg-audit/cassian-w384-q80.jpg
file docs/research/assets/progressive-jpeg-audit/cassian-w384-q80.jpg
identify -verbose docs/research/assets/progressive-jpeg-audit/cassian-w384-q80.jpg \
  | rg 'Interlace|Quality|Sampling|Compression'
```

### Measure objective error

```sh
magick public/assets/pcs/cassian.jpg \
  -auto-orient -colorspace sRGB -resize '384x>' -strip /tmp/cassian-w384-reference.png
magick compare -metric PSNR \
  /tmp/cassian-w384-reference.png \
  docs/research/assets/progressive-jpeg-audit/cassian-w384-q80.jpg \
  null:
```

PSNR is supporting evidence, not the visual acceptance criterion. The samples were also inspected at
native size and with a 2× detail crop.

### Probe Netlify's current transformer

```sh
curl -L --output /tmp/netlify-cassian-w384-q80.jpg \
  'https://deploy-preview-95--the-lost-hope.netlify.app/.netlify/images?url=/assets/pcs/cassian.jpg&w=384&fm=jpg&q=80'
wc -c /tmp/netlify-cassian-w384-q80.jpg
file /tmp/netlify-cassian-w384-q80.jpg
curl -sSI \
  'https://deploy-preview-95--the-lost-hope.netlify.app/.netlify/images?url=/assets/pcs/cassian.jpg&w=384&fm=jpg&q=80'
```

The preview probe is dated evidence. Re-run it if Image CDN becomes the selected production encoder.
