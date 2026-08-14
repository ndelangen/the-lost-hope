# Responsive image delivery contract prototype

This throwaway prototype exists to choose the delivery contract for responsive progressive images
before the production pipeline is implemented. It is not intended to merge as product code.

Run it with:

```sh
bun run prototype:responsive-images
```

Then open `/locations/map?variant=B`. The normal `/locations/map` route is unchanged when no
`variant` query parameter is present. Use the floating control or the left and right arrow keys to
compare all three contracts:

- **A — Fidelity first:** progressive quality 85, dense candidates, and eager visible images. This
  is visually conservative but retains narrow transparency exceptions and spends more bytes.
- **B — Slot first (recommended):** progressive quality 80 content, quality 85 social cards,
  precise `srcset` and `sizes`, eager loading only for visible navigation and the measured LCP, and
  interaction-loaded viewer images. Required PNG/ICO app chrome is flattened onto brand navy.
- **C — Lean mobile first:** progressive quality 70 and a sparse candidate ladder. This saves the
  most bytes but shows avoidable risk in faces, gradients, and hard-edged labels.

The page reports the candidate the browser actually selected and its encoded size for representative
20 px navigation, 96 px card, mobile portrait, desktop portrait, hero, hard-edge map, viewer, and
1200 x 630 social slots. The committed samples are deliberately limited to this decision artifact;
the complete social-image set is generated only by `build:deploy`.

## Recommended production contract

- Keep originals outside the published directory and publish content-addressed derivatives with
  immutable caching.
- Use the smallest derivative as `src`, never the original, and provide intrinsic dimensions plus
  a role-specific `srcset` and truthful `sizes` value.
- Generate progressive 4:2:0 JPEG content at quality 80. Use widths 32, 64, 128, 192, 256, 384,
  and 512 for square/avatar roles, then 640, 768, 960, 1024, and 1280 for portrait/hero roles,
  capped and deduplicated at the source width.
- Use `loading="lazy"` below the fold. Only the measured LCP image receives eager loading and
  `fetchpriority="high"`; visible tiny navigation images may be eager.
- Load the large portrait candidate when the viewer opens instead of preloading it.
- Generate fixed 1200 x 630 progressive quality 85 social JPEGs only during deployments.
- Flatten required app PNG/ICO assets onto the opaque brand-navy background and remove the unused
  TanStack PNG, so no delivered image depends on transparency.
- Treat the first real raster map as a visual gate. Start with progressive quality 80 and grant a
  lossless exception only if labels or boundaries demonstrably fail visual review.
- Reject published originals, non-progressive content JPEGs, missing intrinsic dimensions, and
  slot candidates that exceed their agreed size budgets in CI.

The hierarchy maps currently rendered by the application are CSS/vector schematics and deliver no
raster bytes. The synthetic hard-edge map in this prototype tests the most likely JPEG failure mode
without inventing a production map asset.
