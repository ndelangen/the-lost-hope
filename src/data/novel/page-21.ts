import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'wideLeft',
      panels: [
        { event: refs.events.n2_e123, art: { from: 'event' } },
        { event: refs.events.n2_e124, art: { from: 'event' } },
      ],
    },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e125, art: { from: 'event' } },
        { event: refs.events.n2_e126, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e127, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e128, art: { from: 'event' } }] },
  ],
})
