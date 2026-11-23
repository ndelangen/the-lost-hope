import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'stackRight',
      panels: [
        { event: refs.events.n2_e091, art: { from: 'event' } },
        { event: refs.events.n2_e092, art: { from: 'event' } },
        { event: refs.events.n2_e093, art: { from: 'event' } },
      ],
    },
    {
      layout: 'slash',
      panels: [
        { event: refs.events.n2_e094, art: { from: 'event' } },
        { event: refs.events.n2_e095, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e097, art: { from: 'event' } }] },
  ],
})
