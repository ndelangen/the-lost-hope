import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'

import { chromium } from 'playwright'

// Run against the completed production build, without generating social images.
const origin = 'http://127.0.0.1:4188'
const path = (slug: string) => `/locations/detail/serpent-eclipse-${slug}`
const server = spawn(
  'bun',
  ['run', 'preview', '--host', '127.0.0.1', '--port', '4188', '--strictPort'],
  { stdio: 'pipe' },
)
let serverOutput = ''
server.stdout.on('data', (chunk) => {
  serverOutput += String(chunk)
})
server.stderr.on('data', (chunk) => {
  serverOutput += String(chunk)
})

/* oxlint-disable no-await-in-loop -- serial navigation checks share one preview server */
try {
  for (let attempt = 0; attempt < 100 && !serverOutput.includes(origin); attempt++) {
    assert(server.exitCode === null, `Preview exited: ${serverOutput}`)
    await delay(100)
  }
  assert(serverOutput.includes(origin), `Preview did not become ready: ${serverOutput}`)
  await mkdir('output/verification/location-connections', { recursive: true })
  const browser = await chromium.launch({ headless: true })
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } })
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      const exploration = page.locator('[data-location-section="destination-map"]')
      const pins = exploration.locator('figure')
      const assertTempleParent = async () => {
        const context = page.locator('[data-location-section="context-map"]')
        assert.equal(
          await context
            .getByRole('heading', { name: 'Within Temple of the Serpent Eclipse', exact: true })
            .count(),
          1,
        )
        assert.equal(await context.locator('[title$="You are here"]').count(), 1)
        assert.equal(await context.getByText('Portal · Travel from this location').count(), 0)
      }

      await page.goto(origin + path('three-door-chamber'))
      await assertTempleParent()
      assert.equal(await pins.locator('a').count(), 2)
      await pins.scrollIntoViewIfNeeded()
      await pins.locator('img').evaluate((img: HTMLImageElement) => img.decode())
      const doorI = pins.getByRole('link', {
        name: 'Door I → Serpent Eclipse Left-Door Passage',
        exact: true,
      })
      const doorII = pins.getByRole('link', { name: 'Door II → Serpent Eclipse Maze', exact: true })
      const first = await doorI.boundingBox()
      const second = await doorII.boundingBox()
      assert(first && second && first.x > second.x, 'Door I must be on the artwork right')
      await exploration.screenshot({
        path: `output/verification/location-connections/chamber-${width}.png`,
      })

      await doorII.click()
      await page.waitForURL(`**${path('maze')}`)
      await page
        .getByRole('heading', { name: 'Serpent Eclipse Maze', exact: true, level: 1 })
        .waitFor()
      await assertTempleParent()
      assert.equal(await pins.locator('a').count(), 6, 'Maze rooms must remain contained locations')
      await page.goto(origin + path('three-door-chamber'))
      await doorI.click()
      await page.waitForURL(`**${path('left-door-passage')}`)
      await page
        .getByRole('heading', { name: 'Serpent Eclipse Left-Door Passage', exact: true, level: 1 })
        .waitFor()
      await assertTempleParent()
      await pins
        .getByRole('link', { name: 'Arena entrance → Serpent Eclipse Shadow Arena', exact: true })
        .click()
      await page.waitForURL(`**${path('shadow-arena')}`)
      await page
        .getByRole('heading', { name: 'Serpent Eclipse Shadow Arena', exact: true, level: 1 })
        .waitFor()
      await assertTempleParent()
      assert.equal(await pins.locator('a').count(), 1)
      const portal = pins.getByRole('link', {
        name: 'Return portal → Serpent Eclipse Three-Door Chamber',
        exact: true,
      })
      await pins.scrollIntoViewIfNeeded()
      await page.mouse.move(0, 0)
      await exploration.screenshot({
        path: `output/verification/location-connections/portal-${width}.png`,
      })
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'Horizontal overflow',
      )
      await portal.focus()
      await page.keyboard.press('Enter')
      await page.waitForURL(`**${path('three-door-chamber')}`)
      await page
        .getByRole('heading', { name: 'Serpent Eclipse Three-Door Chamber', exact: true, level: 1 })
        .waitFor()
      assert.equal(await pins.locator('a').count(), 2, 'No reverse portal should be inferred')
      assert.deepEqual(errors, [])
      console.log(
        `PASS ${width}px: doors, maze rooms, passage, keyboard return portal, containment, and clean console`,
      )
      await page.close()
    }
  } finally {
    await browser.close()
  }
} finally {
  server.kill('SIGTERM')
}
