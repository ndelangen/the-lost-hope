/**
 * List every ability whose text may leave an effect on someone (a condition, a save DC, a
 * structured save) and that has no `effects` yet, in batches for extraction agents.
 *
 *   bun library-workers/effects/export-candidates.ts <out-dir> [batch-size]
 *
 * Writes `<out-dir>/batch-NNN.json`, each a list of candidates. A candidate names its file,
 * creature (`null` for one-entity campaign files) and ability, and carries what the agent needs.
 */
import { execFileSync } from 'node:child_process'
import { globSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

import { CONDITION_KEYS } from '#/lib/rules'

const root = join(import.meta.dirname, '../..')
const [outDir = '/tmp/effects', size = '20'] = process.argv.slice(2)
const conditions = new Set<string>(CONDITION_KEYS)

type Candidate = {
  file: string
  creature: string | null
  name: string
  ability: Record<string, unknown>
}

function abilitiesOf(stats: any): any[] {
  return [
    ...(stats.abilities ?? []),
    ...(stats.legendary?.actions ?? []),
    ...(stats.lairActions ?? []),
  ]
}

function candidate(ability: any) {
  if (ability.effects) return false
  const tokens = [...(ability.text ?? []), ...(ability.save?.onFail.also ?? [])]
  return Boolean(
    ability.save ||
      tokens.some(
        (token: any) =>
          typeof token === 'object' &&
          ((token.ref === 'rule' && conditions.has(token.key)) || 'dc' in token),
      ),
  )
}

// Files nobody has committed yet are another piece of work in progress.
const tracked = new Set(
  execFileSync('git', ['ls-files', 'src/data'], { cwd: root, encoding: 'utf8' }).split('\n'),
)

const out: Candidate[] = []
const scan = async (pattern: string, library: boolean) => {
  for (const path of globSync(pattern, { cwd: root }).toSorted()) {
    if (path.endsWith('_index.ts') || path.endsWith('.test.ts') || !tracked.has(path)) continue
    const module = await import(join(root, path))
    const entries: [string | null, any][] = library
      ? Object.entries(module.default.monsters ?? {})
      : [[null, module.default]]
    for (const [creature, record] of entries) {
      if (!record?.stats) continue
      for (const ability of abilitiesOf(record.stats))
        if (candidate(ability))
          out.push({
            file: relative(root, join(root, path)),
            creature,
            name: record.name,
            ability: {
              key: ability.key,
              name: ability.name,
              timing: ability.timing,
              ...(ability.attack ? { attack: ability.attack.kind } : {}),
              ...(ability.save ? { save: ability.save } : {}),
              text: ability.text,
            },
          })
    }
  }
}

await scan('src/data/beasts/*.ts', false)
await scan('src/data/pcs/*.ts', false)
await scan('src/data/npcs/*.ts', false)
await scan('src/data/library/monsters/*.ts', true)

mkdirSync(outDir, { recursive: true })
const perBatch = Number(size)
// Keep each file's abilities together so one agent sees a creature whole.
out.sort((a, b) => a.file.localeCompare(b.file))
for (let index = 0; index * perBatch < out.length; index++)
  writeFileSync(
    join(outDir, `batch-${String(index + 1).padStart(3, '0')}.json`),
    JSON.stringify(out.slice(index * perBatch, (index + 1) * perBatch), null, 1),
  )
console.log(`${out.length} candidates in ${Math.ceil(out.length / perBatch)} batches → ${outDir}`)
