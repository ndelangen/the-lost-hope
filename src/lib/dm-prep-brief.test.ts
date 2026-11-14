import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'

import { arcs, table } from './dm-campaign'
import { buildPrepBrief, sourceText } from './dm-prep-brief'

describe('DM prep brief', () => {
  const brief = buildPrepBrief()

  it('lists every open plot of every open arc, with the refs to write', () => {
    const entries = Object.entries(arcs)
    const listed = entries.filter(([key]) => brief.includes(`(refs.arcs.${key})`))
    const open = entries.filter(([, arc]) => arc.plots.some((plot) => plot.status === 'open'))
    expect(listed.map(([key]) => key)).toEqual(open.map(([key]) => key))
    const plots = open.flatMap(([, arc]) => arc.plots.filter((plot) => plot.status === 'open'))
    expect(plots.filter((plot) => !brief.includes(`(plot slug \`${plot.slug}\`)`))).toEqual([])
  })

  it('includes the selected and pinned scenes', () => {
    for (const ref of [...table.likely, ...table.pinned]) {
      expect(brief).toContain(`(refs.scenes.${ref.key})`)
    }
  })

  it('names references, including records players have not met', () => {
    expect(sourceText([['Ask ', refs.npcs.the_fiddler, ' first.']])).toBe(
      'Ask The Fiddler (refs.npcs.the_fiddler) first.',
    )
    expect(sourceText([['One.'], ['Two.']])).toBe('One.\nTwo.')
  })
})
