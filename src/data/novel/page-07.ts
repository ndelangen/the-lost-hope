import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'tiltStack',
      panels: [
        { event: refs.events.n2_e033, art: { from: 'event' } },
        { event: refs.events.n2_e034, art: { from: 'event' } },
      ],
    },
    {
      layout: 'stackLeft',
      panels: [
        { event: refs.events.n2_e035, art: { from: 'event' } },
        { event: refs.events.n2_e036, art: { from: 'event' } },
        { event: refs.events.n2_e037, art: { from: 'event' } },
      ],
    },
    {
      layout: 'shards',
      panels: [
        { event: refs.events.n2_e038, art: { from: 'event' } },
        { event: refs.events.n2_e039, art: { from: 'event' } },
        { event: refs.events.n2_e040, art: { from: 'event' } },
      ],
    },
  ],
})
