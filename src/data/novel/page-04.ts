import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'zigzag',
      panels: [
        { event: refs.events.n2_e018, art: { from: 'event' } },
        { event: refs.events.n2_e019, art: { from: 'event' } },
        { event: refs.events.n2_e020, art: { from: 'event' } },
      ],
    },
    { layout: 'splash', panels: [{ event: refs.events.n2_e021, art: { from: 'event' } }] },
    { layout: 'full', panels: [{ event: refs.events.n2_e022, art: { from: 'event' } }] },
  ],
})
