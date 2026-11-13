# The Lost Hope DM tooling handoff

Start with the [DM tooling Wayfinder map](https://github.com/ndelangen/the-lost-hope/issues/143). Its issue links and native dependencies record the decisions and implementation work.

## Start here

- Base the scene and arc work on the [DM campaign model branch](https://github.com/ndelangen/the-lost-hope/tree/norbert/dm-campaign-model), commit `d1d7693`. It contains the schemas, generated references, and tests. The arc and scene registries are empty.
- Pick up [Build the DM dashboard and arc views](https://github.com/ndelangen/the-lost-hope/issues/152). Build the first view locally in the campaign app using its existing patterns. Review a concrete arc and scene walkthrough before choosing refinements. An arcs prototype is only useful if the walkthrough exposes a specific unresolved interaction.
- [The earlier unlisted dashboard branch](https://github.com/ndelangen/the-lost-hope/tree/norbert/dm-dashboard-access) and its [closed PR](https://github.com/ndelangen/the-lost-hope/pull/153) are reference material. Reassess the access and deployment approach against the accepted [player visibility](https://github.com/ndelangen/the-lost-hope/issues/145) and [static deployment](https://github.com/ndelangen/the-lost-hope/issues/148) decisions.

## First local walkthrough

Use the Fiddler and Jim's possible future as the Father to exercise overlapping arcs. The recorded hint in `refs.events.n2_e198` can appear in both arcs. Use a plot with prepared scene material and separate references to played events. The DM closes plots explicitly.

For the upcoming-session dashboard, use the split-party example in the dashboard ticket. Preview selected scenes across both groups with locations and portraits. Each preview opens its own scene page. The [scene selection decision](https://github.com/ndelangen/the-lost-hope/issues/172#issuecomment-6865775470) makes selection part of prep in chat with the DM. Opening or recording a scene leaves the selection alone. The dashboard also includes pins and links to Scenes, Arcs, and PCs.

Follow the repository's `AGENTS.md` and `docs/product-goals.md`. For code and data changes, run `bun run verify`. Show the local result before opening an implementation PR or deploying.

## Other work and references

- [Session import and plot updates](https://github.com/ndelangen/the-lost-hope/issues/157) uses the existing campaign skill and transcript or notes after play.
- [Local NPC drafting](https://github.com/ndelangen/the-lost-hope/issues/158) and [background portraits](https://github.com/ndelangen/the-lost-hope/issues/159) have their own implementation tickets. See [local agent research](https://github.com/ndelangen/the-lost-hope/tree/research/dm-local-codex) and [hosting research](https://github.com/ndelangen/the-lost-hope/tree/research/dm-player-hosting).
- [Encounter tracking](https://github.com/ndelangen/the-lost-hope/issues/162) resumes after the core scene workflow. The [runnable prototype](../prototypes/encounter/README.md) preserves the interactions we tested. Full playtesting and visual polish are deferred.
- [Live effects](https://github.com/ndelangen/the-lost-hope/issues/171) respond to DM-fired triggers and own their browser-local state. Browser-to-source transfer, hosted feedback, and in-encounter agent handoff are deferred until the DM asks.
