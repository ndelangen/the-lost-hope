import { describe, expect, it } from 'vitest'

import {
  NPC_DRAFT_JSON_SCHEMA,
  NpcDraft,
  addNpcToIndex,
  draftReferences,
  npcIdentity,
  npcSourceFile,
  paragraphsToText,
  textToParagraphs,
} from './npc-authoring'

const draft: NpcDraft = {
  name: 'Mira Quickfingers',
  species: 'halfling',
  location: 'nimbus',
  languages: ['Common'],
  notes: [['A card sharp who works the tables for ', { ref: 'npc', key: 'the_fiddler' }, '.']],
  motivations: [['Wants out of her debt.']],
  background: [],
  creature: 'spy',
  portrait: 'Sharp eyes, freckles, a deck of cards fanned in one hand.',
}

describe('NPC authoring', () => {
  it('derives the file slug and registry key from the name', () => {
    expect(npcIdentity('Mira Quickfingers')).toEqual({
      slug: 'mira-quickfingers',
      key: 'mira_quickfingers',
    })
  })

  it('writes a record that uses generated refs, not names', () => {
    const source = npcSourceFile(draft)
    expect(source).toContain('location: refs.locations.nimbus,')
    expect(source).toContain(
      '["A card sharp who works the tables for ", refs.npcs.the_fiddler, "."],',
    )
    expect(source).toContain('stats: refs.creatures.spy,')
    expect(source).not.toContain('background')
  })

  it('lists every reference the draft uses', () => {
    expect(draftReferences(draft)).toEqual([
      { ref: 'location', key: 'nimbus' },
      { ref: 'creature', key: 'spy' },
      { ref: 'npc', key: 'the_fiddler' },
    ])
  })

  it('registers the NPC with one import and one entry', () => {
    const index = "import a from './a.ts'\n\nexport default {\n  a,\n}\n"
    expect(addNpcToIndex(index, npcIdentity('Mira Quickfingers'))).toBe(
      "import a from './a.ts'\nimport mira_quickfingers from './mira-quickfingers.ts'\n\nexport default {\n  a,\n  mira_quickfingers,\n}\n",
    )
    expect(() => addNpcToIndex(index, { slug: 'a', key: 'a' })).toThrow('already registered')
  })

  it('round-trips paragraphs through editable text', () => {
    const text = paragraphsToText([...draft.notes, ['Second.']])
    expect(text).toBe('A card sharp who works the tables for [[npc:the_fiddler]].\n\nSecond.')
    expect(textToParagraphs(text)).toEqual([...draft.notes, ['Second.']])
    expect(textToParagraphs('[[nope:x]] stays text')).toEqual([['[[nope:x]] stays text']])
  })

  it('asks Codex for every draft field', () => {
    expect(NPC_DRAFT_JSON_SCHEMA.required.toSorted()).toEqual(
      Object.keys(NpcDraft.shape).toSorted(),
    )
  })
})
