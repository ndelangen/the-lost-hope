import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'cinema', panels: [{ event: refs.events.n2_e007, art: { from: 'event' } }] },
    {
      layout: 'wideLeft',
      panels: [
        { event: refs.events.n2_e008, art: { from: 'event' } },
        { event: refs.events.n2_e009, art: { from: 'event' } },
      ],
    },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e010, art: { from: 'event' } }] },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e011, art: { from: 'event' } }] },
  ],
})
