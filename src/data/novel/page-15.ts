import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'stackRight',
      panels: [
        { event: refs.events.n2_e047, art: { from: 'event' } },
        { event: refs.events.n2_e084, art: { from: 'event' } },
        { event: refs.events.n2_e048, art: { from: 'event' } },
      ],
    },
    {
      layout: 'shards',
      panels: [
        { event: refs.events.n2_e049, art: { from: 'event' } },
        { event: refs.events.n2_e050, art: { from: 'event' } },
        { event: refs.events.n2_e051, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e085, art: { from: 'event' } }] },
  ],
})
