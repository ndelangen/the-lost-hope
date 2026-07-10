import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

import { generateRefs, REFERENCE_SOURCE_PATHS } from './scripts/generate-refs.ts'

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

const config = defineConfig({
  plugins: [
    generatedRefsPlugin(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
})

export default config
