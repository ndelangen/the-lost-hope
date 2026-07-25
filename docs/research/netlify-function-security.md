# Netlify Function security and runtime contract

Research date: 2026-07-25

## Decision

Implement the correction relay as one modern TypeScript Netlify Function with a custom same-origin
path, for example `POST /api/questions/submit`. The function should:

1. reject requests that are not same-origin browser JSON submissions;
2. enforce a small request schema and application-level size limits;
3. hash the submitted shared code and compare the digest in constant time;
4. obtain a short-lived GitHub App installation token server-side;
5. construct and create exactly one GitHub issue; and
6. return a small JSON result without exposing credentials or upstream error bodies.

Add Netlify's code-based per-IP rate limit with a starting policy of 10 requests per 60 seconds.
This protection adds no user-facing challenge and is available on all plans. It is a backstop, not
the authentication mechanism.

The shared-code gate is deliberately casual access control. The GitHub App private key is the real
privileged credential and must remain server-only.

## Threat boundary

The deployed browser bundle is public. The hash used by the `/questions` screen to unlock locally is
therefore public too, even if it is obfuscated. A short or common password can be guessed offline
against that hash without touching the Netlify endpoint. Use a randomly generated shared code (at
least 128 random bits, such as 22 base64url characters), which players can paste once and retain in
local storage.

The browser must submit the original shared code over the site's HTTPS connection. The function
must hash that value itself. **Do not accept the public client-side digest as a bearer credential**:
anyone who downloads the bundle could replay it without knowing the code.

Local storage is an accepted convenience for this casual gate, not a secure credential store.
Same-origin script execution, a compromised browser profile, or someone with access to the device
can read it. The questions Markdown is likewise recoverable from the deployed bundle. None of these
facts expose the GitHub App key, which stays in the function environment.

## Netlify runtime contract

