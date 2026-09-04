import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'

import { chromium } from 'playwright'

// Exercise actual browser layout; jsdom cannot detect overflowing image boxes.
// Run after `bun run build`. Install Chromium once with `bunx playwright install chromium`.
const origin = 'http://127.0.0.1:4187'
const server = spawn(
  'bun',
  ['run', 'preview', '--host', '127.0.0.1', '--port', '4187', '--strictPort'],
  { stdio: 'pipe' },
)
let serverOutput = ''
server.stdout.on('data', (chunk) => {
  serverOutput += String(chunk)
})
server.stderr.on('data', (chunk) => {
  serverOutput += String(chunk)
})

/* oxlint-disable no-await-in-loop -- serial browser cases share one preview server */
try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    assert(server.exitCode === null, `Preview server exited: ${serverOutput}`)
    if (serverOutput.includes(origin)) {
      ready = true
      break
    }
    await delay(100)
  }
  assert(ready, `Preview server did not become ready: ${serverOutput}`)
  const browser = await chromium.launch({ headless: true })
  try {
    const cases = [
      { path: '/beasts/detail/captain-squawk', name: 'Captain Squawk', label: 'portrait' },
      { path: '/pcs/detail/swift-starblade', name: 'Swift Starblade', label: 'portrait' },
      { path: '/pcs/detail/theron', name: 'Theron', label: 'portrait' },
      {
        path: '/locations/detail/serpent-eclipse-flooded-cavern',
        name: 'Serpent Eclipse Flooded Cavern',
        label: 'illustration',
      },
    ]
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
      { width: 844, height: 390 },
    ]) {
      const page = await browser.newPage({ viewport })
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      for (const entry of cases) {
        await page.goto(`${origin}${entry.path}`)
        const trigger = page.getByRole('button', {
          name: `View a larger ${entry.label} of ${entry.name}`,
          exact: true,
        })
        await trigger.click()
        const dialog = page.getByRole('dialog', { name: entry.name, exact: true })
        const image = dialog.locator('img')
        await image.evaluate((element) => (element as HTMLImageElement).decode())
        const geometry = await image.evaluate((element) => {
          const box = element.getBoundingClientRect()
          return {
            x: box.x,
            y: box.y,
            right: box.right,
            bottom: box.bottom,
            width: box.width,
            height: box.height,
            fit: getComputedStyle(element).objectFit,
          }
        })
        assert(geometry.width > 0 && geometry.height > 0, `${entry.name}: empty image`)
        assert(
          geometry.x >= 0 &&
            geometry.y >= 0 &&
            geometry.right <= viewport.width + 1 &&
            geometry.bottom <= viewport.height + 1,
          `${entry.name} overflows ${viewport.width}x${viewport.height}: ${JSON.stringify(geometry)}`,
        )
        assert.equal(geometry.fit, 'contain')
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'detached' })
        assert(
          await trigger.evaluate((element) => document.activeElement === element),
          'Focus was not restored',
        )
        assert.deepEqual(errors, [])
        console.log(
          `PASS ${entry.name}: ${viewport.width}x${viewport.height}, full image fits and Escape restores focus`,
        )
      }
      await page.close()
    }
  } finally {
    await browser.close()
  }
} finally {
  server.kill('SIGTERM')
}
