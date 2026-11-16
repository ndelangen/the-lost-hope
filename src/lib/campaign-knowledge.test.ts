import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'

import {
  checkIdea,
  getRecord,
  linksOf,
  list,
  mentionsIn,
  met,
  openQuestions,
  overview,
  resolveQuery,
  search,
  timeline,
  visibilityOf,
} from './campaign-knowledge'

describe('campaign knowledge', () => {
  it('resolves refs, slugs, keys and names to the same record', () => {
    const light = refs.npcs.light_13th_marshal
    for (const query of [
      'refs.npcs.light_13th_marshal',
      'npc:light_13th_marshal',
      'npcs.light_13th_marshal',
      'light-13th-marshal',
      'Light 13th Marshal',
    ]) {
      expect(resolveQuery(query)).toEqual([light])
    }
    expect(resolveQuery('swift')).toEqual([refs.pcs.swift_starblade])
    expect(resolveQuery('refs.arcs.the_flying_fortress')).toEqual([refs.arcs.the_flying_fortress])
  })

  it('derives what the party has met from played events', () => {
    expect(visibilityOf(refs.npcs.knukkles).status).toBe('dm-only')
    expect(visibilityOf(refs.scenes.the_hand_comes_for_jim).status).toBe('dm-only')
    expect(visibilityOf(refs.npcs.light_13th_marshal)).toEqual({
      status: 'player-known',
      firstSeen: refs.events.n2_e002,
    })
    expect(list('npc', 'dm-only')).toContain('(refs.npcs.knukkles)')
    expect(list('npc', 'player-known')).not.toContain('(refs.npcs.knukkles)')
  })

  it('follows links both ways, marking DM-only references', () => {
    const { outgoing, incoming } = linksOf(refs.npcs.knukkles)
    expect(outgoing).toContainEqual(
      expect.objectContaining({ to: refs.locations.the_sullen_monk, field: 'location' }),
    )
    expect(incoming).toContainEqual(
      expect.objectContaining({ from: refs.locations.the_sullen_monk, dmOnly: true }),
    )
    for (const link of linksOf(refs.pcs.jim).incoming) {
      expect(linksOf(link.from).outgoing).toContainEqual(link)
    }
  })

  it('labels DM-only fields and can leave them out', () => {
    expect(getRecord('refs.pcs.jim')).toContain('background [DM-only]')
    expect(getRecord('refs.pcs.jim', false)).not.toContain('[DM-only]:')
  })

  it('lists played events in play order, filtered by who was involved', () => {
    const text = timeline({ involving: 'refs.npcs.roberto', limit: 100 })
    expect(text).toContain('(refs.events.n2_e076)')
    expect(text.indexOf('(refs.events.n2_e073)')).toBeLessThan(
      text.indexOf('(refs.events.n2_e076)'),
    )
    expect(timeline({ session: 1 })).toContain('## S1:')
  })

  it('searches every kind, DM prep included', () => {
    expect(search('green beam', { visibility: 'dm-only' })).toContain(
      '(refs.scenes.the_green_beam_over_the_sky_islands)',
    )
    expect(search('green beam', { visibility: 'player-known' })).not.toContain('refs.scenes.')
  })

  it('finds the records an idea names, distinguishing Light from light', () => {
    expect(mentionsIn('Light sends Knukkles to Nimbus')).toEqual(
      expect.arrayContaining([
        refs.npcs.light_13th_marshal,
        refs.npcs.knukkles,
        refs.locations.nimbus,
      ]),
    )
    expect(mentionsIn('a dim light in the window')).not.toContainEqual(refs.npcs.light_13th_marshal)
  })

  it('warns about the usual conflicts when checking an idea', () => {
    const text = checkIdea('Roberto returns to warn Jim, and Knukkles follows him', [
      'refs.pcs.revin_grumblefist',
    ])
    expect(text).toContain('Possible state change in S9, day 15')
    expect(text).toContain('The party has not met Knukkles')
    expect(text).toContain('is retired, not an active PC')
  })

  it('lists who has met a character from shared played events', () => {
    const text = met('refs.npcs.roberto')
    expect(text).toContain('Devan (refs.pcs.devan) [pc, active]')
    expect(text).not.toContain('(refs.npcs.roberto) [')
  })

  it('summarises the campaign and its open questions', () => {
    expect(overview()).toContain('## Open arcs')
    expect(openQuestions()).toMatch(/^# \d+ open canon question/u)
  })
})
