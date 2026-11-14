import viteReact from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    CORRECTIONS_ACCESS_CODE_DIGEST: JSON.stringify(''),
  },
  plugins: [viteReact()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  // output/ is local scratch (see AGENTS.md); tooling never checks it.
  test: { exclude: [...configDefaults.exclude, 'output/**'] },
})
