# Revised v3.5 SRD beast integration

This package combines the Huge Shark trial, the three-viper trial and the 18-beast batch. Together they cover the 22 Revised v3.5 SRD beasts that still required source lookup. Both patches passed `git apply --check` against the library checkout. I applied them together in a temporary copy and loaded the catalog there.

| File | Contents |
| --- | --- |
| [Rules patch](rules.patch) | Adds all 22 combat profiles and source links. Fills Dog's CR of 1/3. |
| [Portrait registry patch](portrait-registry.patch) | Registers six new square portraits by beast entry ID. |
| [Portrait manifest](portrait-files.json) | Gives the staged PNG paths, destination paths, exact SRD version keys and SHA-256 hashes. |
| [Portrait comparison](../srd35-beasts-02/portrait-before-after.jpg) | Shows the six revised gray-tan parchment portraits alongside their first drafts. |
| [Verification](verification.json) | Records the baseline commit and counts. |

The catalog loaded all 22 as combat summaries at their original version keys. Each appeared in searches by habitat and appearance. Each of the six PNGs resolved as the primary portrait with its expected hash. All galleries retained their existing images, order and credits after the primary additions, including Raven's two local illustrations. [Before](catalog-before.json) · [After](catalog-after.json)

The rules patch can be applied separately. For the portraits, copy the six original PNGs to the `repositoryPath` values in the manifest, apply the registry patch, then use the campaign's media sync workflow to produce the lock update. I tested this registration locally and left the shared checkout and R2 untouched. If nearby edits make either patch stale, the [profile objects](profiles.json) and [source rows](source-rows.tsv) are available for applying the changes by exact catalog identity.

The original handoffs preserve the sources and the printed-versus-errata decisions. [Huge Shark](../huge-shark/handoff.md) · [Three vipers](../srd35-vipers-01/handoff.md) · [18-beast batch](../srd35-beasts-02/handoff.md)
