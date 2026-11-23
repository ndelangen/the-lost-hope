import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'full', panels: [{ event: refs.events.n2_e023, art: { from: 'event' } }] },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e024, art: { from: 'event' } },
        { event: refs.events.n2_e025, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e103, art: { from: 'event' } }] },
  ],
})
