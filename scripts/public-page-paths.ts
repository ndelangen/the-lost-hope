import { readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * The prerendered public page paths, written by `generate-social-images.tsx`. The Vite config reads
 * this file instead of importing the page descriptors: anything the config imports becomes a config
 * dependency, and Vite restarts the dev server whenever one changes. Importing the descriptors
 * pulled in all campaign data, so every data edit restarted the server.
 */
export const PUBLIC_PAGE_PATHS_FILE = 'src/generated/public-page-paths.json'

export function readPublicPagePaths(root: string): string[] {
  const file = path.join(root, PUBLIC_PAGE_PATHS_FILE)
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as string[]
  } catch (error) {
    throw new Error(
      `Missing ${PUBLIC_PAGE_PATHS_FILE}. Run \`bun run generate:social-paths\` first.`,
      { cause: error },
    )
  }
}
