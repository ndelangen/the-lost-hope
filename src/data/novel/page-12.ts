import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'tiltStack',
      panels: [
        { event: refs.events.n2_e065, art: { from: 'event' } },
        { event: refs.events.n2_e066, art: { from: 'event' } },
      ],
    },
    {
      layout: 'cut',
      panels: [
        { event: refs.events.n2_e067, art: { from: 'event' } },
        { event: refs.events.n2_e068, art: { from: 'event' } },
      ],
    },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e069, art: { from: 'event' } },
        { event: refs.events.n2_e070, art: { from: 'event' } },
      ],
    },
  ],
})
