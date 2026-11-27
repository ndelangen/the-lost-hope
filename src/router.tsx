import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { libraryIndexTypesOf, type LibraryIndexLoad } from '#/lib/published-library-routing'

import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // A page that browses the library renders from the index types its loaders loaded; the
    // browser loads the same ones before it hydrates.
    dehydrate: (): LibraryIndexLoad => ({
      libraryIndex: libraryIndexTypesOf(router.state.matches),
    }),
    hydrate: async ({ libraryIndex }: LibraryIndexLoad) => {
      if (!libraryIndex.length) return
      const { loadLibraryIndex } = await import('#/lib/published-library-data')
      await loadLibraryIndex(libraryIndex)
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
