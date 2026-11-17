import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { Connect, Plugin } from 'vite'

import { devIconModulesPlugin } from './scripts/dev-icon-modules.ts'
import { dmAuthoringPlugin } from './scripts/dm-authoring.ts'
import { generateRefs, REFERENCE_SOURCE_PATHS } from './scripts/generate-refs.ts'
import { readPublicPagePaths } from './scripts/public-page-paths.ts'
import { HANDOUT_PATHS } from './src/lib/handouts.ts'
import { SITE_ORIGIN } from './src/lib/site-origin.ts'

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

/** Vite's own source-module and dependency requests. */
const isModuleRequest = (url = '') =>
  /^\/(?:@|src\/|node_modules\/|__vite)/.test(url) || /[?&](?:import(?:[&=]|$)|[tv]=)/.test(url)

/**
 * Vite asks Netlify's dev middleware about every request, which costs ~6 ms each, and a page load
 * fetches ~900 source modules. Netlify only serves functions, redirects and headers, so keep it off
 * Vite's own module and dependency requests.
 */
function netlifyOutsideModuleRequests(plugins: Plugin[]): Plugin[] {
  return plugins.map((plugin) => {
    const configureServer = plugin.configureServer
    if (typeof configureServer !== 'function') return plugin

    return {
      ...plugin,
      async configureServer(server) {
        await configureServer.call(this, server)
        for (const layer of server.middlewares.stack) {
          if (typeof layer.handle !== 'function' || layer.handle.name !== 'netlifyPreMiddleware') {
            continue
          }
          const handle = layer.handle as Connect.NextHandleFunction
          const scoped: Connect.NextHandleFunction = (request, response, next) =>
            isModuleRequest(request.url) ? next() : handle(request, response, next)
          layer.handle = scoped
        }
      },
    }
  })
}

const config = defineConfig(({ mode }) => {
  const publicPagePaths = readPublicPagePaths(process.cwd())
  // Handouts are prerendered so their QR codes work on the live site, but stay out of the sitemap.
  const prerenderedPaths = new Set([...publicPagePaths, ...HANDOUT_PATHS])
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
      dmAuthoringPlugin(),
      devIconModulesPlugin(),
      tanstackStart({
        pages: [
          ...publicPagePaths.map((path) => ({ path })),
          ...HANDOUT_PATHS.map((path) => ({ path, sitemap: { exclude: true } })),
        ],
        prerender: {
          enabled: true,
          autoSubfolderIndex: false,
          autoStaticPathsDiscovery: false,
          crawlLinks: false,
          failOnError: true,
          filter: ({ path }) => prerenderedPaths.has(path),
        },
        sitemap: { enabled: true, host: SITE_ORIGIN },
        spa: { enabled: false },
      }),
      tailwindcss(),
      viteReact(),
      // The site has no edge functions. Netlify's edge emulator starts Deno with --allow-scripts,
      // which Deno 2.9 rejects, so leave it off to keep `bun run dev` working.
      ...netlifyOutsideModuleRequests(netlify({ dev: { edgeFunctions: { enabled: false } } })),
    ],
  }
})

export default config
