import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'splash', panels: [{ event: refs.events.n2_e086, art: { from: 'event' } }] },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e087, art: { from: 'event' } },
        { event: refs.events.n2_e061, art: { from: 'event' } },
      ],
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e062, art: { from: 'event' } }] },
  ],
})
