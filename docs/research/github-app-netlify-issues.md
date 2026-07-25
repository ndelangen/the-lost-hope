# GitHub App authentication for question corrections

Status: decision-ready  
Research date: 2026-07-25  
Scope: a Netlify Function that creates one issue in `ndelangen/the-lost-hope` for each accepted
question correction.

## Decision

Use a private GitHub App owned by the `ndelangen` personal account, install it with access to only
`ndelangen/the-lost-hope`, and authenticate the Netlify Function as that app installation.

Configure the app as follows:

- **Installability:** only on the owning account.
- **Repository access:** only selected repositories, selecting only `the-lost-hope`.
- **Repository permissions:** `Issues: Read and write`; leave every other selectable repository,
  organization, and account permission at `No access`. GitHub shows repository metadata as
  read-only alongside an installation.
- **Webhooks:** inactive. The function initiates requests and does not consume GitHub events.
- **User authorization / OAuth and device flow:** disabled or unused. A visitor is not acting as a
  GitHub user; the issue is deliberately attributed to the app.

GitHub Apps can act independently of users, and installation-token API requests are attributed to
the app. The create-issue endpoint accepts GitHub App installation access tokens and requires only
the `Issues` repository permission at write level. GitHub recommends minimum permissions and
explicit repository restrictions.

Sources:

