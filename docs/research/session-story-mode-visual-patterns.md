# Six visual patterns for Session Story View

Research note, 14 August 2026. This is design research, not an implementation specification. The six directions are intentionally far apart in information architecture, reading rhythm, and visual metaphor; the goal is to prototype real alternatives rather than six skins on the existing timeline.

## The problem, grounded in this product

The product is a player-first memory companion whose north-star questions include what happened, in what order, where the party went, who matters, and what a player missed. Its canon model gives each fact one owner: events own what happened, sessions own the real-world date and ordered event references, and locations own hierarchy and geography. It also explicitly separates the real-world session date from the fictional campaign day. Any Story View should therefore be a derived reading of canonical records, not a second hand-written recap. ([product goals](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/docs/product-goals.md#L3-L15), [canonical ownership](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/docs/product-goals.md#L28-L41), [two clocks](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/docs/product-goals.md#L62-L72))

The current session detail page derives the party and day-grouped timeline, but its event cards show only the event title, mark, and location; the reader follows the event link to read “What happened.” Story View’s defining change is consequently structural: place every event’s complete journal prose in session order on the session page, while links become optional exploration rather than gates to the story. ([session route](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/routes/sessions/detail.%24slug.tsx#L26-L84), [timeline event card](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/components/session-timeline.tsx#L48-L87), [event detail prose](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/routes/events/detail.%24slug.tsx#L65-L68))

The underlying shapes are unusually well suited to visual storytelling. A session has an icon, date, optional notes, and an ordered reference list; every event has a name, paragraph content, campaign day, location reference, avatar-or-icon mark, and optional image. Content paragraphs can already mix typed entity references and external links, and can also contain image, video, audio, or map atoms. ([session schema](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/definitions/session.ts#L8-L20), [event schema](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/definitions/event.ts#L9-L30), [content schema](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/definitions/content.ts#L6-L48))

The repository can resolve event locations and their ancestors, expand a session’s ordered events, and derive referenced PCs with canonical avatars. These should feed a pure Story View model; the visual layer should not re-parse prose strings or copy campaign facts. ([reference and location resolution](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/lib/campaign.ts#L94-L142), [session PC derivation](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/lib/campaign.ts#L354-L370), [session chronology read model](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/lib/campaign.ts#L476-L535))

### Representative stress test: Session 13, “The First Dungeon”

The latest checked-in session is a useful prototype subject: it orders twelve events and has no session-level recap. The story begins at the Serpent Eclipse entrance, passes through reception, a three-door chamber, a silenced passage, and a shadow arena, then moves to the Gruumsh War Temple for curse-removal rituals, a feast, and a werewolf discovery. The later events switch from generic event icons to canonical Cassian and Jim portraits. ([ordered session](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/sessions/the-first-dungeon.ts#L4-L24), [opening](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/events/n2-e123.ts#L4-L30), [shadow arena](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/events/n2-e127.ts#L4-L27), [Cassian ritual](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/events/n2-e131.ts#L4-L34), [werewolf discovery](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/events/n2-e134.ts#L4-L35))

This session also prevents a prototype from faking richness. Its event records have no event images, and its rooms inherit placeholder maps and use `[0, 0]` coordinates. A visual route can truthfully show sequence and containment, but not physical distance or dungeon geometry. The location schema itself distinguishes the canonical map asset, hierarchy, and coordinate fields; the Story View must preserve that distinction. ([location map and coordinate schema](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/definitions/location.ts#L35-L80), [Serpent Eclipse room example](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/locations/serpent-eclipse-shadow-arena.ts#L4-L16), [Gruumsh room example](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/locations/gruumsh-temple-library.ts#L4-L18))

## Shared prototype contract

All six prototypes should use the same content-completeness contract so the experiment compares layouts, not missing information:

1. Render the session’s events in canonical reference order, grouped by `Event.day`; within every event, render every `notes` paragraph in order. A session may span campaign days and a campaign day may span sessions, so the design cannot assume “one session equals one day.” ([campaign chronology rules](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/AGENTS.md#L48-L61))
2. Make the main document order the complete reading order: day heading, event heading, event metadata, complete prose, then the next event. Visual rearrangement must not scramble that sequence; WCAG requires a programmatically determinable correct order when sequence affects meaning. ([WCAG 2.2, Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence))
3. Keep reference links, map interaction, portrait enlargement, a table of contents, and motion optional. Reading the whole journal must require only ordinary page scrolling—never opening a card, slide, modal, popover, accordion, or map pin.
4. Use semantic day sections and event articles with descriptive headings. W3C’s page-structure guidance recommends meaningful elements and logical headings so screen-reader and keyboard users can navigate long pages efficiently. ([WAI Page Structure](https://www.w3.org/WAI/tutorials/page-structure/), [WAI Content Structure](https://www.w3.org/WAI/tutorials/page-structure/content/))
5. Collapse to one-dimensional vertical reading without loss at narrow widths or high zoom. WCAG 2.2’s Reflow criterion requires vertical content to work at a width equivalent to 320 CSS pixels without two-dimensional scrolling, except where a genuinely two-dimensional element requires it. ([WCAG 2.2, Reflow](https://www.w3.org/TR/WCAG22/#reflow))
6. Treat motion as enhancement. Scroll-linked highlights may respond to reading position, but the content cannot depend on animation; honor `prefers-reduced-motion`, and do not start long-running motion without a pause/stop/hide mechanism. ([CSS `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion), [WCAG 2.2, Pause, Stop, Hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide))
7. Give informative media a text alternative and hide purely ornamental marks from assistive technology. The current generic content renderer deliberately gives image/map atoms empty alt text, so Story View cannot assume those atoms are self-describing; using a canonical location name for an embedded location map is possible, while richer narrative images may eventually need a description field. ([current media rendering](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/components/content-renderer.tsx#L45-L67), [WCAG 2.2, Non-text Content](https://www.w3.org/TR/WCAG22/#non-text-content))

## Prototype 1 — The Illuminated Chronicle

**Primary metaphor:** a hand-made campaign chronicle: part medieval codex, part lavish Sunday magazine.

**Information architecture:** The real-world session is the volume title page; each campaign day is a chapter; every event is a titled passage within that chapter. The event prose is the dominant artifact. People, items, quests, and locations appear as marginalia beside the exact paragraph that references them, but the reference itself remains an inline link in the text.

**Reading rhythm:** slow, literary, and uninterrupted. Start with an oversized title spread, move into a narrow book-like measure, then punctuate the prose with occasional full-width “plates” at genuine location-complex changes. An event mark becomes an illuminated initial or wax seal, not a timeline bullet. Portrait marks can float into the margin and let text wrap around a deliberate silhouette on wide screens; CSS Shapes specifically supports defining a float area around which inline content wraps. ([CSS Shapes Level 1](https://www.w3.org/TR/css-shapes/))

**Session 13 treatment:** A cold, ink-black Serpent Eclipse chapter uses silver linework and serpent ornament. The move to the Gruumsh War Temple becomes a full-width crimson chapter plate. Cassian’s and Jim’s portrait-marked events interrupt the manuscript with oval painted miniatures; the final werewolf discovery receives a moon-shaped closing colophon. These are composition and decoration—the canonical prose and headings remain untouched.

**Media and canon wiring:** Use the session icon on the title page, event marks as initials/seals, `event.image` or content media as plates when present, and reference-derived entity labels in margins. If a location has a real map asset, treat it like a foldout plate between events; if not, show a small heraldic location icon rather than a fake map. Session notes, when present, become an editor’s preface.

**Responsive form:** Marginalia moves into full-width “scribe notes” immediately after the paragraph it annotates; decorative floats disappear; body prose stays in one column. Multi-column CSS can produce print-like columns, but the specification warns that columns taller than the viewport can create accessibility issues, so reserve columns for short title matter or a party roster, not the journal body. ([CSS Multi-column Layout Level 2](https://www.w3.org/TR/css-multicol-2/#accessibility-considerations))

**Prototype question:** Does making prose feel precious and collectible increase the desire to reread, or does ornament slow down factual recall?

## Prototype 2 — The Cartographer’s Descent

**Primary metaphor:** an expedition map that redraws itself as the reader travels.

**Information architecture:** Canonical event order remains the vertical spine, but events are grouped visually by their resolved location ancestry. A sticky left-hand atlas shows the current parent complex and the sequence of visited rooms; the right-hand column contains every event article in full. The map changes state at event boundaries without requiring clicks.

**Reading rhythm:** waypoint-driven. Each event is a stop with a strong place label, then two or three comfortable prose paragraphs. A location-complex transition is a long visual breath: the current diagram recedes and the next one replaces it.

**Session 13 treatment:** The first seven stops form a non-metric Serpent Eclipse route—Entrance → Reception → Three-Door Chamber → Left-Door Passage → Shadow Arena → Three-Door Chamber → Reception. The remaining stops form a Gruumsh Temple route. Because the canonical coordinates are not spatially meaningful for these rooms, label the graphic “story route, not to scale” and use a diagram, not a floor plan. Repeated rooms visibly loop back, giving the session a satisfying there-and-back shape without inventing geometry.

**Media and canon wiring:** Resolve `event.location`, its ancestors, icon, map availability, and coordinates through a pure view-model builder. A real canonical map can sit beneath route pins; absent that, use a parchment schematic of named stops. Event marks are pin symbols, portraits are waypoint medallions, and optional event/content images occupy the media field. Esri’s first-party StoryMaps documentation validates both ingredients: guided tours combine maps, media, and descriptive text in a sequential scroll, while “sidecar” blocks pair a changing media panel with a narrative panel and stack media over narrative on smaller screens. ([ArcGIS StoryMaps guided tours](https://doc.esri.com/en/arcgis-storymaps/latest/author-and-share/add-guided-tours.html), [ArcGIS StoryMaps sidecars](https://doc.esri.com/en/arcgis-storymaps/latest/author-and-share/add-sidecars.html))

**Responsive form:** On mobile, abandon sticky side-by-side composition. Put a compact route strip before each location group, then all prose below it. The strip may scroll horizontally as a genuinely two-dimensional diagram, but it cannot contain journal text or be the only place where order/location is communicated.

**Prototype question:** Does location choreography improve reconstruction of a session, even when the source model supports only containment and visit order rather than precise geometry?

## Prototype 3 — The Endless Graphic-Novel Reel

**Primary metaphor:** a vertical graphic novel/webcomic assembled from prose, portraits, symbols, and negative space.

**Information architecture:** Each event is a scene; each paragraph is a panel-sized narrative beat inside the event. The event heading and location are the scene slate. Unlike a card carousel, all panels are already on the page and the reader simply scrolls down the reel.

**Reading rhythm:** cinematic and elastic. Brief events can be two broad panels; denser events can alternate narration boxes, portrait close-ups, silhouetted icon panels, and a wide denouement panel. A combat event can use tight diagonal panels, while research or travel uses calm horizontal bands. The text itself remains live HTML rather than being baked into imagery.

**Session 13 treatment:** The blood-fed altar gets a severe three-panel doorway composition; the silenced passage becomes a large near-empty black panel with the prose set small and bright; the arena compresses into aggressive diagonals; the temple rituals become portrait close-ups; the feast is a saturated full-width band; and the final werewolf reveal ends on Cassian’s portrait eclipsed by a moon ring. No newly illustrated scene is required for the first prototype—the icon catalog, gradients, silhouettes, and existing portraits are enough to test the metaphor honestly.

**Media and canon wiring:** Event marks determine the panel’s emblem or portrait treatment; optional `event.image` and content media can replace an abstract panel when present; referenced entity links become visible but quiet nameplates in the narration. Audio and video, already valid content atoms, can appear inline with native controls rather than autoplaying. ([event and media-capable content schema](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/definitions/event.ts#L22-L30), [content media types](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/definitions/content.ts#L12-L17))

**Responsive form:** Mobile is the native form: one reel, one panel after another. Desktop adds asymmetry and occasional side-by-side panels, but DOM order stays linear. Optional gentle snap points may help panels settle without turning the page into slide navigation; CSS Scroll Snap exists specifically to give paging-like scroll positions, but the prototype should use proximity rather than mandatory trapping and must remain readable with snapping disabled. ([CSS Scroll Snap Level 1](https://www.w3.org/TR/css-scroll-snap-1/))

**Prototype question:** Can a layout create dramatic pacing from existing prose and marks alone, or does the comic metaphor make unillustrated events feel unfinished?

## Prototype 4 — The Investigator’s Evidence Constellation

**Primary metaphor:** a detective’s evidence wall crossed with an arcane conspiracy board.

**Information architecture:** The center is an unbroken numbered event docket containing the full prose. Around it sit derived evidence cards for the entities actually referenced in each event: people, locations, items, organizations, beasts, quests, and prior events. Decorative threads connect repeated references across scenes. Chronology stays vertical; relationship density spreads sideways.

**Reading rhythm:** forensic. Every event begins with a stamped case number, mark, day, and location, followed by the complete journal entry. After the prose, a concise “evidence in this scene” shelf offers the resolved references; recurring names gain a faint thread that the eye can follow down the whole session. The reader can scan causality without leaving the narrative.

**Session 13 treatment:** The Serpent Eclipse Trial Disk thread visually connects the dragon-horn transformation to later ownership references; the Gruumsh High Priest recurs through ritual scenes; Jim’s earlier Fiddler event reference appears as a pinned prior-case citation; the Wolfie Tracking Ring thread grows progressively heavier until the werewolf conclusion. The board must label these only as “referenced,” never infer that a relationship is causal, resolved, or newly learned unless canon says so.

**Media and canon wiring:** Derive every pin from typed refs in `Content`, resolve its canonical label/avatar/icon, and deduplicate per event. SVG threads are decorative and `aria-hidden`; the equivalent relationship list is in normal HTML immediately after the prose. This follows the project rule that relationships are references and derived views rather than parallel copied facts. ([structured content and references](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/data/AGENTS.md#L7-L35), [reference resolution](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/lib/campaign.ts#L94-L112))

**Responsive form:** Remove all crossing lines and side positioning. Each event becomes a full-width dossier sheet followed by a horizontally wrapping evidence strip. Nothing is lost: the visual graph is a redundant enhancement over explicit text links.

**Prototype question:** Does relationship-first presentation help players remember unresolved threads, or does it visually overstate incidental references?

## Prototype 5 — The Living Stage

**Primary metaphor:** a theatrical performance: playbill, acts, scenes, sets, cast entrances, and curtain calls.

**Information architecture:** Session date and party become the playbill; campaign days become acts; a change of canonical location becomes a scene/set change; events are numbered beats within the scene. Each event’s full prose is the libretto, not converted into dialogue. People referenced in the event enter the cast rail beside that beat and leave visually afterward.

**Reading rhythm:** performative and episodic. An act curtain supplies a strong day boundary. Scene headings are short and theatrical, followed by generous text blocks on a “stage.” Set changes create darkness and breathing space. Recurring characters give continuity through portraits at the proscenium edge.

**Session 13 treatment:** It is a one-act performance with two major sets: the Temple of the Serpent Eclipse and the Gruumsh War Temple. The return to the reception hall can reuse the earlier set dressing; the ritual room becomes a tight spotlight; the Blood Hall becomes a riotous ensemble scene; the library closes in a moonlit single-character pool. The existing event names remain the beat headings, avoiding invented scene summaries.

**Media and canon wiring:** Use `sessionPcs` for the playbill but use per-event references for the scene rail. Crucially, a mention is not proof of physical presence or speech, so label the rail “in this entry” rather than “on stage” unless the domain later gains explicit participant data. Canonical portraits are cast headshots; event marks become prop/set symbols; location ancestry decides when a major backdrop changes. The current `sessionPcs` implementation explicitly derives its result from PC references in event notes, which makes this caution necessary. ([session PC derivation](https://github.com/ndelangen/the-lost-hope/blob/9c5f9d4bdbe54efa8532bff2bb8534f08f0b7100/src/lib/campaign.ts#L354-L370))

**Responsive form:** The proscenium collapses into a normal article. The cast rail becomes an avatar strip under each event heading, curtains become section dividers, and prose remains full width. Avoid automatically advancing scenes or playing background audio; time-based effects would work against a reader-controlled journal.

**Prototype question:** Does a cast-and-set model make a session easier to retell aloud, or does theatrical framing feel too fictionalized for a memory tool?

## Prototype 6 — The Party Score

**Primary metaphor:** an orchestral score or encounter tracker in which characters are instruments and events are measures.

**Information architecture:** A narrow ensemble legend establishes character/avatar lanes. Events run vertically as full-width measures in canonical order; each measure contains the complete prose. The side gutter shows only the canonical people referenced in that entry, while location, item, organization, and beast refs become small “motifs” beneath the measure. Day boundaries are movements, not merely sticky labels.

**Reading rhythm:** pulse-driven. Event marks are downbeats. Repeated references create visual leitmotifs; an avatar mark becomes a solo; paragraphs form sub-beats inside the measure. Dense scenes feel like a full ensemble, while solitary discoveries become quiet solos. The design is highly scannable but still reads top-to-bottom like a document.

**Session 13 treatment:** The party opens as an ensemble at the dungeon entrance. The shadow arena becomes a dense tutti measure. Cassian receives a portrait solo during curse removal, Jim during pain removal and sword cleansing, the feast restores the ensemble, and the last event resolves into a Cassian/Wolfie two-note motif. The visuals may reflect only who or what is referenced—not quantify importance, agency, attendance, or sentiment.

**Media and canon wiring:** Resolve typed references per event and map kind to a visual voice: PC/NPC avatar when available; item, organization, beast, location, quest, or prior-event icon otherwise. Use the existing event mark as the downbeat, not as a substitute for entity-reference analysis. Optional images/maps occupy an “interlude” between measures; inline media remains in its original paragraph position so the journal sequence is preserved.

**Responsive form:** Replace parallel character lanes with a small wrapped ensemble strip inside each event header. Decorative recurrence lines disappear. The score metaphor survives through measure rules, downbeat marks, and movement headings, while the page becomes an ordinary single-column article at 320 CSS pixels.

**Prototype question:** Does participant-first rhythm reveal who drives a session, or does reference frequency create misleading emphasis even with careful labeling?

## Design-opportunity matrix

| Prototype | Organizing axis | Reading rhythm | Signature visual | Best use of existing data | Deliberate limitation | Primary risk to test |
| --- | --- | --- | --- | --- | --- | --- |
| Illuminated Chronicle | Day → event → paragraph | Literary, slow, collectible | Marginalia, illuminated marks, chapter plates | Full `Content`, refs, event marks, portraits | No invented illustration required | Ornament may impede recall |
| Cartographer’s Descent | Visit order + location ancestry | Waypoints and set-piece transitions | Sticky route/map choreography | Event location, ancestors, maps, icons, coordinates | Non-metric diagram when geometry is unknown | A schematic may be mistaken for a real map |
| Endless Graphic-Novel Reel | Event scene → paragraph panel | Cinematic, elastic, dramatic | Continuous vertical panel reel | Marks, portraits, optional event/content media | Live prose, never text baked into art | Sparse imagery may feel unfinished |
| Evidence Constellation | Chronology + reference graph | Forensic, cross-linked | Dossier cards and recurring evidence threads | Typed refs across every event | Threads are redundant decoration | Incidental refs may look causal |
| Living Stage | Day act → location scene → event beat | Episodic, performative | Playbill, set changes, cast rails | Date, days, location ancestry, portraits | Mentions labeled as mentions, not attendance | Framing may over-fictionalize memory |
| Party Score | Chronology + referenced-entity lanes | Pulsed, ensemble/solo | Measures, downbeats, leitmotifs | Per-event refs, avatars, kind icons, marks | No importance score inferred | Frequency may imply false prominence |

## Cross-prototype decisions the visual test should expose

- **How much derived editorial framing is welcome?** The Chronicle and Reel are highly authored; the Atlas and Evidence Board foreground records; the Stage and Score sit between them.
- **What should a reference look like while reading?** Inline links are canonical and should remain. The prototypes separately test quiet marginalia, map pins, nameplates, evidence cards, cast rails, and motifs as redundant affordances.
- **How should missing media feel intentional?** Session 13 can reveal whether abstract iconography and layout are enough. A prototype that looks broken without unique art is not robust against the current data model.
- **How visible should the two clocks be?** Every direction should show the real play date once and campaign-day boundaries in the story. The test is whether those clocks need equal visual weight.
- **How much motion helps?** CSS can drive animation from scroll progress, but the journal must remain complete and coherent when that enhancement is unsupported or reduced. ([Scroll-driven Animations specification](https://www.w3.org/TR/scroll-animations-1/))
- **What is the right information density?** Every prototype should use the identical Session 13 story payload. Comparing equal content makes it possible to judge whether the concept improves memory, orientation, and delight rather than merely hiding material.

## Suggested prototype fidelity

Build each direction as a real route-level Story View using Session 13’s canonical data, but keep behaviors cheap: no new schema, no new canon, no bespoke illustrations, no hand-authored recap, and no map geometry beyond what the model actually knows. Each prototype should demonstrate desktop and narrow-mobile states, motion-reduced behavior where motion is used, complete keyboard traversal, and a visible end-of-session state. The six are experiments; selecting and combining their strongest ideas is a later decision.
