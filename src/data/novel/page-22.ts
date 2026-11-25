import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'tiltSplit',
      panels: [
        { event: refs.events.n2_e129, art: { from: 'event' } },
        { event: refs.events.n2_e130, art: { from: 'event' } },
        { event: refs.events.n2_e131, art: { from: 'event' } },
      ],
    },
    {
      layout: 'cut',
      panels: [
        { event: refs.events.n2_e132, art: { from: 'event' } },
        { event: refs.events.n2_e133, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e134, art: { from: 'event' } }] },
  ],
})
