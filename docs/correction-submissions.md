# Correction submission deployment

The `/questions` page and unlocked entity detail pages send one player correction or addition at a
time to `POST /api/corrections/submit`. The Netlify Function creates a review-only issue in
`ndelangen/the-lost-hope`; it never applies campaign changes. `QUESTIONS.md` remains the sole source
for the questions page.

## GitHub App

Create a private GitHub App owned by `ndelangen` with:

- installation limited to the owning account;
- repository access limited to `the-lost-hope`;
- repository permission **Issues: Read and write**;
- every other selectable repository, organization, and account permission set to no access;
- webhooks inactive; and
- OAuth, device flow, and user authorization unused.

Install the App only on `the-lost-hope`. Create the repository label `submitted-correction` before
enabling submissions. The Function supplies that fixed label; players cannot choose labels,
repositories, owners, titles, or assignees.

## Netlify environment

Configure these values outside the repository:

| Variable                         | Availability                    | Secret | Purpose                                      |
| -------------------------------- | ------------------------------- | ------ | -------------------------------------------- |
| `CORRECTIONS_ACCESS_CODE_SHA256` | Production builds and Functions | No     | Public digest for both page and server check |
| `GITHUB_APP_ID`                  | Production Functions            | No     | Numeric private App ID                       |
| `GITHUB_APP_INSTALLATION_ID`     | Production Functions            | No     | Numeric repository installation ID           |
| `GITHUB_APP_PRIVATE_KEY_BASE64`  | Production Functions            | Yes    | Single-line base64 encoding of the PEM key   |

Do not configure production GitHub App credentials for Deploy Previews. A preview can render the
page when given a digest, but its Function must fail closed instead of creating issues.

Use a random shared code with at least 128 bits of entropy. Only its lowercase SHA-256 hex digest is
configured; never commit or log the original code. The digest is intentionally present in the
browser bundle and therefore does not protect a weak code from offline guessing.

The GitHub private key's base64 encoding preserves PEM line breaks but is not encryption. Mark the
value as secret in Netlify and confirm the site's environment-size limits accommodate it.

## Rotation

To rotate the shared code:

1. Generate a new high-entropy code and calculate its lowercase SHA-256 hex digest locally.
2. Replace `CORRECTIONS_ACCESS_CODE_SHA256` in both the production build and Function scopes.
3. Deploy the site.
4. Share the new original code with the players through the existing private channel.

Previously remembered codes stop matching the new browser digest. If an already-open page submits
the old code, the Function returns `access_denied`, clears it from the browser, and relocks the page.

To rotate the GitHub App private key without downtime:

1. Generate a second private key for the same App.
2. Base64-encode the complete PEM as one line.
3. Replace `GITHUB_APP_PRIVATE_KEY_BASE64` in Netlify and deploy.
4. Complete the controlled submission check below.
5. Delete the old key in GitHub.

Suspend or uninstall the App installation to stop issue creation immediately after suspected
credential exposure.

## One-time terminology migration

The application intentionally replaces the old questions-only names atomically:

- `QUESTIONS_ACCESS_CODE_SHA256` becomes `CORRECTIONS_ACCESS_CODE_SHA256`.
- `dag:questions:access-code` becomes `dag:corrections:access-code`.
- `/api/questions/submit` becomes `/api/corrections/submit`.

There is no endpoint, payload, environment, or local-storage fallback. Players enter the same shared
code once more on `/questions`; old open tabs must refresh.

For the production rollout:

1. Add `CORRECTIONS_ACCESS_CODE_SHA256` with the existing digest to both build and Function scopes
   while the old variable remains configured.
2. Deploy and complete the controlled entity-detail submission check below.
3. Remove `QUESTIONS_ACCESS_CODE_SHA256` only after the live check succeeds.
4. Confirm the deployed application no longer depends on the old variable.

## Acceptance checks

Before the first live use:

1. Run `bun run verify`.
2. Run the app and Function together once with `netlify dev`; verify the custom route reaches the
   Function without exposing configuration details.
3. Submit one clearly marked correction or addition through a production entity detail page.
4. Confirm one issue is created by the GitHub App with the exact title/body, the
   `submitted-correction` label, and no player attribution or notification mentions.
5. Confirm the Function response and logs contain no access code, submitted content, credential, raw
   GitHub error, request headers, IP address, issue number, or issue URL.
6. Close the test issue.

Repeat the production submission check only after changing relevant Netlify wiring, GitHub App
authentication, or infrastructure configuration. Routine tests mock GitHub and do not create live
issues.
