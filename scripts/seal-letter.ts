/**
 * Seals a handout letter for a passworded page. The plain letter stays outside the repository:
 *
 *   bun scripts/seal-letter.ts <letter.json>
 *
 * The JSON holds `{ "shared": { "text" }, "sections": [{ "id", "password", "text" }] }`. Each
 * section is sealed under its own password; the shared part is sealed under every section password
 * joined in order. Paste the printed sealed values into the letter's page module.
 */
import { readFile } from 'node:fs/promises'

import { sealText } from '../src/lib/sealed-text'

type PlainLetter = {
  shared: { text: string }
  sections: Array<{ id: string; password: string; text: string }>
}

const path = process.argv[2]
if (!path) throw new Error('Usage: bun scripts/seal-letter.ts <letter.json>')

const letter = JSON.parse(await readFile(path, 'utf8')) as PlainLetter
const sharedKey = letter.sections.map((section) => section.password).join('')
const sections: Record<string, Awaited<ReturnType<typeof sealText>>> = {}
for (const section of letter.sections) {
  // oxlint-disable-next-line no-await-in-loop -- sections are sealed one at a time on purpose
  sections[section.id] = await sealText(section.text, section.password)
}

console.log(
  JSON.stringify({ shared: await sealText(letter.shared.text, sharedKey), sections }, null, 2),
)
