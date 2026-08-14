import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Gauge,
  Monitor,
  RectangleVertical,
} from 'lucide-react'
import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'

import { cn } from '#/lib/utils'

// Three delivery contracts on the existing atlas route, switchable with `?variant=`.
export type ResponsiveImagePrototypeVariant = 'A' | 'B' | 'C'

type Contract = {
  key: ResponsiveImagePrototypeVariant
  name: string
  quality: 70 | 80 | 85
  socialQuality: 80 | 85
  sampling: string
  tone: string
  verdict: string
  loading: string
  viewer: string
  appChrome: string
}

const CONTRACTS: Record<ResponsiveImagePrototypeVariant, Contract> = {
  A: {
    key: 'A',
    name: 'Fidelity first',
    quality: 85,
    socialQuality: 85,
    sampling: '4:4:4',
    tone: 'border-violet-500/40 bg-violet-500/5',
    verdict: 'Safest pixels, but spends bytes and keeps alpha exceptions.',
    loading: 'Eager for every visible image; dense candidate ladder.',
    viewer: 'Preload the largest portrait before the viewer opens.',
    appChrome: 'Keep transparent PNG/ICO as a narrow app-chrome exception.',
  },
  B: {
    key: 'B',
    name: 'Slot first — recommended',
    quality: 80,
    socialQuality: 85,
    sampling: '4:2:0',
    tone: 'border-emerald-500/50 bg-emerald-500/5',
    verdict: 'Precise slots, progressive delivery, and no transparent output.',
    loading: 'Eager only for visible navigation and likely LCP; lazy below the fold.',
    viewer: 'Load the large portrait when the viewer is opened.',
    appChrome: 'Flatten required PNG/ICO onto brand navy; remove the unused TanStack PNG.',
  },
  C: {
    key: 'C',
    name: 'Lean mobile first',
    quality: 70,
    socialQuality: 80,
    sampling: '4:2:0',
    tone: 'border-amber-500/50 bg-amber-500/5',
    verdict: 'Lowest bytes, with visible risk on faces, gradients, and map labels.',
    loading: 'Sparse candidate ladder and lazy loading except the measured LCP.',
    viewer: 'Load the large portrait on interaction, using the sparse ladder.',
    appChrome: 'Flatten required PNG/ICO and use the smallest platform-valid dimensions.',
  },
}

const WIDTHS: Record<ResponsiveImagePrototypeVariant, readonly number[]> = {
  A: [32, 64, 96, 128, 192, 256, 384, 512, 640, 768, 960, 1024, 1254],
  B: [32, 64, 96, 128, 192, 256, 384, 512, 640, 768, 960, 1024, 1254],
  C: [64, 192, 768, 1254],
}

const BYTES: Record<string, number> = {
  'cassian-w32-q70.jpg': 857,
  'cassian-w32-q80.jpg': 940,
  'cassian-w32-q85.jpg': 1123,
  'cassian-w64-q70.jpg': 1614,
  'cassian-w64-q80.jpg': 1885,
  'cassian-w64-q85.jpg': 2511,
  'cassian-w96-q70.jpg': 2742,
  'cassian-w96-q80.jpg': 3280,
  'cassian-w96-q85.jpg': 4597,
  'cassian-w128-q70.jpg': 4183,
  'cassian-w128-q80.jpg': 5099,
  'cassian-w128-q85.jpg': 7259,
  'cassian-w192-q70.jpg': 7977,
  'cassian-w192-q80.jpg': 9955,
  'cassian-w192-q85.jpg': 14434,
  'cassian-w256-q70.jpg': 13197,
  'cassian-w256-q80.jpg': 16538,
  'cassian-w256-q85.jpg': 24214,
  'cassian-w384-q70.jpg': 27744,
  'cassian-w384-q80.jpg': 35261,
  'cassian-w384-q85.jpg': 52036,
  'cassian-w512-q70.jpg': 48756,
  'cassian-w512-q80.jpg': 62514,
  'cassian-w512-q85.jpg': 91900,
  'cassian-w640-q70.jpg': 77134,
  'cassian-w640-q80.jpg': 99947,
  'cassian-w640-q85.jpg': 144901,
  'cassian-w768-q70.jpg': 113073,
  'cassian-w768-q80.jpg': 146537,
  'cassian-w768-q85.jpg': 209743,
  'cassian-w960-q70.jpg': 178543,
  'cassian-w960-q80.jpg': 229470,
  'cassian-w960-q85.jpg': 322096,
  'cassian-w1024-q70.jpg': 202765,
  'cassian-w1024-q80.jpg': 259733,
  'cassian-w1024-q85.jpg': 362660,
  'cassian-w1254-q70.jpg': 299882,
  'cassian-w1254-q80.jpg': 383545,
  'cassian-w1254-q85.jpg': 530835,
  'map-w600-q70.jpg': 22872,
  'map-w600-q80.jpg': 26793,
  'map-w600-q85.jpg': 36086,
  'map-w1200-q70.jpg': 55517,
  'map-w1200-q80.jpg': 64473,
  'map-w1200-q85.jpg': 89120,
  'social-cassian-w600-q70.jpg': 19099,
  'social-cassian-w600-q80.jpg': 24315,
  'social-cassian-w600-q85.jpg': 28584,
  'social-cassian-w1200-q70.jpg': 62833,
  'social-cassian-w1200-q80.jpg': 79761,
  'social-cassian-w1200-q85.jpg': 93551,
}

