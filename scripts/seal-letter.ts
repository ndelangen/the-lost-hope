/**
 * Seals a handout letter for a passworded page. The plain letter stays outside the repository:
 *
 *   bun scripts/seal-letter.ts <letter.json>
 *
 * The JSON holds `{ "opening": { "text" }, "sections": [{ "id", "password", "text" }],
 * "closing": { "text" } }`. Each section is sealed under its own password; the shared opening and
 * closing are sealed under every section password joined in order. Paste the printed sealed
 * values into the letter's page module.
 */
import { readFile } from 'node:fs/promises'

import { sealText } from '../src/lib/sealed-text'

type PlainLetter = {
  opening: { text: string }
  sections: Array<{ id: string; password: string; text: string }>
  closing: { text: string }
}

const path = process.argv[2]
if (!path) throw new Error('Usage: bun scripts/seal-letter.ts <letter.json>')

const letter = JSON.parse(await readFile(path, 'utf8')) as PlainLetter
const shared = letter.sections.map((section) => section.password).join('')
const sections: Record<string, Awaited<ReturnType<typeof sealText>>> = {}
for (const section of letter.sections) {
  // oxlint-disable-next-line no-await-in-loop -- sections are sealed one at a time on purpose
  sections[section.id] = await sealText(section.text, section.password)
}

console.log(
  JSON.stringify(
    {
      opening: await sealText(letter.opening.text, shared),
      sections,
      closing: await sealText(letter.closing.text, shared),
    },
    null,
    2,
  ),
)
