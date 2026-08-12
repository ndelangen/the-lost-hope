import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    CORRECTIONS_ACCESS_CODE_DIGEST: JSON.stringify(''),
  },
  plugins: [viteReact()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
