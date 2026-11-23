import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'full', panels: [{ event: refs.events.n2_e044, art: { from: 'event' } }] },
    {
      layout: 'slash',
      panels: [
        { event: refs.events.n2_e060, art: { from: 'event' } },
        { event: refs.events.n2_e045, art: { from: 'event' } },
      ],
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e083, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e109, art: { from: 'event' } }] },
  ],
})
