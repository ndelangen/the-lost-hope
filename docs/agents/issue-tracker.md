# Issue tracker: GitHub

Work for this repo is tracked as GitHub issues on `ndelangen/the-lost-hope`. Skills that say
"publish to the issue tracker" or "fetch the relevant ticket" mean GitHub issues here.

## Which tool to use

- **Local checkout (Claude Code or Codex on the Mac):** use the `gh` CLI. It infers the repo from
  `git remote -v`.
- **Cloud sessions without `gh`:** use the GitHub MCP tools (`issue_read`, `issue_write`,
  `add_issue_comment`, `sub_issue_write`, `list_issues`). `gh api` may still be available for the
  operations MCP lacks (issue dependencies, database ids).

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."` (heredoc for multi-line
  bodies), or MCP `issue_write` with `method: create`.
- **Read an issue**: `gh issue view <number> --comments`, or MCP `issue_read` (`get`, then
  `get_comments`).
- **List issues**: `gh issue list --state open --label "..." --json number,title,labels,assignees`,
  or MCP `list_issues`.
- **Comment**: `gh issue comment <number> --body "..."`, or MCP `add_issue_comment`.
- **Labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- **Close**: `gh issue close <number> --reason completed` (or `--reason "not planned"`), or MCP
  `issue_write` with `state: closed` and a `state_reason`.
- Refer to issues by their **title** wrapped in a link in anything Norbert reads, not by a bare
  `#number`.
- Keep credentials and private hostnames out of issue text.

## Labels in use

`wayfinder:map`, `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`,
`wayfinder:task`. There is no triage label vocabulary in this repo.

## Wayfinding operations

Used by the `wayfinder` skill. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Destination / Notes /
  Decisions-so-far / Not yet specified / Out of scope body. Existing maps:
  `gh issue list --label wayfinder:map --state open`.
- **Child ticket**: an issue linked to the map as a GitHub **sub-issue**. Labels:
  `wayfinder:<type>`. Once claimed, the ticket is assigned to the driving dev (`ndelangen`). Link it
  with MCP `sub_issue_write` (`method: add`), or with:
  `gh api --method POST repos/ndelangen/the-lost-hope/issues/<map>/sub_issues -F sub_issue_id=<child-db-id>`
- **Blocking**: GitHub's **native issue dependencies**. Add an edge with
  `gh api --method POST repos/ndelangen/the-lost-hope/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`,
  where `<blocker-db-id>` is the blocker's numeric **database id**
  (`gh api repos/ndelangen/the-lost-hope/issues/<n> --jq .id`, _not_ the `#number` or `node_id`).
  `issue_dependencies_summary.blocked_by` counts open blockers only, so it is the live gate. If
  dependencies can't be written from the current session, put a `Blocked by: #<n>, #<n>` line at
  the top of the child body instead. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open sub-issues (MCP `issue_read` `get_sub_issues`, or
  `gh api repos/ndelangen/the-lost-hope/issues/<map>/sub_issues`), drop any with an open blocker or
  an assignee; first in map order wins.
- **Claim**: assign the ticket to `ndelangen` (`gh issue edit <n> --add-assignee @me`, or MCP
  `issue_write` with `assignees`) as the session's first write.
- **Resolve**: post the answer as a comment, close the issue, then append a context pointer
  (linked title + one-line gist, linking the resolution comment) to the map's Decisions so far.
