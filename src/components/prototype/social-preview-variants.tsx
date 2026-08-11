import {
  BookOpen,
  CalendarRange,
  CircleHelp,
  MapPinned,
  Scroll,
  Sparkles,
  Users,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type PreviewCase = {
  key: string
  label: string
  eyebrow: string
  title: string
  description?: string
  context?: string
  footnote?: string
  accent: string
  softAccent: string
  image?: string
  icon: ComponentType<{ className?: string }>
}

export const PREVIEW_CASES: PreviewCase[] = [
  {
    key: 'home',
    label: 'Index',
    eyebrow: 'Campaign companion',
    title: 'The Lost Hope',
    description:
      'Reconstruct the story, follow unresolved mysteries, and explore every person, place, and event in the campaign.',
    context: 'Player campaign archive',
    footnote: 'Latest: Session 12 · The Flying Bazaar',
    accent: '#d59b42',
    softAccent: '#f8e7c7',
    icon: BookOpen,
  },
  {
    key: 'collection',
    label: 'Collection',
    eyebrow: 'NPC archive',
    title: 'People of the Lost Hope',
    description: 'Friends, rivals, strangers, and powers encountered across the party’s journey.',
    context: '40 known figures',
    footnote: 'Explore the campaign',
    accent: '#8b5cf6',
    softAccent: '#ede9fe',
    icon: Users,
  },
  {
    key: 'image-rich',
    label: 'Image-rich detail',
    eyebrow: 'Player character',
    title: 'Swift Starblade',
    description:
      'A sailor marked by old family blood, unfinished bargains, and a sea that may no longer welcome him.',
    context: 'Human · The Lost Hope',
    footnote: 'Referenced across 19 events',
    accent: '#0891b2',
    softAccent: '#cffafe',
    image: '/assets/pcs/swift.jpg',
    icon: Sparkles,
  },
  {
    key: 'event',
    label: 'Event',
    eyebrow: 'Campaign event',
    title: 'The party boards Sylvia’s flying bazaar',
    description:
      'The group steps into a travelling market suspended above the clouds—and into Sylvia’s carefully arranged invitation.',
    context: 'Campaign day 32',
    footnote: 'The Flying Bazaar',
    accent: '#d97706',
    softAccent: '#fef3c7',
    icon: CalendarRange,
  },
  {
    key: 'quest',
    label: 'Quest',
    eyebrow: 'Open mystery',
    title: 'Do the Fajanet Tunnels connect to the Shadow Realm?',
    description:
      'Clues point beyond the known tunnels, but the nature of the passage—and what waits across it—remains unresolved.',
    context: '4 clues collected',
    footnote: 'Quest archive',
    accent: '#e11d48',
    softAccent: '#ffe4e6',
    icon: Scroll,
  },
  {
    key: 'image-poor',
    label: 'Image-poor detail',
    eyebrow: 'Location',
    title: 'The Mountain Holy Site',
    description:
      'A sacred threshold in the mountains whose faith, deity, and intended form remain uncertain.',
    context: 'The mountains',
    footnote: 'Referenced by 6 records',
    accent: '#059669',
    softAccent: '#d1fae5',
    icon: MapPinned,
  },
  {
    key: 'long-title',
    label: 'Long title',
    eyebrow: 'Campaign event',
    title: 'Sylvia reveals the Starblade family’s bloody history',
    description:
      'A private history becomes public, reframing Swift’s inheritance and the danger attached to his name.',
    context: 'Campaign day 34',
    footnote: 'Session 12',
    accent: '#d97706',
    softAccent: '#fef3c7',
    icon: CalendarRange,
  },
  {
    key: 'missing-data',
    label: 'Missing data',
    eyebrow: 'Unresolved record',
    title: 'The Unknown Figure',
    context: 'Identity not established',
    footnote: 'Campaign archive',
    accent: '#64748b',
    softAccent: '#e2e8f0',
    icon: CircleHelp,
  },
]

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={
          dark
            ? 'grid size-9 place-items-center rounded-full border border-white/25 bg-white/10'
            : 'grid size-9 place-items-center rounded-full border border-slate-950/15 bg-slate-950 text-amber-300'
        }
      >
        <Sparkles className="size-4" />
      </span>
      <span className="text-[15px] font-black tracking-[0.22em] uppercase">The Lost Hope</span>
    </div>
  )
}

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto aspect-[1200/630] w-full max-w-[1200px] overflow-hidden rounded-[18px] shadow-2xl ring-1 shadow-slate-950/20 ring-black/10">
      {children}
    </div>
  )
}