Use the modern Netlify Functions interface: a default async handler receives the web-standard
`Request` plus Netlify `Context` and returns a web-standard `Response`. This avoids the legacy Lambda
compatibility layer and provides `context.requestId` for safe request correlation. Netlify documents
this handler shape and the request ID in its
[Functions API reference](https://docs.netlify.com/build/functions/api/).

Export function configuration with:

```ts
export const config = {
  path: '/api/questions/submit',
  method: 'POST',
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}
```

A custom path makes the function available only at that path, rather than also exposing the default
`/.netlify/functions/<name>` route, according to Netlify's
[function routing documentation](https://docs.netlify.com/build/functions/configuration/#routing).
Netlify requires function rate limits to be declared in the exported function `config`, not in
`netlify.toml`; per-domain-and-IP aggregation limits each visitor and is available on all plans.
Requests above the threshold receive `429`.
[Netlify rate-limiting documentation](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/)
also warns that an invalid code-based rule does not fail a deploy, so the production deploy log must
be checked for the validated rule.

Netlify's platform ceiling for a buffered synchronous request or response is 6 MB and its execution
ceiling is 60 seconds, but those are infrastructure maximums, not suitable application limits.
[Netlify function configuration defaults](https://docs.netlify.com/build/functions/configuration/#default-values)
document both limits. This endpoint should enforce a 64 KiB raw JSON body limit and finish one
GitHub request synchronously. There is no need for a background function or `context.waitUntil()`;
the caller needs to know whether GitHub accepted the issue.

## Request contract

Accept only `POST` with `Content-Type: application/json`. The JSON object must contain exactly:

```ts
{
  accessCode: string
  itemNumber: number
  questionBlock: string
  answer: string
}
```

Validate before requesting a GitHub token:

- reject a declared `Content-Length` above 65,536 bytes before reading;
- also measure the UTF-8 byte length after reading, because `Content-Length` may be absent;
- reject malformed JSON, arrays, `null`, and unknown properties;
- require `accessCode` to be non-empty and at most 256 UTF-8 bytes;
- require `itemNumber` to be a positive safe integer no greater than 10,000;
- require `questionBlock` to contain 1–32,768 characters;
- trim `answer`, then require 1–10,000 characters; and
- construct the GitHub title and body server-side. Never accept a title, repository, owner, labels,
  assignees, or GitHub URL from the request.

These limits leave ample room for the current questions while keeping memory, logs, and GitHub
content bounded far below Netlify's 6 MB platform limit.

Use the agreed issue representation:

```md
Title: Submitted correction for item-N

> Complete question block, with every source line prefixed by `> `

Submitted answer:

The user's answer
```

Neutralize `@` in the submitted answer (for example, insert a zero-width space after it) so an
anonymous correction cannot notify arbitrary GitHub users or teams. The question snapshot originates
from the deployed app, but the server should still treat every request field as untrusted.

## Shared-code verification

Store the expected SHA-256 digest as `QUESTIONS_ACCESS_CODE_SHA256`. The same digest may be embedded
in the client for its local gate, so the digest itself is not confidential; the unknown high-entropy
preimage is the credential.

Hash the submitted `accessCode` in the function and compare two fixed-length digest byte arrays using
Node's `crypto.timingSafeEqual`. Node documents that this API uses a constant-time comparison and is
suitable for secret values, while warning that surrounding code must not reintroduce timing leaks:
[Node.js `crypto.timingSafeEqual`](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b).
Decode and validate the configured digest at function initialization so a malformed deployment
configuration fails closed.

Use one generic `401` response for a missing or incorrect code. Do not reveal whether the digest is
configured correctly to callers. A missing server configuration should be logged as a configuration
error and returned as generic `503`.

## Same-origin handling

Make the browser call the relative `/api/questions/submit` path and do not emit any
`Access-Control-Allow-Origin` header. Requiring `application/json` means a normal cross-origin browser
request cannot use the CORS "simple request" path: the Fetch Standard's
[CORS-safelisted request-header algorithm](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)
only permits `application/x-www-form-urlencoded`, `multipart/form-data`, and `text/plain` content
types on that path.

As defense in depth:

- if `Origin` is present, require it to equal `new URL(request.url).origin`;
- if `Sec-Fetch-Site` is present, require `same-origin`;
- reject other values with `403`; and
- allow these headers to be absent so local tests and non-browser diagnostics remain possible.

The Fetch Metadata specification defines `Sec-Fetch-Site: same-origin` and gives servers this
metadata specifically to reject inappropriate cross-site requests:
[W3C Fetch Metadata Request Headers](https://www.w3.org/TR/fetch-metadata/#sec-fetch-site-header).
These header checks are not authentication—non-browser clients can omit or forge ordinary request
headers. Possession of the shared code remains mandatory.

This design does not use cookies or other ambient browser credentials, so it does not introduce a
cookie-based CSRF session. Cross-origin browser code cannot read the code from this origin's local
storage. The remaining material browser risk is same-origin script compromise, which is outside the
casual barrier's promise.

## Secret storage and deployment contexts

Configure values through the Netlify UI, CLI, or API. Do not place them in `netlify.toml`, `.env`
files committed to the repository, or source code. Netlify explicitly states that variables declared
in `netlify.toml` are unavailable to functions and that function runtime variables are read through
`process.env`:
[environment variables and serverless functions](https://docs.netlify.com/build/functions/environment-variables/).

Required runtime variables:

- `QUESTIONS_ACCESS_CODE_SHA256`
- `GITHUB_APP_ID`
- `GITHUB_APP_INSTALLATION_ID`
- `GITHUB_APP_PRIVATE_KEY`
- fixed repository configuration may remain in source as `ndelangen/the-lost-hope`

Mark `GITHUB_APP_PRIVATE_KEY` as containing a secret value. Netlify's Secrets Controller makes marked
values write-only outside the development context and scans builds for accidental exposure:
[Netlify Secrets Controller](https://docs.netlify.com/build/environment-variables/secrets-controller/).
Use Production context for the live GitHub App credentials. Deploy Previews should have no live key
and return `503`, unless a separate test App and repository are deliberately configured.

GitHub calls its private key the App's most valuable credential. GitHub permits an environment
variable when a signing-only vault is unavailable, but notes that environment access then exposes a
persistent App credential:
[GitHub App private-key guidance](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps#storing-private-keys).
Limit the resulting blast radius by making the App private, installing it only on
`ndelangen/the-lost-hope`, granting no organization permissions or webhooks, and granting only
repository **Issues: read and write**. The create-issue endpoint accepts installation access tokens
and requires Issues write:
[GitHub create-an-issue REST API](https://docs.github.com/en/rest/issues/issues#create-an-issue).

## GitHub authentication and call contract

Use GitHub's official Octokit `App` client rather than implementing JWT signing and token refresh
manually:

```ts
const app = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
})

const octokit = await app.getInstallationOctokit(Number(process.env.GITHUB_APP_INSTALLATION_ID))
```

GitHub documents this installation-authentication flow in
[Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation).
Under the hood, the App signs a short-lived JWT, exchanges it for an installation token, and uses
that token for the repository request. Installation tokens expire after one hour:
[Generating an installation access token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app).
Do not create or store a long-lived installation token in Netlify.

Send one `POST /repos/ndelangen/the-lost-hope/issues` request with the current GitHub API version,
`Accept: application/vnd.github+json`, and only `title` and `body`. Do not allow submissions to apply
labels, assign people, choose another repository, or modify existing issues.

Do not automatically retry issue creation. A timeout after GitHub accepted the request is ambiguous,
and an automatic retry could create a duplicate issue. Keep the answer in the browser after a failed
response and let the player deliberately retry. GitHub also recommends serial mutation requests and
respecting `Retry-After`/rate-limit headers:
[GitHub REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api).

## Responses and logging

Return JSON with `Cache-Control: no-store`:

| Status | Meaning                                                                |
| ------ | ---------------------------------------------------------------------- |
| `201`  | GitHub created the issue; return only its issue number and `html_url`. |
| `400`  | Invalid JSON or payload shape/content.                                 |
| `401`  | Shared code missing or incorrect.                                      |
| `403`  | Browser request is observably cross-origin.                            |
| `415`  | Request is not JSON.                                                   |
| `429`  | Netlify's platform rate limit rejected the request.                    |
| `502`  | GitHub rejected or failed the issue request.                           |
| `503`  | Required server configuration is unavailable.                          |

Do not include GitHub response bodies, stack traces, credentials, or configuration details in client
responses.

Log one structured outcome containing `context.requestId`, the validated item number when available,
the result category, and—only after success—the created issue number. Never log the shared code or
its submitted digest, the GitHub private key, App JWT, installation token, full question block, full
answer, request headers, or client IP. Netlify retains invocation logs and includes application
`console.log()` output, so log redaction is an application responsibility:
[Netlify function logs](https://docs.netlify.com/build/functions/logs/).

## Abuse-resistance conclusion

The minimum low-friction stack is:

1. a high-entropy shared code;
2. server-side code verification;
3. same-origin JSON-only browser handling;
4. strict schema and small payload bounds;
5. 10 requests per minute per domain and IP at Netlify's edge;
6. a single-repository, Issues-only GitHub App installation; and
7. bounded, non-sensitive logs with no automatic mutation retry.

This meets the requested "no account and no visible challenge" experience. It does not protect
against a player deliberately sharing the code, malware or same-origin script compromise, or a
determined attacker who recovers a weak code from the public hash. Adding CAPTCHA, real user
authentication, or durable per-submission idempotency would be a later product/security expansion,
not part of this contract.
