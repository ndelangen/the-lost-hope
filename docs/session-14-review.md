# Session 14 review

Session 14, The Serpent Lake, was played on 2026-09-03. Its fourteen events take place on campaign
day 22. The source is the supplied session transcript, with the author's corrections and map
references. The transcript itself is not included in the repository.

## Canon checks

- Jim ate the golden apple. Mage Hand's caster remains unspecified because the author recalled
  Cassian tentatively after first naming Swift. Cassian's Suggestion is recorded separately.
- Captain Squawk is Swift's parrot familiar, distinct from Crowy. The supplied portrait is retained
  as the source image and delivered through the responsive-image pipeline.
- The serpent survives behind the rockfall. The session ends with a short rest, an unfound flag,
  and an unfinished trial. The passage beyond the rest room remains unexplored.
- The trial disk closes the completed challenge's door. Its later custody and further purpose
  remain questions rather than invented facts.

## Event locations

| Scene                             | Location            |
| --------------------------------- | ------------------- |
| Trial disk and middle-door choice | Three-door chamber  |
| Golden apple                      | Golden-tree chamber |
| Elemental pillars                 | Pillar chamber      |
| Broken vine and rope descent      | Waterfall descent   |
| Serpent encounter and rescue      | Flooded cavern      |
| Rockfall                          | Far landing         |
| Short rest                        | Rest chamber        |

The maze map has six navigable pins. Events reference those canonical locations instead of adding
separate event coordinates.

## Map changes

Both illustrated maps are 1536 by 1024 pixels. The three-door room was extended with generated rock
surroundings; the approved maze already used 3:2. Earlier drafts and generation prompts are retained
in `output/imagegen/`.

Schematic maps also use 3:2. Default canvases expand from 1000 by 700 to 1050 by 700, with child pins
shifted 25 pixels right. Explicit 1200 by 700 schematic canvases expand to 1200 by 800, with child
pins shifted 50 pixels down. These translations preserve the existing local arrangement. The maze
artwork and its six coordinates are unchanged by the ratio conversion.

The schema rejects other map ratios. Asset tests compare source dimensions with the location
metadata and inspect every generated map variant for progressive JPEG encoding and proportional
dimensions. Lazy map images use automatic size selection with a fallback size hint.

## Verification

- `bun run verify`: type-checking, lint, formatting, reference and icon-catalog checks, 207 tests,
  a production build with 374 prerendered pages, and the delivery audit.
- Headless Chromium: desktop and mobile maps, six pin positions, pin navigation and current-place
  highlighting, nine event-to-location links, three schematic maps, and the world overview.
- Browser console and page-error checks.
- Full social-image rendering and the public-build audit run only during Netlify deployment.

Browser screenshots are in `output/verification/`. Production is unchanged until the PR is merged.
