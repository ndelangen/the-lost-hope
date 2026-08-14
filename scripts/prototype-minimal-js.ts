// PROTOTYPE — disposable selective-hydration measurement harness.
//
// Question: does a never-hydrated split shell preserve prerendered route HTML while removing the
// canonical campaign graph from the JavaScript referenced by representative cold page visits?

import { spawnSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const build = spawnSync('bunx', ['vite', 'build'], { stdio: 'inherit' })
if (build.status !== 0) process.exit(build.status ?? 1)

const routes = ['index.html', 'events.html', 'pcs/detail/jim.html'] as const

console.log('\nPROTOTYPE selective-hydration transfer report')
for (const route of routes) {
  const html = readFileSync(`dist/client/${route}`, 'utf8')
  const assets = [
    ...new Set(
      [...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.js)"/g)].map((match) => match[1]),
    ),
  ]
  const measurements = assets.map((asset) => {
    const path = `dist/client${asset}`
    const contents = readFileSync(path)
    return {
      asset,
      raw: statSync(path).size,
      gzip: gzipSync(contents, { level: 9 }).byteLength,
    }
  })
  const raw = measurements.reduce((total, measurement) => total + measurement.raw, 0)
  const gzip = measurements.reduce((total, measurement) => total + measurement.gzip, 0)

  console.log(`\n${route}`)
  console.log(`  referenced JS: ${measurements.length} files`)
  console.log(`  raw total:     ${raw.toLocaleString()} bytes`)
  console.log(`  gzip total:    ${gzip.toLocaleString()} bytes`)
  for (const measurement of measurements.toSorted((a, b) => b.gzip - a.gzip)) {
    console.log(`  ${measurement.gzip.toLocaleString().padStart(10)} gzip  ${measurement.asset}`)
  }
}
