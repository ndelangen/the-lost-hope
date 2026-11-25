import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'zigzag',
      panels: [
        { event: refs.events.n2_e077, art: { from: 'event' } },
        { event: refs.events.n2_e089, art: { from: 'event' } },
        { event: refs.events.n2_e078, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e090, art: { from: 'event' } }] },
    { layout: 'full', panels: [{ event: refs.events.n2_e079, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e080, art: { from: 'event' } }] },
  ],
})
