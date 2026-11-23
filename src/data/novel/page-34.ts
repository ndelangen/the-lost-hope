import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e212, art: { from: 'event', index: 1 } },
        { event: refs.events.n2_e213, art: { from: 'event' } },
      ],
    },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e214, art: { from: 'event' } },
        {
          event: refs.events.n2_e215,
          art: { from: 'event' },
        },
      ],
    },
    {
      layout: 'cut',
      panels: [
        { event: refs.events.n2_e215, art: { from: 'event', index: 1 } },
        { event: refs.events.n2_e216, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e217, art: { from: 'event' } }] },
  ],
})
