import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'insetRight',
      panels: [
        { event: refs.events.n2_e046, art: { from: 'event' } },
        { event: refs.events.n2_e064, art: { from: 'event' } },
      ],
    },
    {
      layout: 'slash',
      panels: [
        { event: refs.events.n2_e063, art: { from: 'event' } },
        { event: refs.events.n2_e058, art: { from: 'event' } },
      ],
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e059, art: { from: 'event' } }] },
  ],
})
