import { readFile, writeFile } from 'node:fs/promises'

const handler = new URL('../.netlify/v1/functions/server.mjs', import.meta.url)
const source = await readFile(handler, 'utf8')
const catchAll = 'path: "/*",'
if (source.split(catchAll).length !== 2) {
  throw new Error('Expected one Netlify SSR catch-all route in the generated handler')
}

const exclusion = 'excludedPath: "/api/corrections/submit",'
if (source.includes('excludedPath:')) {
  if (source.split('excludedPath:').length !== 2 || !source.includes(exclusion)) {
    throw new Error(
      'Unexpected exclusions in the Netlify SSR handler; review routing before deploy',
    )
  }
} else {
  // The adapter's catch-all otherwise intercepts the separate correction function.
  await writeFile(handler, source.replace(catchAll, `${catchAll}\n  ${exclusion}`))
}
