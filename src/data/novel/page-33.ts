import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'stackRight',
      panels: [
        { event: refs.events.n2_e206, art: { from: 'event' } },
        {
          event: refs.events.n2_e207,
          art: { from: 'event' },
        },
        { event: refs.events.n2_e208, art: { from: 'event' } },
      ],
    },
    {
      layout: 'cut',
      panels: [
        { event: refs.events.n2_e209, art: { from: 'event' } },
        { event: refs.events.n2_e210, art: { from: 'event' } },
      ],
    },
    {
      layout: 'wideRight',
      panels: [
        { event: refs.events.n2_e211, art: { from: 'event' } },
        {
          event: refs.events.n2_e212,
          art: { from: 'event' },
        },
      ],
    },
  ],
})
