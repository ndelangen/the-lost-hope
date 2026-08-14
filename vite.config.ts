import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'

import { generateRefs, REFERENCE_SOURCE_PATHS } from './scripts/generate-refs.ts'
import { PUBLIC_PAGE_DESCRIPTORS, SITE_ORIGIN } from './src/lib/public-page-descriptors.ts'

const PUBLIC_PAGE_PATHS = new Set(PUBLIC_PAGE_DESCRIPTORS.map(({ path }) => path))

function generatedRefsPlugin(): Plugin {
  const sourcePaths = new Set(REFERENCE_SOURCE_PATHS)

  return {
    name: 'generate-entity-refs',
    async buildStart() {
      for (const sourcePath of sourcePaths) this.addWatchFile(sourcePath)
      await generateRefs()
    },
    async handleHotUpdate({ file, server }) {
      if (!sourcePaths.has(file)) return

      const changed = await generateRefs()
      if (changed) server.ws.send({ type: 'full-reload' })
    },
  }
}

const config = defineConfig(({ mode }) => {
  const correctionsEnvironment = loadEnv(mode, process.cwd(), 'CORRECTIONS_ACCESS_CODE_SHA256')
  const accessCodeHash =
    process.env.CORRECTIONS_ACCESS_CODE_SHA256 ??
    correctionsEnvironment.CORRECTIONS_ACCESS_CODE_SHA256 ??
    ''

  return {
    define: {
      CORRECTIONS_ACCESS_CODE_DIGEST: JSON.stringify(accessCodeHash),
    },
    preview: {
      host: '127.0.0.1',
    },
    plugins: [
      generatedRefsPlugin(),
      tanstackStart({
        pages: PUBLIC_PAGE_DESCRIPTORS.map(({ path }) => ({ path })),
        prerender: {
          enabled: true,
          autoSubfolderIndex: false,
          autoStaticPathsDiscovery: false,
          crawlLinks: false,
          failOnError: true,
          filter: ({ path }) => PUBLIC_PAGE_PATHS.has(path),
        },
        sitemap: { enabled: true, host: SITE_ORIGIN },
        spa: { enabled: false },
      }),
      tailwindcss(),
      viteReact(),
      netlify(),
    ],
  }
})

export default config
