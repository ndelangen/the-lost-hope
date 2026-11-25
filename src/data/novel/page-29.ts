import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'zigzag',
      panels: [
        { event: refs.events.n2_e180, art: { from: 'event' } },
        { event: refs.events.n2_e205, art: { from: 'event' } },
        { event: refs.events.n2_e181, art: { from: 'event' } },
      ],
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e182, art: { from: 'event' } }] },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e183, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e184, art: { from: 'event' } }] },
  ],
})
