/**
 * Seals a handout letter for a passworded page. The plain letter stays outside the repository:
 *
 *   bun scripts/seal-letter.ts <letter.json>
 *
 * The JSON holds `{ "sections": [{ "id", "password", "text" }], "finale": { "text" } }`. The
 * finale is sealed under every section password joined in order. Paste the printed sealed values
 * into the letter's page module.
 */
import { readFile } from 'node:fs/promises'

import { sealText } from '../src/lib/sealed-text'

type PlainLetter = {
  sections: Array<{ id: string; password: string; text: string }>
  finale: { text: string }
}

const path = process.argv[2]
if (!path) throw new Error('Usage: bun scripts/seal-letter.ts <letter.json>')

const letter = JSON.parse(await readFile(path, 'utf8')) as PlainLetter
const sections: Record<string, Awaited<ReturnType<typeof sealText>>> = {}
for (const section of letter.sections) {
  // oxlint-disable-next-line no-await-in-loop -- sections are sealed one at a time on purpose
  sections[section.id] = await sealText(section.text, section.password)
}
const finale = await sealText(letter.finale.text, letter.sections.map((s) => s.password).join(''))

console.log(JSON.stringify({ sections, finale }, null, 2))
