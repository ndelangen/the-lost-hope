import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'wideLeft',
      panels: [
        { event: refs.events.n2_e026, art: { from: 'event' } },
        { event: refs.events.n2_e027, art: { from: 'event' } },
      ],
    },
    {
      layout: 'tallLeft',
      panels: [
        { event: refs.events.n2_e028, art: { from: 'event' } },
        { event: refs.events.n2_e029, art: { from: 'event' } },
        { event: refs.events.n2_e081, art: { from: 'event' } },
      ],
    },
    {
      layout: 'shards',
      panels: [
        { event: refs.events.n2_e030, art: { from: 'event' } },
        { event: refs.events.n2_e031, art: { from: 'event' } },
        { event: refs.events.n2_e032, art: { from: 'event' } },
      ],
    },
  ],
})
