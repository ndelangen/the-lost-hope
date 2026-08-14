// PROTOTYPE — disposable feature-complete JavaScript boundary measurement.
//
// Question: after isolating the internal icon tool's namespace import, does the existing fully
// hydrated application already beat the delivery target while preserving every interaction?

import { spawnSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const build = spawnSync('bun', ['run', 'verify'], { stdio: 'inherit' })
if (build.status !== 0) process.exit(build.status ?? 1)

const routes = [
  { path: 'index.html', baselineGzip: 2_976_323 },
  { path: 'events.html', baselineGzip: 2_975_330 },
  { path: 'pcs/detail/jim.html', baselineGzip: 2_982_706 },
  { path: 'locations/map.html', baselineGzip: 2_976_126 },
  { path: 'questions.html', baselineGzip: 3_035_165 },
] as const

console.log('\nPROTOTYPE feature-complete JavaScript transfer report')
for (const route of routes) {
  const html = readFileSync(`dist/client/${route.path}`, 'utf8')
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
  const reduction = 1 - gzip / route.baselineGzip

  console.log(`\n${route.path}`)
  console.log(`  referenced JS: ${measurements.length} files`)
  console.log(`  raw total:     ${raw.toLocaleString()} bytes`)
  console.log(`  gzip total:    ${gzip.toLocaleString()} bytes`)
  console.log(`  reduction:     ${(reduction * 100).toFixed(1)}% from current main baseline`)
  for (const measurement of measurements.toSorted((a, b) => b.gzip - a.gzip)) {
    console.log(`  ${measurement.gzip.toLocaleString().padStart(10)} gzip  ${measurement.asset}`)
  }

  if (reduction < 0.5) {
    console.error(`\n${route.path} missed the prototype's 50% JavaScript target`)
    process.exitCode = 1
  }
}
