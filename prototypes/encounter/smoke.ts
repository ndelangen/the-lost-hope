import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'

import { chromium } from 'playwright'

await mkdir('output/encounter-prototype', { recursive: true })

const browser = await chromium.launch({
  executablePath: process.env.ENCOUNTER_BROWSER_PATH,
})
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 940 } })
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  const port = process.env.ENCOUNTER_PORT ?? 4317
  await page.goto(`http://127.0.0.1:${port}/dm/encounter-prototype`)
  const slots = page.locator('[data-slot]')
  const active = () => page.locator('[aria-current="step"]').getAttribute('data-slot')
  const panel = page.getByRole('region', { name: 'Selected combatant' })
  const inspect = (name: string) => page.locator('#roster').getByRole('button', { name }).click()
  await slots.first().waitFor()
  assert.equal(await slots.count(), 13)
  assert.equal(await page.locator('#order img').count(), 7)
  assert.equal(
    await page
      .locator('#order img')
      .evaluateAll((images) =>
        images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
      ),
    true,
  )
  assert.deepEqual(
    await page
      .getByRole('button')
      .allTextContents()
      .then((texts) => texts.filter((text) => /[A-Za-z]/.test(text))),
    [],
  )
  assert.equal(await page.locator('#roster tbody tr').count(), 13)
  assert.match(
    await panel.locator('.save-grid div').first().innerText(),
    /Strength\s+d20\s+\+ 5\s+16 \(\+3\)/,
  )
  assert.equal(await panel.locator('.formula .dice svg').count(), 6)
  assert.equal(await panel.getByText('Damage immunities').count(), 0)
  assert.equal(
    await panel
      .getByRole('group', { name: 'Actions', exact: true })
      .getByRole('button', { name: 'Longsword' })
      .count(),
    1,
  )
  const healing = panel.getByRole('group', { name: 'Bonus actions', exact: true })
  await healing.getByRole('button', { name: 'Second Wind' }).hover()
  assert.equal(await page.getByRole('tooltip').locator('.dice[title="1d10"] svg').count(), 1)
  await page.mouse.move(0, 0)
  await page.screenshot({ path: 'output/encounter-prototype/after-density.png', fullPage: true })
  await page.locator('[data-slot="wolfie-2"]').dragTo(page.locator('[data-slot="knight"]'))
  assert.equal(await slots.first().getAttribute('data-slot'), 'wolfie-2')
  assert.equal(await active(), 'knight')
  await inspect('Mimic Chest 1')
  assert.match(await panel.innerText(), /Damage immunities\s+Acid\s+Condition immunities\s+Prone/)
  assert.match(await panel.innerText(), /Intelligence\s+d20\s+− 3/)
  assert.equal(await active(), 'knight')
  const legendaryRow = page.getByRole('region', { name: 'Legendary actions' })
  const legendary = legendaryRow.getByRole('group', { name: 'Mimic Chest 1 legendary actions' })
  const otherLegendary = legendaryRow.getByRole('group', {
    name: 'Mimic Chest 2 legendary actions',
  })
  await inspect('Giant Spider 1')
  assert.equal(await panel.getByRole('heading', { name: 'Giant Spider 1' }).count(), 1)
  await legendary.getByRole('button', { name: 'Lunging Bite' }).click()
  await legendaryRow.getByRole('button', { name: 'Use Lunging Bite' }).click()
  assert.deepEqual(await legendary.locator('.uses-badge').allTextContents(), ['1'])
  assert.deepEqual(await otherLegendary.locator('.uses-badge').allTextContents(), ['2'])
  assert.equal(await active(), 'knight')
  assert.equal(await panel.getByRole('heading', { name: 'Giant Spider 1' }).count(), 1)
  await legendary.getByRole('button', { name: 'Snap Shut' }).click()
  const legendaryUses = legendaryRow.getByLabel('Uses left')
  assert.equal(await legendaryUses.inputValue(), '1')
  await legendaryUses.fill('0')
  await legendaryUses.press('Tab')
  assert.equal(await legendary.locator('[data-spent]').count(), 2)
  assert.equal(await otherLegendary.locator('[data-spent]').count(), 0)
  await legendaryUses.fill('1')
  await legendaryUses.press('Tab')
  assert.equal(await legendary.locator('[data-spent]').count(), 0)
  await legendary.getByRole('button', { name: 'Snap Shut' }).click()
  await page.mouse.move(0, 0)
  await page.screenshot({ path: 'output/encounter-prototype/after-legendary-row.png' })
  const biteIcon = panel.getByRole('button', { name: 'Bite', exact: true })
  await biteIcon.hover()
  assert.match(await page.getByRole('tooltip').innerText(), /Bite/)
  assert.equal(await biteIcon.locator('svg').count(), 1)
  await page.screenshot({ path: 'output/encounter-prototype/after-purpose-icons.png' })
  const webIcon = panel.getByRole('button', { name: 'Web', exact: true })
  await webIcon.hover()
  const tooltip = page.getByRole('tooltip')
  assert.match(await tooltip.innerText(), /Recharge 5–6/)
  await page.screenshot({ path: 'output/encounter-prototype/density-tooltip.png' })
  await webIcon.click()
  const web = panel.locator('.feature-detail')
  const slash = () => webIcon.evaluate((button) => getComputedStyle(button, '::after').content)
  assert.equal(await slash(), 'none')
  await panel.screenshot({ path: 'output/encounter-prototype/before-spent.png' })
  await web.getByRole('button', { name: 'Use Web', exact: true }).click()
  assert.equal(await web.getByLabel('Uses left').inputValue(), '0')
  assert.equal(await slash(), '""')
  await page.mouse.move(0, 0)
  await panel.screenshot({ path: 'output/encounter-prototype/after-spent.png' })
  await inspect('Giant Spider 2')
  await webIcon.click()
  assert.equal(await web.getByLabel('Uses left').inputValue(), '1')
  await inspect('Wolfie 1')
  const slider = panel.getByRole('slider', { name: 'HP slider' })
  await slider.fill('17')
  await panel.getByRole('button', { name: 'Subtract 1 HP' }).click()
  assert.equal(await slider.inputValue(), '16')
  await panel.getByRole('button', { name: 'Add 1 HP' }).click()
  assert.equal(await slider.inputValue(), '17')
  assert.equal(await panel.getByLabel('HP', { exact: true }).inputValue(), '17')
  await inspect('Wolfie 2')
  assert.equal(await panel.getByLabel('HP', { exact: true }).inputValue(), '24')
  await page.getByRole('button', { name: 'Next turn' }).click()
  assert.equal(await active(), 'wolfie-1')
  const next = page.getByRole('button', { name: 'Next turn' })
  for (let index = 0; index < 12; index++) await next.click()
  assert.equal(await page.locator('#round').textContent(), 'Round 2')
  await page.reload()
  assert.deepEqual(await legendary.locator('.uses-badge').allTextContents(), ['1'])
  assert.deepEqual(await otherLegendary.locator('.uses-badge').allTextContents(), ['2'])

  await inspect('Giant Spider 1')
  await webIcon.click()
  assert.equal(await web.getByLabel('Uses left').inputValue(), '0')
  assert.equal(await slash(), '""')
  await web.getByRole('button', { name: 'Recharge Web' }).click()
  assert.equal(await slash(), 'none')
  assert.equal(await web.getByLabel('Uses left').inputValue(), '1')
  await inspect('Wolfie 1')
  assert.equal(await panel.getByLabel('HP', { exact: true }).inputValue(), '17')
  const rosterEffects = page.locator('#roster .roster-effects')
  const protection = rosterEffects.getByRole('button', { name: 'Protection against death' })
  await protection.hover()
  assert.match(
    await page.getByRole('tooltip').innerText(),
    /Check this protection if Devan would die/,
  )
  const activeBeforeEffect = await active()
  await inspect('Devan')
  const effectsPanel = panel.getByRole('region', { name: 'Effects', exact: true })
  assert.match(
    await effectsPanel.innerText(),
    /does not specify the mechanics, number of uses, or duration/,
  )
  assert.equal(await active(), activeBeforeEffect)
  await page.mouse.move(0, 0)
  await page.screenshot({ path: 'output/encounter-prototype/readable-effects.png' })
  assert.equal(
    await effectsPanel.getByRole('heading', { name: 'Something missing or dormant' }).count(),
    1,
  )
  assert.equal(await effectsPanel.locator('.effect-trigger svg').count(), 1)
  assert.match(
    await effectsPanel.locator('.effect-trigger').innerText(),
    /If the character would die/,
  )
  await effectsPanel
    .locator('.effect-entry')
    .filter({ hasText: 'Protection against death' })
    .getByRole('button', { name: 'End effect' })
    .click()
  assert.equal(await protection.count(), 0)
  await page.reload()
  assert.equal(await protection.count(), 0)
  await rosterEffects.getByRole('button', { name: 'Something missing or dormant' }).click()
  assert.match(await effectsPanel.innerText(), /What Did Devan Lose to the Fiddler/)
  await effectsPanel.getByRole('button', { name: 'Protection against death' }).click()
  await effectsPanel.getByRole('button', { name: 'Restore effect' }).click()
  assert.equal(await protection.count(), 1)
  await page.setViewportSize({ width: 390, height: 844 })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390)
  await inspect('Giant Spider 1')
  const rowTop = await legendaryRow.evaluate((row) => row.getBoundingClientRect().top)
  assert.ok(rowTop >= 0 && rowTop < 844)
  await page.setViewportSize({ width: 390, height: 540 })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  assert.equal(await legendaryRow.evaluate((row) => row.getBoundingClientRect().top), 0)
  assert.ok(
    (await panel.evaluate((panel) => panel.getBoundingClientRect().top)) >=
      (await legendaryRow.evaluate((row) => row.getBoundingClientRect().bottom)),
  )
  assert.deepEqual(errors, [])
  console.log('13-entry browser walkthrough passed.')
} finally {
  await browser.close()
}
