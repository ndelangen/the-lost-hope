import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'stackRight',
      panels: [
        { event: refs.events.n2_e072, art: { from: 'event' } },
        { event: refs.events.n2_e073, art: { from: 'event' } },
        { event: refs.events.n2_e088, art: { from: 'event' } },
      ],
    },
    {
      layout: 'insetLeft',
      panels: [
        { event: refs.events.n2_e074, art: { from: 'event' } },
        { event: refs.events.n2_e075, art: { from: 'event' } },
      ],
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e076, art: { from: 'event' } }] },
  ],
})
