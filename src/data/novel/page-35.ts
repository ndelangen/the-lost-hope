import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'wideRight',
      panels: [
        { event: refs.events.n2_e218, art: { from: 'event' } },
        {
          event: refs.events.n2_e219,
          art: { from: 'event' },
        },
      ],
    },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e220, art: { from: 'event' } },
        {
          event: refs.events.n2_e221,
          art: { from: 'event' },
        },
      ],
    },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e221, art: { from: 'event', index: 1 } },
        { event: refs.events.n2_e221, art: { from: 'event', index: 2 } },
      ],
    },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e222, art: { from: 'event' } }] },
  ],
})