const ASSET_ROOT = '/prototypes/responsive-images'

function candidatePath(prefix: string, width: number, quality: number): string {
  return `${ASSET_ROOT}/${prefix}-w${width}-q${quality}.jpg`
}

function candidateSet(prefix: string, widths: readonly number[], quality: number): string {
  return widths.map((width) => `${candidatePath(prefix, width, quality)} ${width}w`).join(', ')
}

function formatBytes(bytes: number | undefined): string {
  if (bytes === undefined) return 'measuring…'
  if (bytes < 1000) return `${bytes} B`
  return `${(bytes / 1000).toFixed(bytes < 10000 ? 1 : 0)} KB`
}

function filename(url: string): string {
  return url.split('/').at(-1)?.split('?')[0] ?? url
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
  )
}

function PrototypeSwitcher({
  variant,
  onVariantChange,
}: {
  variant: ResponsiveImagePrototypeVariant
  onVariantChange: (variant: ResponsiveImagePrototypeVariant) => void
}) {
  const keys: ResponsiveImagePrototypeVariant[] = ['A', 'B', 'C']
  const currentIndex = keys.indexOf(variant)
  const previous = keys[(currentIndex - 1 + keys.length) % keys.length] ?? 'A'
  const next = keys[(currentIndex + 1) % keys.length] ?? 'A'

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return
      if (event.key === 'ArrowLeft') onVariantChange(previous)
      if (event.key === 'ArrowRight') onVariantChange(next)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, onVariantChange, previous])

  return (
    <div className="fixed inset-x-0 bottom-5 z-[100] flex justify-center px-3">
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/95 p-1.5 text-white shadow-2xl backdrop-blur">
        <button
          type="button"
          onClick={() => onVariantChange(previous)}
          aria-label={`Show contract ${previous}`}
          className="grid size-9 place-items-center rounded-full hover:bg-white/10"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <p className="min-w-48 text-center text-sm font-semibold">
          {variant} — {CONTRACTS[variant].name}
        </p>
        <button
          type="button"
          onClick={() => onVariantChange(next)}
          aria-label={`Show contract ${next}`}
          className="grid size-9 place-items-center rounded-full hover:bg-white/10"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

function ProbeImage({
  label,
  src,
  srcSet,
  sizes,
  width,
  height,
  loading,
  fetchPriority,
  frameClassName,
  imageClassName,
}: {
  label: string
  src: string
  srcSet?: string
  sizes?: string
  width: number
  height: number
  loading: 'eager' | 'lazy'
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>['fetchPriority']
  frameClassName: string
  imageClassName?: string
}) {
  const ref = useRef<HTMLImageElement>(null)
  const [selected, setSelected] = useState(filename(src))
  const [renderedWidth, setRenderedWidth] = useState<number>()

  function measure() {
    const image = ref.current
    if (!image) return
    setSelected(filename(image.currentSrc || image.src))
    setRenderedWidth(Math.round(image.getBoundingClientRect().width))
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [src, srcSet])

  return (
    <figure className="min-w-0">
      <div className={cn('bg-muted overflow-hidden border shadow-sm', frameClassName)}>
        <img
          ref={ref}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          alt={label}
          onLoad={measure}
          className={cn('size-full', imageClassName ?? 'object-cover')}
        />
      </div>
      <figcaption className="mt-2 space-y-0.5 text-xs">
        <p className="font-semibold">{label}</p>
        <p className="text-muted-foreground break-all">
          {selected} · {formatBytes(BYTES[selected])}
        </p>
        <p className="text-muted-foreground">
          {renderedWidth ?? '—'} CSS px · {loading}
          {fetchPriority === 'high' ? ' · high priority' : ''}
        </p>
      </figcaption>
    </figure>
  )
}

function ContractSummary({ contract }: { contract: Contract }) {
  const isRecommended = contract.key === 'B'
  return (
    <section className={cn('rounded-2xl border p-5', contract.tone)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Contract {contract.key}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">{contract.name}</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">{contract.verdict}</p>
        </div>
        {isRecommended ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
            <Check className="size-3.5" aria-hidden /> Recommended
          </span>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
          <dt className="text-muted-foreground text-xs font-semibold uppercase">Content JPEG</dt>
          <dd className="mt-1 font-medium">
            Progressive q{contract.quality} · {contract.sampling}
          </dd>
        </div>
        <div className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
          <dt className="text-muted-foreground text-xs font-semibold uppercase">Social card</dt>
          <dd className="mt-1 font-medium">1200×630 progressive q{contract.socialQuality}</dd>
        </div>
        <div className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
          <dt className="text-muted-foreground text-xs font-semibold uppercase">Loading</dt>
          <dd className="mt-1 font-medium">{contract.loading}</dd>
        </div>
        <div className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
          <dt className="text-muted-foreground text-xs font-semibold uppercase">App chrome</dt>
          <dd className="mt-1 font-medium">{contract.appChrome}</dd>
        </div>
      </dl>
    </section>
  )
}

function RoleMatrix({ contract }: { contract: Contract }) {
  const widths = WIDTHS[contract.key]
  const quality = contract.quality
  const isFidelity = contract.key === 'A'
  const portraitWidths = widths.filter((width) => width >= 384)
  const cardWidths = widths.filter((width) => width >= 96 && width <= 384)
  const tinyWidths = widths.filter((width) => width <= 64)
  const heroWidths = widths.filter((width) => width >= 768)
  const eagerBelowFold = isFidelity ? 'eager' : 'lazy'

  return (
    <section className="space-y-8" aria-labelledby="role-matrix-heading">
      <div>
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Browser-selected candidates
        </p>
        <h2 id="role-matrix-heading" className="mt-1 text-2xl font-bold tracking-tight">
          Every slot declares its real size
        </h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          The caption reports the file this browser actually selected. Resize the preview to watch
          `srcset` choose a different candidate; originals are never offered as fallback candidates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProbeImage
          label="Tiny navigation portrait · 20 px"
          src={candidatePath('cassian', 64, quality)}
          srcSet={candidateSet('cassian', tinyWidths, quality)}
          sizes="20px"
          width={64}
          height={64}
          loading="eager"
          frameClassName="size-5 rounded-full"
        />
        <ProbeImage
          label="Reference card · 96 px"
          src={candidatePath('cassian', cardWidths[0] ?? 192, quality)}
          srcSet={candidateSet('cassian', cardWidths, quality)}
          sizes="96px"
          width={192}
          height={192}
          loading={eagerBelowFold}
          frameClassName="size-24 rounded-xl"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProbeImage
          label="Mobile portrait · 280 px"
          src={candidatePath('cassian', portraitWidths[0] ?? 384, quality)}
          srcSet={candidateSet('cassian', portraitWidths, quality)}
          sizes="280px"
          width={768}
          height={768}
          loading="eager"
          fetchPriority={isFidelity ? undefined : 'high'}
          frameClassName="aspect-square w-[280px] max-w-full rounded-2xl"
        />
        <ProbeImage
          label="Desktop portrait · 384 px"
          src={candidatePath('cassian', portraitWidths[0] ?? 384, quality)}
          srcSet={candidateSet('cassian', portraitWidths, quality)}
          sizes="384px"
          width={768}
          height={768}
          loading="eager"
          fetchPriority={isFidelity ? undefined : 'high'}
          frameClassName="aspect-square w-96 max-w-full rounded-2xl"
        />
      </div>

      <div className="grid gap-8">
        <ProbeImage
          label="Hero / location illustration · max 960 px"
          src={candidatePath('cassian', heroWidths[0] ?? 768, quality)}
          srcSet={candidateSet('cassian', heroWidths, quality)}
          sizes="(max-width: 1024px) calc(100vw - 32px), 960px"
          width={1254}
          height={1254}
          loading="eager"
          fetchPriority={isFidelity ? undefined : 'high'}
          frameClassName="aspect-[16/7] w-full rounded-2xl"
          imageClassName="object-cover object-top"
        />
        <ProbeImage
          label="Hard-edge map gate · max 1200 px"
          src={candidatePath('map', 600, quality)}
          srcSet={candidateSet('map', [600, 1200], quality)}
          sizes="(max-width: 1280px) calc(100vw - 32px), 1200px"
          width={1200}
          height={700}
          loading={eagerBelowFold}
          frameClassName="aspect-[12/7] w-full rounded-2xl"
          imageClassName="object-contain"
        />
      </div>
    </section>
  )
}

function SocialAndViewer({ contract }: { contract: Contract }) {
  const quality = contract.quality
  const socialQuality = contract.socialQuality
  return (
    <section className="grid gap-8 xl:grid-cols-2">
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Interaction delivery
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Viewer candidate</h2>
          <p className="text-muted-foreground mt-2">
            {contract.viewer} The trigger keeps its smaller candidate while the full-screen viewer
            receives the 1254 px derivative.
          </p>
        </div>
        <ProbeImage
          label="Full-screen viewer · capped at source width"
          src={candidatePath('cassian', 768, quality)}
          srcSet={candidateSet('cassian', [768, 1254], quality)}
          sizes="100vw"
          width={1254}
          height={1254}
          loading={contract.key === 'A' ? 'eager' : 'lazy'}
          frameClassName="aspect-video w-full rounded-2xl bg-slate-950"
          imageClassName="object-contain"
        />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Deployment-only output
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">Social preview</h2>
          <p className="text-muted-foreground mt-2">
            Fixed 1200×630 output, generated only on Netlify deployments. It is not part of normal
            page delivery and has no responsive `srcset`.
          </p>
        </div>
        <ProbeImage
          label={`Social card · progressive q${socialQuality}`}
          src={candidatePath('social-cassian', 1200, socialQuality)}
          width={1200}
          height={630}
          loading="lazy"
          frameClassName="aspect-[1200/630] w-full rounded-2xl"
        />
      </div>
    </section>
  )
}

function ExceptionDocket({ contract }: { contract: Contract }) {
  return (
    <section className="space-y-5" aria-labelledby="exception-heading">
      <div>
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Proven exceptions and gates
        </p>
        <h2 id="exception-heading" className="mt-1 text-2xl font-bold tracking-tight">
          “Progressive JPEG for everything” boundaries
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <article className="border-border rounded-2xl border p-5">
          <div className="flex items-center gap-3">
            <Check className="size-5 text-emerald-600" aria-hidden />
            <h3 className="font-semibold">Content alpha: safely removed</h3>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <img
              src={`${ASSET_ROOT}/jim-kenku-w384-q80.jpg`}
              width="96"
              height="96"
              loading="lazy"
              alt="Jim in his former kenku disguise, converted to opaque JPEG"
              className="size-24 rounded-xl object-cover"
            />
            <p className="text-muted-foreground text-sm">
              `jim-kenku.jpg` was encoded as RGBA PNG despite its extension, but every pixel is
              opaque. The q80 progressive conversion is safe.
            </p>
          </div>
        </article>

        <article className="border-border rounded-2xl border p-5">
          <div className="flex items-center gap-3">
            <CircleAlert className="size-5 text-amber-600" aria-hidden />
            <h3 className="font-semibold">App icons require a format exception</h3>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs">
            <div className="rounded-xl bg-[linear-gradient(45deg,#ddd_25%,transparent_25%),linear-gradient(-45deg,#ddd_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ddd_75%),linear-gradient(-45deg,transparent_75%,#ddd_75%)] bg-[length:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0px] p-3">
              <img src="/logo512.png" width="96" height="96" alt="Current transparent app icon" />
              <p className="mt-2 bg-white/90 text-slate-900">Current alpha</p>
            </div>
            <div className="rounded-xl bg-[#07111f] p-3 text-white">
              <img
                src={`${ASSET_ROOT}/logo512-opaque.png`}
                width="96"
                height="96"
                alt="App icon flattened onto brand navy"
              />
              <p className="mt-2">Opaque navy</p>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">{contract.appChrome}</p>
        </article>

        <article className="border-border rounded-2xl border p-5">
          <div className="flex items-center gap-3">
            <Gauge className="size-5 text-sky-600" aria-hidden />
            <h3 className="font-semibold">Real maps keep a visual gate</h3>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Current hierarchy maps are vector/CSS schematics and deliver no map raster. The
            hard-edge sample above tests the likely failure mode, but the first real illustrated map
            must compare progressive q80 with q85 4:4:4 and a lossless candidate before any
            exception is granted.
          </p>
        </article>
      </div>
    </section>
  )
}

function AcceptanceContract() {
  const rules = [
    'Canonical originals live outside the published directory.',
    'Generated filenames are content-addressed and immutable-cached.',
    'The smallest derivative is `src`; originals never appear as fallback.',
    'Every `img` has width, height, role-specific `srcset`, and truthful `sizes`.',
    'Above-fold or measured LCP media is eager; below-fold media uses native lazy loading.',
    'Only the measured likely LCP receives `fetchpriority="high"`.',
    'Social JPEGs are fixed 1200×630 q85 and generated only during deployments.',
    'CI rejects public originals, non-progressive content JPEGs, missing dimensions, and oversized slot candidates.',
  ]
  return (
    <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
        Recommended acceptance contract
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">Rules implementation must enforce</h2>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {rules.map((rule) => (
          <li key={rule} className="flex gap-3 text-sm text-slate-200">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
            {rule}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ResponsiveImagesPrototype({
  variant,
  onVariantChange,
}: {
  variant: ResponsiveImagePrototypeVariant
  onVariantChange: (variant: ResponsiveImagePrototypeVariant) => void
}) {
  const contract = CONTRACTS[variant]
  return (
    <div className="mx-auto max-w-6xl space-y-12 pb-28">
      <header className="space-y-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-wider uppercase">
          <span className="rounded-full bg-slate-950 px-3 py-1.5 text-white">
            Throwaway prototype
          </span>
          <span className="border-border rounded-full border px-3 py-1.5">Responsive images</span>
        </div>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
              Match delivered pixels to the slot that uses them.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-lg">
              Three production-shaped delivery contracts across tiny navigation portraits, cards,
              mobile and desktop portraits, heroes, maps, viewers, and social previews.
            </p>
          </div>
          <div className="border-border flex gap-4 rounded-2xl border p-4 text-sm">
            <span className="flex items-center gap-2">
              <RectangleVertical className="size-4" aria-hidden /> 390 px
            </span>
            <span className="flex items-center gap-2">
              <Monitor className="size-4" aria-hidden /> 1440 px
            </span>
          </div>
        </div>
      </header>

      <ContractSummary contract={contract} />
      <RoleMatrix contract={contract} />
      <SocialAndViewer contract={contract} />
      <ExceptionDocket contract={contract} />
      {variant === 'B' ? <AcceptanceContract /> : null}

      <PrototypeSwitcher variant={variant} onVariantChange={onVariantChange} />
    </div>
  )
}
