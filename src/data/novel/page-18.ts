import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'leanStack',
      panels: [
        { event: refs.events.n2_e098, art: { from: 'event' } },
        { event: refs.events.n2_e099, art: { from: 'event' } },
        { event: refs.events.n2_e100, art: { from: 'event' } },
      ],
    },
    {
      layout: 'insetLeft',
      panels: [
        { event: refs.events.n2_e096, art: { from: 'event' } },
        { event: refs.events.n2_e101, art: { from: 'event' } },
      ],
    },
    { layout: 'bleedCinema', panels: [{ event: refs.events.n2_e110, art: { from: 'event' } }] },
  ],
})
