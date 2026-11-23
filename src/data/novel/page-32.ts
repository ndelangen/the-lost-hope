import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'steps',
      panels: [
        { event: refs.events.n2_e199, art: { from: 'event' } },
        { event: refs.events.n2_e200, art: { from: 'event' } },
        { event: refs.events.n2_e201, art: { from: 'event' } },
        { event: refs.events.n2_e202, art: { from: 'event' } },
      ],
    },
    { layout: 'splash', panels: [{ event: refs.events.n2_e203, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e204, art: { from: 'event' } }] },
  ],
})
