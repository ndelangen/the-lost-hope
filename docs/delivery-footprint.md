# Delivery-footprint contract

This site keeps all 374 public routes prerendered while reducing the bytes sent to a visitor. The
repository size is deliberately not a constraint: source rasters and generated derivatives are
committed so delivery stays deterministic and independent of a paid image service.

## JavaScript

The production baseline captured on 2026-08-14 used `/assets/index-C5ZsIb1J.js`: 7,501,415 raw
bytes, 2,973,770 bytes when compressed locally with gzip, and 2,995,745 transferred bytes from
Netlify with its current gzip encoding. The full `react-icons/gi` namespace entered that shared
entry through the internal `/_icons` catalogue.

The catalogue now keeps its full Lucide and Iconify data behind the `/_icons` route. The single
legacy Game Icons glyph that is not available in Iconify is an inline SVG, so normal public routes
do not import the `react-icons/gi` namespace. `bun run audit:delivery` walks each representative
route's static module graph and rejects either catalogue chunk in the initial graph.

## Images

Content rasters live under `assets/images/`; originals are never copied to `public/`. Running
`bun run generate:images` creates content-addressed progressive JPEG derivatives at q80 with 4:2:0
chroma subsampling. Every responsive image receives:

- the 32 px candidate as its fallback `src`;
- an exact `srcset`, truthful `sizes`, and intrinsic dimensions;
- a role-specific maximum width for small avatars;
- lazy loading except for the four portraits in the navigation.

The four 20 px navigation portrait originals total 1,407,244 bytes. Their 64 px derivatives total
8,255 bytes, a 99.4% reduction. The eight original local content rasters total 7,175,674 bytes;
their largest generated candidates total 1,323,923 bytes, an 81.5% reduction even when each is
displayed at its maximum published size.

Social previews are a separate deployment-only pipeline. Netlify runs `bun run build:deploy`,
which creates all 374 previews as 1200 by 630 progressive q85 JPEGs and validates them. Local
development, tests, and ordinary builds generate paths only and cannot render the full social set.
Opaque PNG and ICO files remain for app icons; the unused TanStack PNG is not published.

## Reproduce the checks

```sh
bun run verify
```

That command regenerates responsive images, checks refs and the icon catalogue, type-checks,
lints, checks formatting, runs the test suite, builds and prerenders the site, and audits the
delivery graph and image encodings. It writes the build-comparable route measurements to
`dist/delivery-footprint-report.json`. The Netlify-only build additionally generates and audits all
social previews.
