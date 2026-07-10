---
name: review-ui-architecture
description: >-
  Review or refactor React UI architecture when a request explicitly concerns responsibility
  boundaries, high complexity, mixed data and rendering logic, artificial sub-views, structural
  duplication, dead code, component extraction, or reusable UI design. Use for architecture-focused
  work on React routes, screens, components, and view models. Do not use for routine copy or styling
  changes, isolated bug fixes, or ordinary feature work unless structural architecture is requested.
---

# Review UI Architecture

Follow the repository `AGENTS.md`, especially `UI architecture`. Preserve behavior unless the user
requests a product change.

## 1. Select the mode

- **Review mode:** Use by default. Inspect and report only. Do not edit because a recommendation is
  clear or because the request asks to diagnose, assess, or review.
- **Refactor mode:** Use only when the user authorizes edits. Implement only the authorized
  dependency slice.

## 2. Bound the dependency slice

Start from the requested entry point. Inspect its direct callers, direct dependencies, tests, and
relevant import sites. Trace props and data from screen inputs through builders to rendered output.
Report adjacent candidates separately; do not edit them without authorization.

Search repository-wide usage before calling code dead. Treat an unused import or an apparently
unreachable local path as a lead, not proof.

## 3. Evaluate responsibilities

Apply the component-purpose test and the other UI invariants in `AGENTS.md`. Map each relevant unit
to screen orchestration, pure data/view-model logic, presentational UI, or a focused domain UI
adapter. Treat line count only as a discovery signal.

Prioritize findings that have a concrete maintenance, correctness, reuse, accessibility, or
dependency-direction failure mode. Do not recommend an abstraction based only on similar JSX.

## 4. Report review findings

List material findings in priority order. For each finding include:

- severity and file/line;
- current responsibility and data flow;
- concrete failure mode;
- evidence from definitions, callers, imports, or tests;
- proposed owner or boundary.

State explicitly when no material finding is supported. Keep speculative or out-of-scope candidates
separate from actionable findings.

## 5. Refactor the authorized slice

In refactor mode, implement the smallest coherent final boundary. State the purpose and owner of any
new component or builder. Add focused tests for pure derivations and important behavior.

“Atomic” means updating every affected definition, caller, import, and test and deleting the obsolete
boundary within the authorized slice. It does not authorize adjacent cleanup or repository-wide
redesign.

## 6. Validate

- In review mode, run only the non-mutating checks needed to substantiate findings; do not imply
  that unmodified behavior was revalidated.
- In refactor mode, run focused tests while iterating, then `bun run verify`. Exercise affected flows
  in a browser and check the console after automated verification passes.

Report unavailable validation instead of implying it ran.

Report boundaries changed, obsolete code removed, focused tests added, commands and browser flows
run, and evidence-backed candidates intentionally left outside scope.
