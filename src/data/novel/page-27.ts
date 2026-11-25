import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'stackRight',
      panels: [
        { event: refs.events.n2_e166, art: { from: 'event' } },
        { event: refs.events.n2_e167, art: { from: 'event' } },
        { event: refs.events.n2_e168, art: { from: 'event' } },
      ],
    },
    {
      layout: 'wideRight',
      panels: [
        { event: refs.events.n2_e169, art: { from: 'event' } },
        { event: refs.events.n2_e170, art: { from: 'event' } },
      ],
    },
    {
      layout: 'wideRight',
      panels: [
        { event: refs.events.n2_e171, art: { from: 'event' } },
        { event: refs.events.n2_e172, art: { from: 'event' } },
      ],
    },
  ],
})
