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
  test: {
    exclude: [...configDefaults.exclude, 'output/**'],
    coverage: {
      include: ['src/**/*.{ts,tsx}', 'netlify/{functions,lib}/**/*.ts'],
      exclude: ['src/data/**', 'src/generated/**', 'src/routeTree.gen.ts', '**/*.d.ts'],
      reportsDirectory: 'output/coverage',
      reporter: ['text-summary', 'json-summary', 'html', 'lcovonly'],
      reportOnFailure: true,
      thresholds: { statements: 50, branches: 42, functions: 43, lines: 51 },
    },
  },
})
