import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'steps',
      panels: [
        { event: refs.events.n2_e192, art: { from: 'event' } },
        { event: refs.events.n2_e193, art: { from: 'event' } },
        { event: refs.events.n2_e194, art: { from: 'event' } },
        { event: refs.events.n2_e195, art: { from: 'event' } },
      ],
    },
    {
      layout: 'halves',
      panels: [
        { event: refs.events.n2_e196, art: { from: 'event' } },
        { event: refs.events.n2_e197, art: { from: 'event' } },
      ],
    },
    { layout: 'splash', panels: [{ event: refs.events.n2_e198, art: { from: 'event' } }] },
  ],
})
