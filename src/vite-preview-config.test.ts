import { describe, expect, it } from 'vitest'

import viteConfig from '../vite.config'

describe('Vite preview server', () => {
  it('binds prerender preview traffic directly to IPv4 loopback', async () => {
    const config =
      typeof viteConfig === 'function'
        ? await viteConfig({
            command: 'build',
            mode: 'production',
            isSsrBuild: false,
            isPreview: false,
          })
        : viteConfig

    expect(config.preview?.host).toBe('127.0.0.1')
  })
})
