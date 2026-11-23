# The Novel

`/novel` tells the whole campaign as a comic book, almost entirely in pictures. Every played event
becomes one or more panels, laid out on 2:3 portrait pages that are read one page, or one two-page
spread, at a time. This guide covers how to check the work out, how the data is shaped, and how to
fill in the art.

## Run the reader locally

From a checkout of The Lost Hope, install dependencies and start the app:

```bash
bun install
bun run dev
```

Open `http://localhost:3000/novel?page=1`. Use the chapter and page selectors to jump ahead.
The arrow keys turn pages, and each page has its own link (`?page=N`). Wide windows show two facing
pages. Phones and tall windows show one.

## How the Novel is built

- `src/data/novel/page-NN.ts` holds one page each. `src/data/novel/_index.ts` lists them in reading
  order, so page N is the Nth entry there.
- `src/definitions/novel.ts` is the schema. A page is a list of **blocks**: a full-width **row**
  from a fixed set of layouts (`NOVEL_ROW_LAYOUTS`: splashes, halves, thirds, stacks, shards,
  cuts, tilts, staircases, insets, bleeds and more), or a **span**: a tall panel on one side next
  to a stack of rows.
- A **panel** names an event (`event: refs.events.n2_e023`) and takes its title, day and chapter
  from that event. It never repeats the event's facts.
- A panel's `art` is normally `{ from: 'event', index }`: one of the event's `illustrations`. New
  art goes into the event so every view of the event shows it. `{ from: 'novel', url }` is the rare
  exception for a picture that only works inside the Novel. A panel
  without `art` is drawn as a red **Missing art** panel.
- A panel's optional `review` flags art that is in place but not right: `regenerate` when the
  picture shows the wrong thing, `extend` when the content is right but the framing does not fit.
- `src/lib/novel-data.ts` resolves pages against campaign data. It also works out each panel's
  status and flags any picture whose shape is more than 15% off its panel's shape.
- `src/lib/novel-geometry.ts` turns blocks into SVG polygons with even gutters at any angle.
  `src/components/novel/` draws the pages and the reader.

### Layout rules (from Norbert)

- A page holds **6 to 9 panels**.
- Every chapter (session) **starts on a new page** with a **large opening panel**. This wins over
  the 6-to-9 rule for chapters too short to fill two pages.
- Pages never have gaps: every row layout tiles its row, and blocks are stretched to fill the page.
- "Comic style" means the layout only. Never restyle, filter or substitute the art itself.

`src/lib/novel-data.test.ts` checks these rules, the session order, and that every referenced
picture exists.

## Fill in the art

### 1. See what is needed

```bash
bun run novel:art                    # everything, in reading order
bun run novel:art -- --chapter 3     # one chapter
bun run novel:art -- --page 12       # one page
bun run novel:art -- --json          # machine-readable, same filters
```

Each line gives the chapter and page, the status (`missing`, `regenerate` or `extend`), the panel
shape and the **pixel size to generate at**, the event key, the event name and, for flagged art,
the reason and the current picture. The red panels in the reader show the same key, shape and size.

An event may have several pictures. A big moment can be told over two or three panels, each with
its own picture of the event: add the pictures to the event and the panels to the page, keeping
the page within 6 to 9 panels.

Work a whole page or chapter at a time, so neighbouring panels are consistent. Check each result in
the reader before moving on.

### 2. Learn the event before drawing it

Use the `campaign` MCP server for every picture. Claude Code starts it automatically from `.mcp.json`
(`bun run mcp`) in this checkout and in any worktree of it. It is read-only and reloads when the data
changes. Records can be named by ref (`refs.events.n2_e023`), by `kind:key` (`event:n2_e023`), by
slug, or by name.

**Always pass `includeDm: false` to `get`** while researching art. The default includes DM-only
fields such as `background` and secrets, and none of that may end up in a picture.

For each task line from `novel:art` (say `n2_e023 Mr. Peace joins for one session`):

1. `get` the event, `{ "record": "refs.events.n2_e023", "includeDm": false }`. Read its notes for
   what happens, where, on which day and who is there. Draw only that.
