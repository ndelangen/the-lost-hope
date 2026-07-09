#!/usr/bin/env bun
/**
 * One-shot migration: replace registry object imports with refs.* tokens.
 * Run: bun scripts/migrate-refs.ts
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DATA_ROOT = join(import.meta.dir, '../src/data')

const REGISTRY_NAMES = [
  'events',
  'npcs',
  'pcs',
  'locations',
  'quests',
  'sessions',
  'organizations',
] as const

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(path)))
    else if (entry.name.endsWith('.ts') && entry.name !== '_index.ts' && entry.name !== 'refs.ts')
      files.push(path)
  }
  return files
}

function migrateContent(source: string): string {
  let out = source

  for (const name of REGISTRY_NAMES) {
    // Avoid double-prefixing
    out = out.replaceAll(`refs.${name}.`, `__REFS_${name}__`)
    out = out.replace(new RegExp(`(?<!refs\\.)\\b${name}\\.`, 'g'), `refs.${name}.`)
    out = out.replaceAll(`__REFS_${name}__`, `refs.${name}.`)
  }

  // Direct sibling entity imports used as parent/refs (e.g. import world from './world.ts')
  out = out.replace(
    /^import\s+(\w+)\s+from\s+'\.\/([a-z0-9-]+)\.ts'\s*$/gm,
    (_match, varName, fileStem) => {
      const key = fileStem.replace(/-/g, '_')
      out = out.replace(new RegExp(`\\b${varName}\\b(?!\\.)`, 'g'), (m, offset, str) => {
        const before = str.slice(Math.max(0, offset - 20), offset)
        if (before.includes('import ')) return m
        return `refs.locations.${key}`
      })
      return ''
    },
  )

  // Remove registry _index imports
  for (const name of REGISTRY_NAMES) {
    out = out.replace(
      new RegExp(`^import\\s+${name}\\s+from\\s+'#/data/${name}/_index\\.ts'\\s*\\n`, 'gm'),
      '',
    )
  }

  // Collapse extra blank lines after import removal
  out = out.replace(/\n{3,}/g, '\n\n')

  if (out.includes('refs.')) {
    if (!out.includes("from '#/data/refs.ts'")) {
      const importBlockEnd = out.match(/^import[\s\S]*?(?=\n\n|export)/)?.[0]?.length ?? 0
      if (importBlockEnd > 0) {
        out =
          out.slice(0, importBlockEnd) +
          "\nimport { refs } from '#/data/refs.ts'" +
          out.slice(importBlockEnd)
      } else {
        out = "import { refs } from '#/data/refs.ts'\n\n" + out
      }
    }
  }

  return out
}

const files = await walk(DATA_ROOT)
for (const file of files) {
  const before = await readFile(file, 'utf8')
  const after = migrateContent(before)
  if (after !== before) {
    await writeFile(file, after)
    console.log('updated', file.replace(DATA_ROOT + '/', ''))
  }
}

console.log('done', files.length, 'files scanned')