export function IlluminatedLedgerVariant({ page }: { page: PreviewCase }) {
  const Icon = page.icon

  return (
    <PreviewFrame>
      <article className="relative flex size-full overflow-hidden bg-[#f6f0e4] text-[#172032]">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 5%, rgba(213,155,66,.28), transparent 32%), repeating-linear-gradient(0deg, transparent 0 31px, rgba(23,32,50,.035) 32px)',
          }}
        />
        <div className="relative flex w-[67%] flex-col justify-between p-[6.6%] pr-[4%]">
          <BrandMark />
          <div className="max-w-[720px]">
            <p
              className="mb-[2.2%] text-[clamp(13px,1.5vw,23px)] font-bold tracking-[0.18em] uppercase"
              style={{ color: page.accent }}
            >
              {page.eyebrow}
            </p>
            <h1 className="font-serif text-[clamp(34px,5.3vw,76px)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
              {page.title}
            </h1>
            {page.description ? (
              <p className="mt-[4%] max-w-[690px] text-[clamp(14px,1.7vw,25px)] leading-[1.35] text-slate-600">
                {page.description}
              </p>
            ) : (
              <p className="mt-[4%] text-[clamp(14px,1.7vw,25px)] text-slate-500 italic">
                No further details have been established.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 text-[clamp(12px,1.25vw,19px)] font-semibold text-slate-600">
            <span>{page.context}</span>
            <span aria-hidden>·</span>
            <span>{page.footnote}</span>
          </div>
        </div>
        <div className="relative m-[2.4%] ml-0 flex flex-1 overflow-hidden rounded-[15px] border border-black/10 bg-slate-900">
          {page.image ? (
            <img src={page.image} alt="" className="size-full object-cover" />
          ) : (
            <div
              className="relative grid size-full place-items-center"
              style={{ background: `linear-gradient(145deg, ${page.softAccent}, #172032)` }}
            >
              <Icon className="size-[34%] text-white/90 drop-shadow-xl" />
              <div className="absolute inset-5 rounded-[10px] border border-white/25" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
      </article>
    </PreviewFrame>
  )
}

export function MidnightDossierVariant({ page }: { page: PreviewCase }) {
  const Icon = page.icon

  return (
    <PreviewFrame>
      <article className="relative grid size-full grid-cols-[18%_1fr] overflow-hidden bg-[#0c1424] text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <aside className="relative flex flex-col items-center justify-between border-r border-white/10 py-[15%]">
          <div
            className="grid aspect-square w-[48%] place-items-center rounded-2xl"
            style={{ backgroundColor: page.accent }}
          >
            <Icon className="size-[48%]" />
          </div>
          <p className="-rotate-90 text-[clamp(12px,1.2vw,18px)] font-bold tracking-[0.28em] whitespace-nowrap text-white/45 uppercase">
            Campaign archive
          </p>
          <span className="text-[clamp(13px,1.4vw,20px)] font-black text-white/70">LH · 02</span>
        </aside>
        <div className="relative flex flex-col justify-between p-[5.5%]">
          <div className="flex items-center justify-between">
            <p
              className="rounded-full border border-white/15 bg-white/5 px-[2.3%] py-[1%] text-[clamp(12px,1.25vw,18px)] font-bold tracking-[0.16em] uppercase"
              style={{ color: page.softAccent }}
            >
              {page.eyebrow}
            </p>
            <BrandMark dark />
          </div>
          <div className="grid grid-cols-[1fr_29%] items-end gap-[5%]">
            <div>
              <h1 className="max-w-[790px] text-[clamp(35px,5.4vw,78px)] leading-[0.96] font-black tracking-[-0.055em] text-balance">
                {page.title}
              </h1>
              <p
                className="mt-[3.5%] max-w-[740px] border-l-4 pl-[3%] text-[clamp(14px,1.65vw,24px)] leading-[1.38] text-slate-300"
                style={{ borderColor: page.accent }}
              >
                {page.description ?? 'No further details have been established.'}
              </p>
            </div>
            <div className="border-t border-white/15 pt-[8%] text-right text-[clamp(12px,1.3vw,19px)]">
              <p className="font-bold text-white">{page.context}</p>
              <p className="mt-2 text-white/50">{page.footnote}</p>
            </div>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[38%]" style={{ backgroundColor: page.accent }} />
          </div>
        </div>
      </article>
    </PreviewFrame>
  )
}

export function WorldWindowVariant({ page }: { page: PreviewCase }) {
  const Icon = page.icon

  return (
    <PreviewFrame>
      <article className="relative size-full overflow-hidden bg-slate-950 text-white">
        {page.image ? (
          <img
            src={page.image}
            alt=""
            className="absolute inset-0 size-full object-cover object-top"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 75% 28%, ${page.accent} 0, transparent 30%), linear-gradient(135deg, #07111f, #172032 58%, ${page.accent})`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
        <div className="relative flex size-full flex-col justify-between p-[5.2%]">
          <div className="flex items-center justify-between">
            <BrandMark dark />
            <p className="text-[clamp(12px,1.3vw,20px)] font-semibold tracking-[0.12em] text-white/70 uppercase">
              {page.context}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_18%] items-end gap-[5%]">
            <div className="max-w-[840px]">
              <p
                className="mb-[2%] text-[clamp(13px,1.45vw,22px)] font-bold tracking-[0.2em] uppercase"
                style={{ color: page.softAccent }}
              >
                {page.eyebrow}
              </p>
              <h1 className="text-[clamp(36px,5.5vw,80px)] leading-[0.95] font-black tracking-[-0.055em] text-balance drop-shadow-xl">
                {page.title}
              </h1>
              <p className="mt-[3%] max-w-[790px] text-[clamp(14px,1.65vw,24px)] leading-[1.35] text-white/80 drop-shadow">
                {page.description ?? 'No further details have been established.'}
              </p>
            </div>
            <div className="grid aspect-square place-items-center rounded-full border border-white/25 bg-black/25 backdrop-blur-md">
              <Icon className="size-[43%]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-white/25" />
            <span className="text-[clamp(11px,1.15vw,17px)] font-bold tracking-[0.16em] text-white/70 uppercase">
              {page.footnote}
            </span>
          </div>
        </div>
      </article>
    </PreviewFrame>
  )
}
