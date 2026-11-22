---
name: campaign-images
description: >-
  Add, revise, remove or use campaign artwork (NPC/PC/beast portraits, location illustrations,
  maps, scene art, handouts). Covers where originals go, registering them, uploading them to R2
  with media:sync, pointing campaign data at them, and fixing image sync errors. Use whenever a
  task creates or changes a raster under assets/images/ or makes a record show an image.
---

# Campaign images

Original artwork is stored in Cloudflare R2 (bucket `thelosthope-media-src`), not git. Git keeps
`assets/images.lock.json`, which records each registered original by SHA-256. Files still sit at
their usual paths under `assets/images/` on disk, so code and data refer to them exactly as before.

Three places hold an image's facts, each owning a different one:

- `scripts/image-sources.ts` owns the image: `id`, `role` (`avatar`, `map` or `illustration`),
  `logicalSource` (the `/assets/...` path data uses) and `repositoryPath` (the file on disk).
- The campaign record owns the use: for example `avatar: '/assets/npcs/<slug>.png'`,
  `illustration: '/assets/locations/<slug>.png'` or a location's `map.url`. Use the
  `logicalSource` string exactly.
- `assets/images.lock.json` is derived by `media:sync`. Never edit it by hand.

## Add an image

1. Make or receive the art. Keep drafts, prompts and uncropped backups in `output/` (ignored).
2. Shape it for its role, following AGENTS.md "Map artwork":
   - avatar: square, cropped so the face reads in a circular thumbnail; never stretch.
   - map: 3:2 landscape, new art at 1536 by 1024; store real dimensions in the location's `map`.
   - illustration: whatever the scene needs.
3. Save it at `assets/images/content/<kind>/<slug>.png` (kinds: `npcs`, `pcs`, `beasts`,
   `locations`, `scenes`) or `assets/images/maps/<slug>.png`.
4. Register it in `scripts/image-sources.ts` with `id`, `role`, `logicalSource` and
   `repositoryPath`. Only registered files are uploaded.
5. Point the campaign record at its `logicalSource` (see `src/data/AGENTS.md` for the record).
6. Upload it:
   - On the Mac: `bun run media:sync`. It uploads with the Mac's `wrangler` login and rewrites the
     lock. If wrangler is not signed in, run `bunx wrangler@4.156.0 login` once.
   - In a cloud session (no wrangler login): `git add -f <the file>` and say in the PR that it
     needs `bun run media:sync --adopt` on the Mac before merge. The `media:gate` check stays red
     until then.
7. `bun run generate:images` (or `bun run dev`) builds the responsive JPEGs.
8. Commit `scripts/image-sources.ts`, the data change and `assets/images.lock.json`. Do not commit
   the raster (git ignores it) or anything under `public/assets/generated-images/`.

The DM screen's NPC portrait tool does steps 3 to 7 itself.

## Revise an image

Replace the file at the same path, then `bun run media:sync` and commit the lock. The old version
stays in R2, so reverting the lock commit brings it back.

## Remove an image

Remove its entry from `scripts/image-sources.ts` and every record that uses its `logicalSource`,
delete the file, then `bun run media:sync` (it drops the lock entry). R2 keeps the object.

## Getting a checkout's images

`generate:images`, and so `dev`, `test`, `build` and `verify`, fetches any missing original by
itself. Every clone and worktree on the Mac shares one store, `~/.cache/the-lost-hope/media-originals`, so only art this Mac
has never seen is downloaded. After that it works offline.

## Errors

- "differs from assets/images.lock.json": the file was edited here. Run `bun run media:sync` to
  upload it, or delete the file to take the locked version.
- "registered but has no file and no lock entry": the registry names art that was never uploaded.
  Find the file (often on another branch or in `output/`) and add it, or remove the registration.
- "could not fetch": offline, or the object is missing. Reconnect and retry.
- `media:gate` "committed to git": run `bun run media:sync --adopt` on the Mac and commit.
- `media:gate` "not in R2": the lock was committed without uploading. Run `bun run media:sync`
  on the Mac.
- A conflict in `assets/images.lock.json` after a merge: run `bun run media:sync`. It keeps both
  sides and stops only if the same path has two different images.
