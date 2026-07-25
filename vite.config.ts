import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
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
    plugins: [
      generatedRefsPlugin(),
      tailwindcss(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
    ],
  }
})

export default config
