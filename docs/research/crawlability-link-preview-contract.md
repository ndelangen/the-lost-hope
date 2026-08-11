# Crawlability and link-preview technical contract

Research date: 2026-08-11  
Wayfinder ticket: [Define the crawlability and link-preview technical contract](https://github.com/ndelangen/the-lost-hope/issues/62)

## Decision

The implementation must publish content-complete HTML for every canonical public route to every
client, not only to recognized crawler user agents. JavaScript may hydrate that HTML, but it must not
be required to discover the route, identify the page, read its primary campaign content, follow its
ordinary navigation and entity-reference links, or extract its metadata.

Each public route must also have one canonical production URL, page-specific metadata in the
initial `<head>`, honest Schema.org JSON-LD, and a build-generated 1200 by 630 pixel social image
derived from canonical campaign data. The sitemap, internal links, canonical tag, Open Graph URL,
and structured-data URL must all name the same canonical URL.

This is deliberately stronger than Google's minimum. Google can render JavaScript, but rendering is
a separate queued phase and Google notes that not all bots can run JavaScript. Netlify likewise says
that many AI agents, chat services, and preview crawlers cannot run JavaScript. Pre-rendering or
server-side rendering removes that dependency for both crawlers and people browsing without
JavaScript. [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
and [Netlify prerendering](https://docs.netlify.com/build/post-processing/prerendering/)

No implementation can guarantee that an independent crawler will index a page or that every chat
application will show an identical card. Search engines treat sitemaps and canonical hints as signals,
platforms cache previews, and users or workspace administrators can disable previews. Completion
therefore means satisfying the observable publishing contract and passing the validation gates below,
not guaranteeing third-party ranking or presentation.

## Normative contract

The words **must**, **should**, and **may** below define acceptance requirements.

### 1. HTTP and initial HTML

For every canonical player-facing route:

- An ordinary `GET` with `Accept: text/html` **must** return `200` and `Content-Type: text/html`
  from the canonical URL. It **must not** need a client-side redirect or an SPA fallback to find the
  route's content.
- The response body, before any script runs, **must** contain the route's visible page identity and
  primary readable content. At minimum it contains the page's main title, its relevant canonical
  facts or collection entries, and the contextual labels needed to understand those facts. A loading
  shell, empty root element, or metadata-only document does not pass.
- The response **must** remain useful with JavaScript disabled. Interactive behavior may be absent,
  but ordinary navigation, entity references, and a readable alternative for an interactive primary
  view **must** remain available.
- Public internal destinations **must** be linked through `<a href="...">` elements with
  descriptive link text in the initial HTML. Every canonical public route **must** have at least one
  incoming link from another public page. Google says it generally crawls anchors with `href`, and
  recommends linking every important page from at least one other page.
  [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- Hydration **must not** replace the page with contradictory content, change its canonical URL, or
  produce a hydration error. It may add navigation and interaction mechanics.
- A nonexistent route **must** return a genuine `404`; a removed route **must** return `404` or
  `410`, unless it has a real replacement reached through a permanent redirect. A generic app shell
  with `200` for an unknown path is a soft-404 failure. Google uses status codes to decide whether
  content should be processed and explicitly calls out SPA soft 404s.
  [Google HTTP status guidance](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)
  and [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- The same substantive HTML and metadata **must** be returned to ordinary clients and crawler user
  agents. The implementation must not rely on crawler detection for correctness.

The HTML **should** use meaningful document landmarks and content elements such as `main`, `nav`,
`article`, headings, lists, definition lists, `time`, and real image alternatives where they match the
content. Semantic HTML helps non-search consumers and assistive technology even though it is not an
indexing guarantee. [Google guidance for AI search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

### 2. Required per-page `<head>` metadata

Every canonical public page **must** emit the following values in the original HTML response, with
no dependence on hydration:

```html
<title>{concise route-specific title} | The Lost Hope</title>
<meta name="description" content="{route-specific description derived from canonical data}" />
<link rel="canonical" href="{absolute canonical production URL}" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="The Lost Hope" />
<meta property="og:title" content="{route-specific preview title}" />
<meta property="og:description" content="{route-specific preview description}" />
<meta property="og:url" content="{same absolute canonical URL}" />
<meta property="og:image" content="{absolute HTTPS image URL}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{accurate description of the card}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{same page identity}" />
<meta name="twitter:description" content="{same factual summary}" />
<meta name="twitter:image" content="{same absolute HTTPS image URL}" />
<meta name="twitter:image:alt" content="{same accurate image description}" />
```

If the generated image is JPEG, both `og:image:type` and the response `Content-Type` **must** instead
be `image/jpeg`. The title, description, canonical URL, and image URL must be HTML-escaped correctly.

The metadata builders **must** derive their factual content from the canonical route/entity data.
They **must not** create a parallel social-summary fact store. Titles and descriptions **must** be
accurate, human-readable, and distinct enough to identify their page. There is no standards-backed
fixed character limit: consumers truncate to fit their UI. Google recommends concise, descriptive,
distinct titles and unique page-specific descriptions, and explicitly supports programmatically
generated descriptions based on page data.
[Google title guidance](https://developers.google.com/search/docs/appearance/title-link) and
[Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet)

The four core Open Graph properties are `og:title`, `og:type`, `og:image`, and `og:url`; the protocol
also defines the image type, dimensions, and alt-text fields used above. This contract additionally
requires `og:description` because pasted-link previews must show relevant route data, and LinkedIn
requires title, image, description, and URL for its sharing module.
[Open Graph Protocol](https://ogp.me/) and
[LinkedIn sharing requirements](https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin?lang=en)

The explicit `twitter:*` fields are a compatibility profile and **must** be retained even when a
consumer falls back to Open Graph. X's former first-party Cards documentation URLs now redirect to
the general X API documentation, so current first-party documentation does not provide a testable
card-delivery guarantee. X compatibility must consequently be confirmed by a production paste test,
not claimed from a validator alone.

### 3. Canonical URLs

- There **must** be exactly one canonical production origin and one canonical path spelling for each
  page. The deliberate existing `/detail/` segments remain part of those paths.
- Every public page **must** include one self-referential `rel="canonical"` element in its initial
  valid `<head>`. It **must** be an absolute HTTPS URL.
- The page's canonical link, `og:url`, JSON-LD `url`/`@id`, sitemap `<loc>`, and internal links
  **must not** disagree on host, path, slash form, encoding, or case.
- Query parameters used only for UI state **should** canonicalize to the route's path-only URL and
  **must not** create duplicate sitemap entries. A query may be independently canonical only if the
  route contract deliberately declares it a distinct indexable page with distinct primary content.
- Alternate hosts, HTTP, and noncanonical path spellings **should** permanently redirect to the
  canonical URL. The canonical URL itself must meet the direct-`200` rule.

Google recommends a self-referential canonical, absolute URLs in the HTML source, links to the
canonical form, and agreement between canonical methods.
[Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

### 4. Discovery, indexing, and exclusions

The production deployment **must** expose a UTF-8 `/robots.txt` with `200`. It **must** allow every
public page and every resource required to understand or preview those pages, and **must** contain an
absolute `Sitemap:` line for the production sitemap. A minimal acceptable public policy is:

```text
User-agent: *
Disallow:

Sitemap: https://{production-origin}/sitemap.xml
```

`robots.txt` is a crawl-control protocol, not an access-control or reliable de-indexing mechanism.
The standard is [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309), and Google's implementation
requires the file at the host root and documents UTF-8, response-code, and sitemap behavior.
[Google robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)

The production deployment **must** expose a valid UTF-8 XML sitemap at `/sitemap.xml`:

- Its URL set **must equal** the canonical public-route manifest: no omissions, duplicates,
  redirects, errors, query variants, internal tools, preview hosts, or noncanonical hosts.
- Every `<loc>` **must** be fully qualified and absolute.
- `<lastmod>` **may** be emitted only when it is derived from a real significant content change; it
  **must not** be reset mechanically on every build.
- `/robots.txt` **must** point to it. After release it **should** be submitted to Google Search
  Console and Bing Webmaster Tools.

Google says sitemaps should contain canonical absolute URLs and that accurate `lastmod` values must
represent significant changes. Bing likewise recommends canonical-only, current sitemaps and calls
out sitemaps and crawlable internal links for Bing and Copilot discovery.
[Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
and [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)

Internal tooling that remains publicly reachable **must** be absent from the sitemap and public
navigation and return an initial `<meta name="robots" content="noindex">` or equivalent
`X-Robots-Tag: noindex`. It should not also be blocked in `robots.txt`, because crawlers must fetch
the page to see `noindex`. Future private-character or DM-only data **must** use real access control;
neither robots rules nor `noindex` makes content private.
[Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

### 5. Structured data

Every canonical public route **must** include syntactically valid Schema.org JSON-LD in the initial
HTML. It must describe only content that is visible on that page and must use the most specific
truthful type available; unsupported campaign concepts must fall back to `Thing` rather than being
mislabelled as a commercial product, real-world event, or another rich-result type.

The minimum graph contract is:

- The home page defines one `WebSite` node with stable `@id`, canonical root `url`, and
  `name: "The Lost Hope"`, plus its page node.
- Every page defines a `WebPage` node or an honest subtype such as `CollectionPage`, with stable
  `@id`, canonical `url`, route-specific `name` and `description`, and `isPartOf` pointing to the
  `WebSite` node.
- A detail page links its page node to one `mainEntity` node when a truthful Schema.org mapping is
  available. A collection page may use `ItemList` for the canonical entries visible on the page.
- A `BreadcrumbList` may be added only when it represents the actual user-facing hierarchy and the
  page provides corresponding navigation.
- Structured-data image and URL fields are absolute, crawlable HTTPS URLs and agree with the page's
  canonical metadata.

The later per-route contract must choose the exact honest `mainEntity` type and property set for
each campaign kind. This research decision forbids inventing a custom or misleading mapping merely
to obtain a rich result. Correct Schema.org does not guarantee a Google rich result.

Google recommends JSON-LD, requires structured data to represent visible page content, and warns
that valid markup does not guarantee a rich result. Google also specifies home-page `WebSite` data
for the site name and supports `BreadcrumbList` when it represents a typical user path.
[Google structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies),
[Google site-name data](https://developers.google.com/search/docs/appearance/site-names), and
[Google breadcrumb data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

### 6. Social-preview images

Every canonical public route **must** have a generated, route-specific preview image which:

- is exactly 1200 by 630 pixels (a 1.91:1 landscape card within rounding);
- is a static PNG or JPEG under 5 MB, with an operational target under 1 MB;
- is available without cookies, authentication, JavaScript, referer checks, or crawler-specific
  access at an absolute HTTPS URL;
- returns `200`, the matching image `Content-Type`, and the declared dimensions;
- remains legible when reduced and when edges are cropped, and does not rely on transparency for its
  intended background;
- includes a page-specific visual identity derived from canonical data, not only the generic site
  title; and
- has accurate `og:image:alt` and `twitter:image:alt` text.

LinkedIn's sharing specification requires Open Graph metadata, a maximum image size of 5 MB, at
least 1200 by 627 pixels, and a recommended 1.91:1 ratio. A 1200 by 630 PNG or JPEG satisfies those
constraints and is the cross-platform build profile selected here.
[LinkedIn sharing requirements](https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin?lang=en)

Generated image filenames **should** include a content hash. Preview services cache metadata and
images; changing the URL when the bytes change avoids depending on cache-expiry timing. LinkedIn
documents stale-preview caching, a possible 48-hour refresh delay, and its Post Inspector refresh
workflow.
[LinkedIn URL troubleshooting](https://www.linkedin.com/help/linkedin/answer/a525063/issues-sharing-urls-troubleshooting?lang=en)

## Netlify delivery consequences

The contract does not force a rendering library, but it does constrain the viable Netlify shape:

1. **Build-produced route files satisfy the contract.** Netlify matches a request such as `/about`
   to static `about.html` or `about/index.html`. Existing static files shadow a non-forced wildcard
   rewrite, so generated route HTML can be served ahead of the existing SPA rewrite.
   [Netlify request chain](https://docs.netlify.com/resources/troubleshooting/request-chain/) and
   [Netlify rewrite shadowing](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/)
2. **The current catch-all cannot remain the final unknown-route behavior.** Netlify documents that
   `/* /index.html 200` serves `index.html` instead of a `404` for every unmatched URL. The
   implementation must remove or narrow that fallback, or otherwise ensure unmatched routes reach a
   real `404.html` response.
3. **Netlify's crawler prerender extension is not sufficient on its own.** It intentionally serves
   rendered HTML only to relevant user agents while normal visitors keep receiving the JavaScript
   application. It may be useful as a diagnostic or transitional aid, but it does not satisfy this
   effort's all-client initial-HTML and no-JavaScript contract. The legacy built-in prerendering
   feature is deprecated and must not be adopted.
4. **Canonical slash behavior must be tested at the edge.** Netlify's Pretty URLs feature may
   normalize paths. The chosen artifact layout and site setting must preserve the deliberate route
   path while ensuring that the canonical spelling itself returns the required direct `200`.
   [Netlify redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/)
5. **Previews must remain non-indexable.** Netlify automatically adds `X-Robots-Tag: noindex` to
   Deploy Previews, unpublished production deploys, and old branch deploys. The deployment gate must
   verify that header. Any current branch deploy used for testing must also be protected or explicitly
   given `noindex`, because Netlify may allow the most recent branch deploy to be indexed.
   [Netlify deploy overview](https://docs.netlify.com/deploy/deploy-overview/)

## Validation gates

### Build-time, exhaustive

The build must fail unless all of these checks pass against the canonical public-route manifest:

1. There is exactly one emitted HTML artifact per public canonical route, and no internal-tool route
   appears in the sitemap.
2. Parsing each artifact without executing scripts finds its route-specific main title, required
   primary-content sentinel(s), and crawlable internal links. The test must strip script, style, and
   JSON-LD text before checking visible body text so metadata cannot fake content completeness.
3. Each artifact has one distinct `<title>`, one meta description, one absolute self-canonical,
   the complete Open Graph contract, the Twitter compatibility contract, and valid JSON-LD.
4. Canonical, Open Graph, structured-data, sitemap, and internal-link URLs agree exactly.
5. The sitemap URL set equals the public manifest and every public route has an incoming crawlable
   link.
6. Every declared preview image exists, is unique to its route's derived preview model, is 1200 by
   630, is PNG or JPEG, and is under 5 MB.
7. `robots.txt` parses, allows the public route and asset sets, and names the correct absolute
   sitemap URL.
8. Representative artifacts from every page kind pass an HTML parser, all JSON-LD passes the
   Schema.org validator rules encoded by the project, and generated XML parses successfully.

The public-route and preview-model builders must be exhaustive over the project's route and entity
kinds so adding a kind cannot silently inherit a generic shell.

### Deploy Preview, before merge

Against the actual Netlify Deploy Preview:

1. Fetch every manifest route with a normal HTTP client and representative crawler user agents.
   Assert successful HTML, route-specific body content, metadata completeness, and substantive
   parity across user agents.
2. Fetch `/robots.txt`, `/sitemap.xml`, every preview image, and a definitely nonexistent path.
   Assert correct status and `Content-Type`; the nonexistent path must be `404`.
3. Confirm the Deploy Preview responses carry `X-Robots-Tag: noindex`.
4. Run a JavaScript-disabled browser smoke on at least one route of every page kind, including an
   entity with sparse data and a collection with many entries. Navigation and entity references
   must work as normal links.
5. Re-enable JavaScript and smoke the same pages. Hydration must preserve the content and metadata,
   and the console must contain no hydration or route errors.
6. Validate every structured-data template with
   [Schema.org's validator](https://validator.schema.org/), and additionally use Google's
   [Rich Results Test](https://search.google.com/test/rich-results) for any type intended to qualify
   for a Google rich result.

### Production, after deployment

Repeat the exhaustive HTTP checks against the canonical production origin, then:

1. Verify HTTP-to-HTTPS and alternate-host redirects, and verify that every canonical URL itself is
   the direct `200` endpoint.
2. Submit or refresh the sitemap in Google Search Console and Bing Webmaster Tools. Inspect the home
   page, one collection page, and representative detail pages with their URL inspection tools after
   crawlers have had time to process the release.
3. Run LinkedIn Post Inspector for one representative route of every preview template and for sparse,
   long-title, and image-heavy edge cases. Then paste representative production URLs into LinkedIn
   and at least one chat client used by the campaign (for example Slack) and confirm the title,
   description, and image. Slack notes that links without embedded preview data do not expand, and
   workspace settings or recent duplicate posts can suppress an otherwise valid preview.
   [Slack link-preview behavior](https://slack.com/help/articles/204399343-Share-links-and-set-preview-preferences)
4. Record evidence for raw no-JavaScript HTML, status codes, sitemap membership, structured-data
   validation, preview images, and pasted-link results before closing implementation.

Third-party caches mean a changed preview may not refresh immediately. A cached old card is not
evidence that the new production HTML is wrong if the live fetch and inspector show the new
content; use the platform refresh tool or a content-hashed image URL and record the distinction.

## Short acceptance checklist

A public route is complete only when all answers are **yes**:

- Does its canonical URL return route-specific `200 text/html` without JavaScript or a redirect?
- Can a parser read the main title, primary facts, and real links from the response body?
- Does an unknown sibling URL return `404`?
- Are title, description, canonical, Open Graph, Twitter compatibility tags, and JSON-LD present in
  the initial head and derived from canonical data?
- Do canonical signals and the sitemap use exactly the same URL?
- Is the page linked from another public page and present exactly once in the sitemap?
- Is its 1200 by 630 PNG/JPEG preview public, under 5 MB, route-specific, and correctly described?
- Does JavaScript-disabled navigation work, and does hydration complete without console errors?
- Do ordinary and crawler user agents receive substantively equivalent content?
- Has the production URL passed raw-fetch, structured-data, and representative pasted-link smoke
  tests?
