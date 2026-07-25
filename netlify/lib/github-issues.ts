import { App, Octokit } from 'octokit'

import type { IssueInput } from '../functions/submit-question'

const NoRetryOctokit = Octokit.defaults({
  retry: { enabled: false },
  throttle: { enabled: false },
})

let installationClient: InstanceType<typeof NoRetryOctokit> | undefined

function positiveIntegerEnvironmentVariable(name: string): number {
  const value = Number(process.env[name])
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`Missing ${name}`)
  return value
}

function privateKeyFromEnvironment(): string {
  const encoded = process.env.GITHUB_APP_PRIVATE_KEY_BASE64
  if (!encoded) throw new Error('Missing GitHub App private key')

  const privateKey = Buffer.from(encoded, 'base64').toString('utf8')
  if (!privateKey.startsWith('-----BEGIN ') || !privateKey.includes('PRIVATE KEY-----')) {
    throw new Error('Invalid GitHub App private key')
  }
  return privateKey
}

async function getInstallationClient() {
  if (installationClient) return installationClient

  const app = new App({
    appId: positiveIntegerEnvironmentVariable('GITHUB_APP_ID'),
    privateKey: privateKeyFromEnvironment(),
    Octokit: NoRetryOctokit,
  })
  installationClient = await app.getInstallationOctokit(
    positiveIntegerEnvironmentVariable('GITHUB_APP_INSTALLATION_ID'),
  )
  return installationClient
}

export async function createGitHubIssue(issue: IssueInput): Promise<void> {
  const octokit = await getInstallationClient()
  const response = await octokit.rest.issues.create(issue)
  if (response.status !== 201) throw new Error('GitHub did not create the issue')
}