2. `get` each character the event names, also with `includeDm: false`. Their `avatar` (and, for a
   PC, any earlier portrait valid on that day) is the likeness to match: face, build, clothing,
   gear. For a creature or beast, use its record and portrait the same way.
3. `get` the event's location. Its `illustration` and `notes` set the scene: architecture, light,
   weather, scale. Parent locations help when the place itself has no picture.
4. `timeline` with `{ "session": <chapter number>, "detail": false }` lists the events around this
   one in order, so the picture continues the scene before it and leads into the next.
5. If the picture adds anything the notes do not state outright, such as a person in the
   background, a creature, or a visible effect, describe it to `check_idea` with the event and
   characters in `involves`. Drop anything it warns about: a record the party had not met, a
   retired or dead character, or something that contradicts an event.

`get` also tells you whether the party has met a record. Never put a record the party had not met
into a picture, even in the background. `overview` gives the campaign's current state if you need
your bearings, and `search` finds a record by name.

### 3. Generate the picture

- **Match the existing scene art** in `assets/images/content/scenes/`: painterly, richly detailed
  high-fantasy illustration, natural light, the same character designs. Read a few of those files
  before you start.
- **Size:** generate at the size `novel:art` gives, which is 1536 px on the long side in the
  panel's shape. Panels can be tall, wide or slanted. Keep faces and the key action well inside the
  frame, because slanted panels clip their corners and layouts may still be tuned.
- **No text, speech bubbles, captions or borders** in the picture. The page draws its own frames
  and chapter titles.
- Use `assets/images/content/novel/adventurers-guild-tattoo.png` whenever the guild tattoo is
  visible. The stencil shows a grim reaper strangling a shadow.
- Keep drafts and prompts under `output/`, which Git ignores.

### 4. Put it in place

New pictures belong to the **event**, so the event page, the session journal and the Novel all
show them. Panels then point at the event's picture.

1. Save the picture as `assets/images/content/scenes/<event-slug>.png`. Add `-2`, `-3` when an
   event gets several pictures.
2. Register it in `scripts/image-sources.ts`:

   ```ts
   {
     id: 'scenes-<event-slug>',
     role: 'illustration',
     logicalSource: '/assets/scenes/<event-slug>.png',
     repositoryPath: 'assets/images/content/scenes/<event-slug>.png',
   },
   ```

3. Add `'/assets/scenes/<event-slug>.png'` to the event's `illustrations` in
   `src/data/events/n2-eNNN.ts`, after any pictures it already has.
4. In the page file, point the panel at it: `art: { from: 'event', index: <its position> }`
   (`index` counts from 0; leave it out for the first picture).
5. For `regenerate`, replace the old picture in the event's `illustrations` with the new one, keep
   the panel's `index` pointing at it, and **delete the panel's `review`**. For `extend`, outpaint
   the existing picture to the panel's shape rather than redrawing it, replace it the same way, and
   delete the `review`.
6. Use `{ from: 'novel', url }` only for a picture that cannot stand for the event on its own, such
   as a close-up that only makes sense beside the panels around it. Save those under
   `assets/images/content/novel/` and register them with the id prefix `novel-`.

Follow the [campaign-images skill](../.claude/skills/campaign-images/SKILL.md) to store the source
artwork. On the Mac, run `bun run media:sync` to upload the artwork to R2 and update
`assets/images.lock.json`. Commit the registry, event and panel changes, and the updated lockfile.
Git ignores the originals and the generated responsive JPEGs.

### 5. Check it

```bash
bun run novel:art -- --page 12   # the task should be gone
bun run verify                   # types, lint, format, tests, build
```

Then look at the page in the reader at desktop and phone width, and check the browser console.

## Changing the layout

Layouts are data: edit a page file to swap a row's `layout`, move panels, or add a `span`. A row
must hold exactly as many panels as its layout has cells, and a page's blocks must come to about 1.5
page widths tall (the schema allows 12% slack and stretches the rest). Add a new row shape to
`NOVEL_ROW_LAYOUTS` as a convex polygon per panel, listed clockwise, tiling the row; the tests check
both. After moving panels, rerun `bun run novel:art`, because panel shapes and target sizes follow
the layout.
