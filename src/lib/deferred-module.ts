import { lazy, type ComponentType } from 'react'

/**
 * A module the first render can do without: it loads once, on request, and is read synchronously
 * after that. The server loads such modules before it renders, so its HTML is complete; the
 * browser fetches them after the page's own JavaScript, so they never hold up hydration.
 */
export function deferredModule<M>(load: () => Promise<M>) {
  let module: M | undefined
  let loading: Promise<M> | undefined
  return {
    load: () => (loading ??= load().then((loaded) => (module = loaded))),
    get: () => module,
  }
}

export type DeferredModule<M> = ReturnType<typeof deferredModule<M>>

/** Load a deferred module in the browser once the page has finished loading. */
export function loadAfterPageLoad(load: () => Promise<unknown>) {
  if (typeof window === 'undefined') return
  if (document.readyState === 'complete') void load()
  else window.addEventListener('load', () => void load(), { once: true })
}

/**
 * A component from a deferred module, for React to render through `lazy` inside `Suspense`. Once
 * the module has loaded, the thenable resolves synchronously, so a render after its `load` never
 * suspends and the server's HTML has no fallbacks in it. While the browser hydrates, React keeps
 * the server's HTML for a component whose module has not arrived yet.
 */
export function lazyFrom<M, P extends object>(
  deferred: DeferredModule<M>,
  pick: (loaded: M) => ComponentType<P>,
) {
  return lazy<ComponentType<P>>(() => {
    const loaded = deferred.get()
    const module = (from: M) => ({ default: pick(from) })
    if (!loaded) return deferred.load().then(module)
    const ready: PromiseLike<{ default: ComponentType<P> }> = {
      // oxlint-disable-next-line unicorn/no-thenable -- React reads a thenable that resolves at once synchronously
      then: (resolve) => resolve?.(module(loaded)) as never,
    }
    return ready as Promise<{ default: ComponentType<P> }>
  })
}
