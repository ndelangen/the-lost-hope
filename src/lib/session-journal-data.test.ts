import { describe, expect, it } from 'vitest'

import { sessions } from '#/lib/campaign-registries'

import { sessionJournalData } from './session-journal-data'

describe('sessionJournalData', () => {
  const days = sessionJournalData(sessions.the_first_dungeon)
  const events = days.flatMap((day) => day.events)

  it('keeps every event in canonical session order', () => {
    expect(days.map((day) => day.day)).toEqual([21])
    expect(events).toHaveLength(12)
    expect(events.map((event) => event.index)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    expect(events[0]?.name).toBe(
      'The party presents the dungeon pass at the Serpent Eclipse entrance',
    )
    expect(events.at(-1)?.name).toBe('Cassian learns the ring is turning him into a werewolf')
  })

  it('adds movement only when the direct location parent changes', () => {
    expect(events.flatMap((event) => (event.transition ? [event.transition] : []))).toEqual([
      { slug: 'serpent-eclipse-three-door-chamber', name: 'Serpent Eclipse Three-Door Chamber' },
      { slug: 'serpent-eclipse-left-door-passage', name: 'Serpent Eclipse Left-Door Passage' },
      { slug: 'temple-of-the-serpent-eclipse', name: 'Temple of the Serpent Eclipse' },
      { slug: 'gruumsh-war-temple', name: 'Gruumsh War Temple' },
    ])
  })

  it('derives a unique character-and-creature context from event notes', () => {
    expect(events[0]?.references.map(({ kind, name }) => ({ kind, name }))).toEqual([
      { kind: 'pc', name: 'Cassian Veyl' },
      { kind: 'pc', name: 'Devan' },
      { kind: 'pc', name: 'Jim' },
      { kind: 'pc', name: 'Swift Starblade' },
      { kind: 'npc', name: 'Sylvia' },
      { kind: 'beast', name: 'Wolfie' },
    ])
  })

  it('shows only canonically linked quests and omits empty quest context', () => {
    const cursedSwordEvent = events.find((event) =>
      event.name.includes('cleanses the Shadow Sword'),
    )

    expect(cursedSwordEvent?.quests).toEqual([
      { slug: 'the-cursed-sword', name: 'The Cursed Sword', type: 'mystery' },
    ])
    expect(events[0]?.quests).toEqual([])
  })
})
