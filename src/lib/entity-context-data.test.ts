import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import { contentToText, getEntity, resolveRef, sessionEvents } from '#/lib/campaign'

import { entityContextData, historyWithPerson } from './entity-context-data'

describe('entityContextData', () => {
  const light = entityContextData(getEntity('npc', 'light-13th-marshal')!)
  const celeste = entityContextData(getEntity('npc', 'celeste-tempest')!)

  it('keeps canonical event order within each campaign day and deduplicates mentions', () => {
    expect(light.history.map((entry) => entry.day)).toEqual(
      light.history.map((entry) => entry.day).toSorted((a, b) => a - b),
    )
    const dayTwo = light.history.filter((entry) => entry.day === 2)
    expect(dayTwo.map((entry) => entry.event.name)).toEqual([
      'Meet Light 13th Marshal at the guildhall',
      'The guild tattoo ritual',
      'Jim speaks with Light 1:1',
    ])
    expect(new Set(light.history.map((entry) => entry.event.slug)).size).toBe(light.history.length)
    expect(dayTwo[0]?.session?.number).toBe(1)
  })

  it('keeps a remote report as a mention, without inventing presence or a relationship', () => {
    const report = light.history.find(
      (entry) => entry.event.name === 'Onana rewards the party and forbids further dungeon deaths',
    )
    expect(report?.reason).toBe('mentioned')
    expect(contentToText(report?.passages)).toContain('After speaking with')
    expect(report?.day).toBe(24)
    expect(light.connections.some((connection) => connection.target.name === 'Onana Tempest')).toBe(
      false,
    )
    expect(light.connections.some((connection) => connection.target.name === 'Cassian Veyl')).toBe(
      false,
    )
  })

  it('preserves allegations and uncertainty verbatim from the event source', () => {
    const allegation = celeste.history.find(
      (entry) => entry.event.name === 'The shipwright describes grievances against the Tempests',
    )
    expect(contentToText(allegation?.passages)).toContain(
      'She accused the former of owning slaves.',
    )
    expect(contentToText(allegation?.passages)).toContain('too unclear to resolve')
    expect(celeste.connections.map((connection) => connection.target.name)).toEqual([
      'Tempest Family',
    ])
    expect(
      celeste.sources.find((source) => source.entity.name === 'Selene Tempest')?.passages,
    ).toEqual(getEntity('npc', 'selene-tempest')!.data.notes)
  })

  it('derives forward and reverse membership links from the same canonical owner', () => {
    const guildmaster = light.connections.find((connection) => connection.label === 'Guildmaster')!
    expect(guildmaster.target.name).toBe("Adventurers' Guild")
    expect(guildmaster.source).toEqual(light.entity)
    const guild = entityContextData(getEntity('organization', guildmaster.target.slug)!)
    expect(
      guild.connections.find((connection) => connection.target.slug === light.entity.slug),
    ).toMatchObject({ label: 'Guildmaster', source: light.entity })
  })

  it('filters by shared event mentions without inferring interactions', () => {
    const cassian = light.people.find((person) => person.name === 'Cassian Veyl')!
    const shared = historyWithPerson(light.history, cassian)
    expect(shared.length).toBeGreaterThan(0)
    expect(
      shared.some((entry) => entry.event.name === 'Light sends Cassian to watch over the party'),
    ).toBe(true)
    expect(
      shared.every((entry) => entry.mentions.some((mention) => mention.slug === cassian.slug)),
    ).toBe(true)
    expect(historyWithPerson(light.history, undefined)).toBe(light.history)
  })

  it('keeps quest evidence on its source and does not infer unrelated story threads', () => {
    const thread = celeste.threads.find(
      (source) => source.entity.name === "Settle the Shipwright's Favors",
    )!
    expect(thread.record).toEqual(thread.entity)
    expect(thread.quest).toEqual({ status: 'open', type: 'mission' })
    expect(contentToText(thread.passages)).toContain('precise obligations unsettled')
    expect(thread.passages).toHaveLength(1)
  })

  it('uses session event references and location fields independently of prose mentions', () => {
    const session = getEntity('session', 'arrival-in-fajanet')!
    const context = entityContextData(session)
    expect(context.history.map((entry) => entry.event.slug)).toEqual(
      sessionEvents(session.data).map((event) => event.slug),
    )
    expect(context.history.every((entry) => entry.reason === 'session')).toBe(true)
    const location = entityContextData(resolveRef(refs.locations.fajanet_guildhall)!)
    expect(location.history.some((entry) => entry.event.name === 'The guild tattoo ritual')).toBe(
      true,
    )
    expect(
      location.connections.some(
        (connection) =>
          connection.target.slug === light.entity.slug && connection.label === 'Home of',
      ),
    ).toBe(true)
  })
})
