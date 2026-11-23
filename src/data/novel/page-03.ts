import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'stackRight',
      panels: [
        { event: refs.events.n2_e012, art: { from: 'event' } },
        { event: refs.events.n2_e013, art: { from: 'event' } },
        { event: refs.events.n2_e014, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e015, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e016, art: { from: 'event' } }] },
    { layout: 'cinema', panels: [{ event: refs.events.n2_e017, art: { from: 'event' } }] },
  ],
})