- [About using GitHub Apps](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)
- [Authenticating as a GitHub App installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- [Create an issue REST endpoint](https://docs.github.com/en/rest/issues/issues?apiVersion=2026-03-10#create-an-issue)
- [Choosing permissions for a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [Reviewing and modifying installed GitHub Apps](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps#modifying-repository-access)

## Runtime authentication flow

Use GitHub's `octokit` package and keep the `App` instance at module scope:

1. Read the app ID, installation ID, and private key from server-only Netlify environment
   variables.
2. Decode the private key, construct `new App({ appId, privateKey })`, and call
   `app.getInstallationOctokit(installationId)`.
3. Call `POST /repos/{owner}/{repo}/issues` through Octokit with the repository owner and name
   fixed by server code, not supplied by the browser.
4. Treat only GitHub's `201 Created` response as success and return the resulting issue number or
   URL to the caller.

Octokit generates the short-lived app JWT and installation token and regenerates the installation
token after expiry. If implementing the exchange manually, the function would sign an RS256 JWT
whose expiry is no more than ten minutes away, exchange it at
`POST /app/installations/{installation_id}/access_tokens`, then use the returned token for the
issue request. Installation tokens expire after one hour. GitHub recommends caching them until
expiry; a module-scoped Octokit app provides useful reuse in a warm function instance without
adding a durable token store. A cold instance may perform a fresh exchange, which is acceptable
for this low-volume flow.

No GitHub client secret is required: client secrets are for GitHub user access tokens, while the
private key is what an app uses to obtain installation access tokens. Do not add a personal access
token fallback.

Sources:

- [Authenticating as an installation with Octokit](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation#using-the-octokitjs-sdk-to-authenticate-as-an-app-installation)
- [Generating a JSON Web Token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app)
- [Best practices for creating a GitHub App](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app)
- [Octokit App client](https://github.com/octokit/octokit.js#github-app)

## Netlify configuration and secret boundary

Set these site environment variables in Netlify:

| Variable                        | Secret | Purpose                                                          |
| ------------------------------- | ------ | ---------------------------------------------------------------- |
| `GITHUB_APP_ID`                 | No     | GitHub App identifier                                            |
| `GITHUB_APP_INSTALLATION_ID`    | No     | Installation on the `ndelangen` account                          |
| `GITHUB_APP_PRIVATE_KEY_BASE64` | Yes    | Base64-encoded PEM private key, decoded only in the function     |
| `QUESTIONS_ACCESS_CODE`         | Yes    | Shared code checked before any GitHub authentication or API call |

Use the **Functions** scope when the Netlify plan supports scoped variables, and set production
values only for the production deploy context. Deploy Previews should therefore be intentionally
unable to create real issues. Mark both sensitive values as containing secrets where Netlify's
Secrets Controller is available. Never place their values in `netlify.toml`, client-prefixed
variables, build-generated files, responses, or logs. Netlify documents that function runtime
variables should be set through its UI, CLI, or API; variables declared in `netlify.toml` are not
available to Functions.

Base64 is a transport choice to preserve the PEM's line breaks reliably; it is not encryption.
GitHub permits environment-variable private-key storage but describes it as weaker than a
sign-only key vault. Given this app's single-repository installation and sole issue-writing
permission, Netlify's server-only secret environment is the practical boundary for this feature.

Netlify applies environment-variable values at deployment time, so rotating either secret
requires a new deploy. If Lambda compatibility mode is enabled, all function environment
variables share a 4 KB limit; verify the encoded PEM and the site's other variables fit, or use
the modern Functions runtime.

Sources:

- [Netlify environment variables and serverless functions](https://docs.netlify.com/build/functions/environment-variables/)
- [Netlify environment variables overview](https://docs.netlify.com/build/environment-variables/overview/)
- [Managing GitHub App private keys](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps)

## Failure contract

Keep authentication and GitHub failures distinct internally, but return small generic errors to
the browser:

| Condition                                               | Function behavior                                                                                                                                  |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared access code is missing or wrong                  | Reject before constructing the GitHub client or calling GitHub.                                                                                    |
| Required server configuration is missing or malformed   | Fail closed; log the missing variable name, never its value; return a generic unavailable response.                                                |
| GitHub returns `201`                                    | Return success with the issue number or URL.                                                                                                       |
| GitHub returns `400` or `422`                           | Do not retry; log the GitHub status, request ID, and sanitized validation message.                                                                 |
| GitHub returns `401`, `403`, `404`, or `410`            | Treat as an operational authentication, installation, permission, repository, or issue-state failure; do not reveal GitHub details to the browser. |
| GitHub returns `403` or `429` with rate-limit headers   | Do not retry before `Retry-After` or `X-RateLimit-Reset`; pass a bounded retry hint to the client.                                                 |
| GitHub returns `503` or the network result is ambiguous | Report temporary failure. Do not automatically repeat the create-issue POST because a timed-out first request may already have created the issue.  |

The create-issue endpoint documents `201`, `400`, `403`, `404`, `410`, `422`, and `503`; GitHub
also documents `403` or `429` for rate limiting. Log GitHub's request identifier when present so
an operator can trace failures, but never log the access code, private key, JWT, installation
token, submitted answer, or full GitHub authorization headers.

Sources:

- [Create an issue response codes](https://docs.github.com/en/rest/issues/issues?apiVersion=2026-03-10#create-an-issue)
- [REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api?apiVersion=2026-03-10)
- [REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

## Rotation and recovery

For routine private-key rotation:

1. Generate a second GitHub App private key.
2. Replace `GITHUB_APP_PRIVATE_KEY_BASE64` in Netlify and deploy.
3. Verify a correction can create an issue.
4. Delete the old key in GitHub.

GitHub allows multiple private keys specifically to support rotation without downtime. If the key
is exposed, rotate it immediately. If the endpoint must be stopped quickly, suspend or uninstall
the app installation; that removes the installation's repository access.

Sources:

- [Managing GitHub App private keys](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps)
- [Suspending or uninstalling an installation](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps#blocking-access)

## Acceptance checks for implementation

- App installation visibly lists only `the-lost-hope`, `Issues: Read and write`, and repository
  metadata read access.
- No client secret, PAT, OAuth callback, device flow, webhook URL, or webhook secret is configured.
- Production secrets exist only in Netlify's server-side environment and are absent from the
  built browser bundle and logs.
- A valid request creates exactly one issue authored by the GitHub App.
- Invalid shared codes produce no GitHub API request.
- Removing Issues permission or suspending the installation makes the function fail closed without
  disclosing GitHub credentials or raw upstream error bodies.
- Deploy Previews cannot create issues with the production GitHub App.

## Implementation-time checks

- Confirm whether the Netlify site uses Lambda compatibility mode; that determines whether its
  aggregate 4 KB environment-variable limit applies.
- Confirm the site's Netlify plan; Netlify documents Functions-only variable scoping for Pro and
  above.
