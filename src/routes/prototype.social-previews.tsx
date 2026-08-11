import { createFileRoute } from '@tanstack/react-router'

import { PrototypeSwitcher } from '#/components/prototype/prototype-switcher'
import {
  IlluminatedLedgerVariant,
  MidnightDossierVariant,
  PREVIEW_CASES,
  WorldWindowVariant,
} from '#/components/prototype/social-preview-variants'

type VariantKey = 'A' | 'B' | 'C'

const VARIANTS = [
  { key: 'A', name: 'Illuminated ledger' },
  { key: 'B', name: 'Midnight dossier' },
  { key: 'C', name: 'World window' },
] satisfies Array<{ key: VariantKey; name: string }>

function normalizeVariant(value: unknown): VariantKey {
  return value === 'B' || value === 'C' ? value : 'A'
}

function normalizeCase(value: unknown): string {
  return PREVIEW_CASES.some((previewCase) => previewCase.key === value) ? String(value) : 'home'
}

export const Route = createFileRoute('/prototype/social-previews')({
  validateSearch: (search: Record<string, unknown>) => ({
    variant: normalizeVariant(search.variant),
    case: normalizeCase(search.case),
  }),
  component: SocialPreviewPrototype,
})

// Three social-preview systems, switchable via ?variant=, on a throwaway prototype route.
function SocialPreviewPrototype() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const page =
    PREVIEW_CASES.find((previewCase) => previewCase.key === search.case) ?? PREVIEW_CASES[0]

  function updateSearch(next: Partial<{ variant: VariantKey; case: string }>): void {
    void navigate({
      search: (current) => ({ ...current, ...next }),
      replace: true,
      resetScroll: false,
    })
  }

  return (
    <div className="mx-auto flex max-w-[1240px] flex-col gap-8 pb-24">
      <header className="flex flex-col gap-3">
        <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
          Throwaway prototype
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Build-generated social previews</h1>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Compare three visual systems at the real 1200×630 aspect ratio. Use the cases to stress
          each system with index pages, portraits, icon-only pages, long titles, and sparse canon.
        </p>
      </header>

      <nav aria-label="Preview test case" className="flex flex-wrap gap-2">
        {PREVIEW_CASES.map((previewCase) => {
          const selected = previewCase.key === page.key
          return (
            <button
              key={previewCase.key}
              type="button"
              onClick={() => updateSearch({ case: previewCase.key })}
              className={
                selected
                  ? 'bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground rounded-full border px-4 py-2 text-sm font-medium transition-colors'
              }
              aria-pressed={selected}
            >
              {previewCase.label}
            </button>
          )
        })}
      </nav>

      <section aria-live="polite">
        {search.variant === 'A' ? <IlluminatedLedgerVariant page={page} /> : null}
        {search.variant === 'B' ? <MidnightDossierVariant page={page} /> : null}
        {search.variant === 'C' ? <WorldWindowVariant page={page} /> : null}
      </section>

      <div className="grid gap-4 rounded-2xl border p-5 text-sm md:grid-cols-3">
        <p>
          <strong>A — Illuminated ledger:</strong> editorial, warm, and legible; portrait or emblem
          occupies a dedicated panel.
        </p>
        <p>
          <strong>B — Midnight dossier:</strong> compact campaign intelligence; hierarchy comes from
          typography, labels, and a strong kind accent.
        </p>
        <p>
          <strong>C — World window:</strong> cinematic and emotional; imagery or atmospheric color
          becomes the page’s world.
        </p>
      </div>

      <PrototypeSwitcher
        variants={VARIANTS}
        current={search.variant}
        onChange={(variant) => updateSearch({ variant: normalizeVariant(variant) })}
      />
    </div>
  )
}
