import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import type { Plugin } from 'vite'

/**
 * Rewrites named icon imports in app code to one small module per icon.
 *
 * In development, Vite serves each icon library as one prebundled module, so naming three icons
 * from `react-icons/gi` would make the browser download and parse all 4,000 of them (17 MB), and
 * Lucide and Font Awesome add another 9 MB. In production builds, a react-icons set is one module,
 * so every icon the app uses anywhere landed in one shared chunk (about 240 KB gzip) that any page
 * naming a single icon waited for before it could hydrate; one module per icon lets each icon sit
 * with the pages that draw it.
 */

const require = createRequire(import.meta.url)
const REACT_ICON_SETS = ['gi', 'fa'] as const
type ReactIconSet = (typeof REACT_ICON_SETS)[number]

const VIRTUAL_PREFIX = '\0icon:'
const ICON_IMPORT = /import\s*\{([^}]*)\}\s*from\s*(["'])(react-icons\/(?:gi|fa)|lucide-react)\2;?/g

/** One icon's `export function …` source per name, read from a react-icons set. */
function reactIconSources(set: ReactIconSet): Map<string, string> {
  const source = readFileSync(
    path.join(path.dirname(require.resolve('react-icons')), set, 'index.mjs'),
    'utf8',
  )
  const icons = new Map<string, string>()
  for (const chunk of source.split(/\n(?=export function )/)) {
    const name = /^export function (\w+)/.exec(chunk)?.[1]
    if (name) icons.set(name, chunk.trim())
  }
  return icons
}

/** The file behind each default export Lucide re-exports, by every name it goes under. */
function lucideIconFiles(): Map<string, string> {
  const entry = require.resolve('lucide-react/dist/esm/lucide-react.mjs')
  const files = new Map<string, string>()
  for (const [, names, file] of readFileSync(entry, 'utf8').matchAll(
    /export \{([^}]*)\} from '(\.\/[^']+)';/g,
  )) {
    for (const [, name] of names.matchAll(/default as (\w+)/g)) {
      files.set(name, path.join(path.dirname(entry), file))
    }
  }
  return files
}

type Specifier = { imported: string; local: string }

function parseSpecifiers(list: string): Specifier[] {
  return list
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [imported, local = imported] = part.split(/\s+as\s+/)
      return { imported, local }
    })
}

export function iconModulesPlugin(): Plugin {
  const reactIcons = new Map<ReactIconSet, Map<string, string>>()
  let lucide: Map<string, string> | undefined

  const reactIcon = (set: ReactIconSet, name: string) => {
    if (!reactIcons.has(set)) reactIcons.set(set, reactIconSources(set))
    return reactIcons.get(set)?.get(name)
  }

  return {
    name: 'icon-modules',
    config: () => ({ optimizeDeps: { include: ['react-icons/lib'] } }),
    resolveId(id) {
      return id.startsWith(VIRTUAL_PREFIX) ? id : undefined
    },
    load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX)) return
      const [set, name] = id.slice(VIRTUAL_PREFIX.length).split(':') as [ReactIconSet, string]
      const source = reactIcon(set, name)
      if (!source) throw new Error(`react-icons/${set} has no icon named ${name}`)
      return `import { GenIcon } from 'react-icons/lib'\n${source}\n`
    },
    transform(code, id) {
      if (this.environment.name !== 'client') return
      if (id.includes('/node_modules/') || !/\.[jt]sx?$/.test(id.split('?')[0])) return
      if (!code.includes('react-icons/') && !code.includes('lucide-react')) return

      let changed = false
      const rewritten = code.replace(ICON_IMPORT, (statement, list: string, _quote, source) => {
        const kept: Specifier[] = []
        const imports: string[] = []
        for (const specifier of parseSpecifiers(list)) {
          const { imported, local } = specifier
          if (source === 'lucide-react') {
            lucide ??= lucideIconFiles()
            const file = lucide.get(imported)
            if (file) imports.push(`import ${local} from ${JSON.stringify(file)};`)
            else kept.push(specifier)
            continue
          }
          const set = source.slice('react-icons/'.length) as ReactIconSet
          if (reactIcon(set, imported)) {
            imports.push(
              `import { ${imported} as ${local} } from ${JSON.stringify(`${VIRTUAL_PREFIX}${set}:${imported}`)};`,
            )
          } else kept.push(specifier)
        }
        if (!imports.length) return statement
        changed = true
        if (kept.length) {
          const names = kept.map(({ imported, local }) =>
            imported === local ? imported : `${imported} as ${local}`,
          )
          imports.push(`import { ${names.join(', ')} } from '${source}';`)
        }
        // Keep the line count so the following lines still match the source map.
        return imports.join(' ') + '\n'.repeat(statement.split('\n').length - 1)
      })
      return changed ? { code: rewritten, map: null } : undefined
    },
  }
}
