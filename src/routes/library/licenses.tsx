import { createFileRoute } from '@tanstack/react-router'

import { OPEN_GAME_LICENSE } from '#/data/library/open-game-license'
import publications from '#/data/library/publications'

export const Route = createFileRoute('/library/licenses')({
  head: () => ({ meta: [{ title: 'Licenses | The Lost Hope Library' }] }),
  component: LicensesPage,
})

/** The open licenses the library's published text is used under, with every notice they ask for. */
function LicensesPage() {
  const licensed = Object.values(publications).filter(({ notice }) => notice)
  const ogl = licensed.filter(({ license }) => license === 'ogl-1.0a')
  const cc = licensed.filter(({ license }) => license === 'cc-by-4.0')
  return (
    <article className="grid max-w-3xl gap-6 text-sm leading-relaxed">
      <h1 className="text-3xl font-bold">Licenses and notices</h1>
      <section className="grid gap-2">
        <h2 className="text-xl font-semibold">Creative Commons Attribution 4.0</h2>
        {cc.map(({ name, notice }) => (
          <p key={name}>{notice}</p>
        ))}
        <p>
          License:{' '}
          <a className="underline" href="https://creativecommons.org/licenses/by/4.0/legalcode">
            creativecommons.org/licenses/by/4.0
          </a>
        </p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-xl font-semibold">Open Game License 1.0a</h2>
        <p>
          Open Game Content: the spell and creature text of the publications below. Product Identity
          of those publications is not Open Game Content.
        </p>
        {OPEN_GAME_LICENSE.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="font-semibold">15. COPYRIGHT NOTICE</p>
        <p>Open Game License v 1.0a Copyright 2000, Wizards of the Coast, Inc.</p>
        {ogl.map(({ name, notice }) => (
          <p key={name}>{notice}</p>
        ))}
      </section>
    </article>
  )
}
