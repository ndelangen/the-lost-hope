# Feature-complete JavaScript boundary prototype

Prototype date: 2026-08-14

## Question

After removing the accidental full Game Icons namespace from the shared entry, does the current
fully hydrated application already beat the JavaScript delivery target while preserving every
feature, or is an experimental static/island cutover justified?

This is throwaway evidence for **Choose the feature-complete static and island architecture**, not
a production implementation. Run its build and transfer report with:

```sh
bun run prototype:feature-complete-js
```

The command runs the full local verification and production-bundle measurement but deliberately
does not render social cards. Social-image rendering belongs only to `bun run build:deploy`, which
is the command configured for Netlify.

## Compared boundaries

### Current full hydration with the icon collision

Every normal route receives the shared 7,500,551-byte entry, about 2.97 MB with gzip-9. The
[icon audit](https://github.com/ndelangen/the-lost-hope/blob/8bd41a0/docs/research/icon-bundle-audit.md)
attributes 89.98% of its mapped minified bytes to the full 4,040-export Game Icons barrel. All
features work, but the internal `/_icons` tool accidentally poisons ordinary public routes.

### Never-hydrated shell and route body

[Draft PR #95](https://github.com/ndelangen/the-lost-hope/pull/95) reduces `/events` to 199,764
referenced gzip bytes by keeping both the shell and route body out of the client graph. It preserves
the prerendered content but disables global search, mobile navigation, sidebar controls, timeline
hash tracking, and other interactions. Its interaction-loaded theme control also swallows the
pointer action that wakes it.

This proves static route delivery is possible, but not that the tested boundary is feature
complete. Its 93.3% headline also includes removal of the Game Icons accident.

### Icon-isolated full hydration

This prototype changes only the `/_icons` Game Icons namespace edge. It retains the existing
hydrated shell and route ownership, including all current state, effects, dialogs, filters, forms,
hover previews, timeline tracking, and client navigation.

It is the control needed after the audit: if it already clears the agreed 50% JavaScript target,
additional hydration boundaries must justify their complexity and feature risk independently.

The one-command production build measured:

| Cold route        | Current-main gzip-9 | Prototype gzip-9 | Reduction |
| ----------------- | ------------------: | ---------------: | --------: |
| `/`               |     2,976,323 bytes |    343,955 bytes |     88.4% |
| `/events`         |     2,975,330 bytes |    342,969 bytes |     88.5% |
| `/pcs/detail/jim` |     2,982,706 bytes |    350,326 bytes |     88.3% |
| `/locations/map`  |     2,976,126 bytes |    343,757 bytes |     88.4% |
| `/questions`      |     3,035,165 bytes |    402,802 bytes |     86.7% |

All 350 public pages still prerendered and the public-build audit found all 350 social images and
nine local content images. The internal icon catalogue remains deliberately large and lazy:
its UI chunk is 729.01 kB build gzip and its Iconify Game Icons data is 2,736.82 kB build gzip, but
neither is referenced by ordinary public route HTML.

## Architectural comparison

| Candidate                                        | Delivery consequence                                                                    | Feature consequence                                                                                                               | Verdict                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Compact build-generated shell/search projections | Could remove the remaining canonical campaign graph from the shared entry               | Introduces a second generated client representation and must reproduce search, sidebar previews, and reference behavior           | Defer unless a post-icon budget requires it                           |
| Native HTML for ordinary links and disclosures   | Removes JavaScript for interactions the platform already owns                           | Suitable for navigation and simple disclosure, not search, atlas filters, dialogs, persistence, or timeline tracking              | Adopt opportunistically in production code, not as a blanket boundary |
| Eager small islands                              | Can isolate focused controls while preserving their first action                        | The global shell is interaction-dense and shares query, drawer, persistence, navigation, preview, and canonical data              | Use only at a proven independent seam                                 |
| Interaction-loaded islands                       | Avoids downloading a feature until intent                                               | The tested TanStack boundary swallowed the triggering pointer action and nested islands inside a never-loaded module did not wake | Reject for essential first-click controls                             |
| Fully hydrated app after icon isolation          | Keeps the small framework, curated icons, campaign data, and existing feature ownership | Preserves all current behavior without experimental hydration semantics                                                           | Recommended production baseline                                       |

## Proposed production constraint

Keep the public application fully hydrated for this delivery cutover. Isolate the private
`/_icons` implementation from shared icon namespaces, preserve named curated imports, and add a
bundle-budget guard that fails if representative normal routes exceed the approved gzip ceiling.

Static route bodies and compact client projections remain valid future tools, but they should be
introduced only for a measured budget or interaction need. They are not required merely to achieve
the current 50% JavaScript target.

## Approval evidence still required

- The one-command measurement and exact route table pass.
- Local production-build browser QA passed for global search and navigation, desktop and mobile
  navigation, theme/sidebar persistence across reload, atlas filters and map/list URL state,
  correction access behavior, portrait dialog, timeline hashes, and the isolated `/_icons` tool,
  including `gi/GiEskimo`.
- The browser console had no warnings or errors.
- Repeat the same checks on the actual Deploy Preview.
- Obtain explicit user approval before resolving the Wayfinder prototype ticket.
