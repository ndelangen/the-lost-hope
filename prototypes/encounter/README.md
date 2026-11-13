# Encounter workflow prototype

This branch preserves the standalone local trial for [DM encounter tracking](https://github.com/ndelangen/the-lost-hope/issues/162). The roster uses campaign names and portraits, with sample combat statistics and legendary actions. Devan's effects reference the recorded campaign events.

From the repository root:

```sh
bun install --frozen-lockfile
bun prototypes/encounter/server.js
```

Open [the local encounter page](http://127.0.0.1:4317/dm/encounter-prototype). Browser state is saved locally for this origin. The prototype uses a separate Bun server alongside the campaign app.

To run the 13-combatant browser walkthrough with the server running:

```sh
bunx playwright install chromium
bun prototypes/encounter/smoke.ts
```

Set `ENCOUNTER_PORT` for both commands to use a different port. Set `ENCOUNTER_BROWSER_PATH` to use another Chromium executable. The walkthrough writes screenshots under the ignored `output/encounter-prototype` directory.

- [Legendary actions across the encounter](screenshots/after-legendary-row-detail.png)
- [Devan's effects in the roster and detail view](screenshots/readable-effects-detail.png)
- [Spent action state](screenshots/after-spent.png)
- [Comparison with existing trackers](reference-comparison.md)
- [Tracker and monster-source research](../../docs/encounter-tracker-research.md)

The [prototype ticket](https://github.com/ndelangen/the-lost-hope/issues/170) records the interaction requirements. Use them when encounter work resumes after the core scene workflow. Treat the screenshots as workflow examples. The campaign app's components and patterns should guide its eventual layout and styling.
