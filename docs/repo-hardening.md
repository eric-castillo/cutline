> **Nota v2:** este documento viene de la v1. Los apartados de despliegue (entorno `production`, VPS, Slice 12) **no aplican al MVP v2**, que no tiene servidor. El resto (cuenta, rama `main`, secretos, Actions, Claude Code) aplica igual.

# Repository hardening

> How the public Cutline repository is protected against leaked credentials and unauthorized commits, pushes and pull requests.
> The author applies the GitHub settings by hand (they are not code). Review this list again before the first public deploy (Slice 12).

---

## 1. Threats

| Threat | Example | Main control |
|---|---|---|
| Leaked secret | `.env` or a token committed | `.gitignore`, gitleaks, secret scanning + push protection |
| Unauthorized push | Stolen token, careless AI agent | Branch ruleset on `main`, 2FA, no write access for others |
| Malicious pull request | Fork PR that runs code in CI with secrets | Approval for outside contributors, no secrets for forks, read-only token |
| Supply chain | Compromised dependency or action | Dependabot, pinned action SHAs, lockfiles, CodeQL, Trivy |
| AI agent oversteps | Claude Code pushes to `main`, reads `.env` | `.claude/settings.json` rules, `CLAUDE.md`, branch ruleset |
| Account takeover | Phished GitHub login | Passkey/2FA, no shared accounts |

---

## 2. GitHub settings checklist (author applies)

### Account
- [ ] Two-factor authentication with a **passkey or authenticator app** (not SMS). Store recovery codes offline.
- [ ] Review **Settings → Applications** and SSH/GPG keys; remove what you do not use.
- [ ] Use fine-grained personal access tokens with the minimum repository scope and a short expiry, only if a token is needed at all.

### Repository → Settings → General
- [ ] Features: keep Issues; disable Wikis and Projects if unused.
- [ ] Pull Requests: enable **"Automatically delete head branches"**; allow **squash merging** only.

### Repository → Settings → Rules → Rulesets (or Branches → protection) for `main`
- [ ] **Require a pull request before merging** (no direct pushes to `main`).
- [ ] **Require status checks to pass** (backend CI, web CI, gitleaks) and require branches to be up to date.
- [ ] **Block force pushes** and **restrict deletions**.
- [ ] **Require linear history** (matches squash merges).
- [ ] Optional: **Require signed commits** (SSH or GPG signing).
- [ ] Solo note: do not require approvals from others (you cannot approve your own PR). Do **not** give anyone else write access; outside contributors can only open PRs from forks, and nothing merges without you.
- [ ] Protect tags `v*` (restrict creation and deletion).

### Repository → Settings → Code security
- [ ] Enable **Dependency graph**, **Dependabot alerts** and **security updates**.
- [ ] Enable **Secret scanning** and **Push protection**.
- [ ] Enable **Code scanning** (CodeQL default setup).
- [ ] Enable **Private vulnerability reporting** (matches `SECURITY.md`).

### Repository → Settings → Actions → General
- [ ] Actions permissions: allow **only actions you choose** (GitHub-authored and the few third-party ones the workflows use).
- [ ] **Fork pull request workflows from outside collaborators:** *Require approval for all outside collaborators*.
- [ ] **Workflow permissions:** *Read repository contents* (read-only default); do **not** allow Actions to create or approve pull requests.
- [ ] Secrets are **not** sent to workflows from forks (GitHub default); keep it that way.

### Repository → Settings → Environments
- [ ] Create `production` (Slice 12) with **required reviewer = you** and restrict deployment to `main`. Deployment secrets (SSH key limited to the deploy command, host) live only here, never as repository-wide secrets.

### Repository → Settings → Collaborators
- [ ] No collaborators. No deploy keys unless read-only and needed.

---

## 3. Files in the repository

| File | Purpose |
|---|---|
| `.gitignore` | Ignore `.env`, `.env.*` (keep `!.env.example`), `.claude/settings.local.json`, `*.pem`, `*.key`, `*.p12`, `vendor/`, `node_modules/`, build output, database dumps (`*.sql`, `*.dump`) except migrations |
| `.env.example` | Fake values only |
| `SECURITY.md` | How to report a vulnerability, supported scope |
| `.github/CODEOWNERS` | Owner of everything (`* @<your-user>`); useful when outside contributors appear |
| `.github/dependabot.yml` | Weekly updates for composer, npm, GitHub Actions, Docker |
| `.github/workflows/*.yml` | CI with `permissions: contents: read` at top level; actions pinned to a commit SHA; no `pull_request_target` on fork code |
| `.claude/settings.json` | Shared Claude Code permissions (§4) |
| `CLAUDE.md` | Behavioural rules for the AI agent (section "Credentials and repository safety") |

Optional local pre-commit hook: run `gitleaks protect --staged` so secrets are caught **before** they enter history.

---

## 4. Claude Code permissions (`.claude/settings.json`)

Committed, shared rules. They are a safety net on top of `CLAUDE.md`, not a replacement. Keep it conservative; the author can relax it locally in `.claude/settings.local.json` (git-ignored).

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./**/*.pem)",
      "Read(./**/*.key)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Read(~/.claude/**)",
      "Edit(./.github/workflows/**)",
      "Bash(git push --force:*)",
      "Bash(git push -f:*)",
      "Bash(git push origin main:*)",
      "Bash(git push origin HEAD:main:*)",
      "Bash(git reset --hard:*)",
      "Bash(git branch -D:*)",
      "Bash(git tag -d:*)",
      "Bash(gh pr merge:*)",
      "Bash(gh pr review:*)",
      "Bash(gh repo edit:*)",
      "Bash(gh secret:*)",
      "Bash(gh api:*)",
      "Bash(rm -rf:*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(gh pr create:*)",
      "Bash(npm install:*)",
      "Bash(composer require:*)"
    ]
  }
}
```

Notes:
- The `Read(./.env.*)` rule also matches `.env.example`; that is acceptable (the author can open it manually or approve a one-off read).
- Editing workflow files is denied so a change to CI (the most sensitive automation) always goes through the author. Remove this rule while building Slice 0's CI, then restore it, or approve the edits manually.
- **Verify the exact rule syntax** against the current Claude Code permissions documentation when you create the file; the syntax can change between versions. Test it: ask Claude Code to read `.env` and confirm it is refused.

---

## 5. If a secret leaks

1. **Revoke or rotate it immediately** at the issuer (GitHub token, API key, database password). This is the only real fix.
2. Remove it from the code and push a fix; deleting the commit does not help because the repository is public and may be cloned or cached.
3. Optionally rewrite history (`git filter-repo`) and force-push **after** rotation, then ask GitHub support to purge cached views if needed.
4. Check logs for use of the secret; record the incident in a private note.
5. Add a test or gitleaks rule so the same mistake is caught next time.

---

## 6. Decisions

| ID | Decision | Status |
|---|---|---|
| D-44 | `main` is protected by a ruleset: PR required, status checks required, no force pushes, linear history | **Proposed** |
| D-45 | Secret scanning, push protection, gitleaks (CI and optional pre-commit) are mandatory | **Proposed** |
| D-46 | Claude Code may commit on `slice/*` branches but asks before any push and cannot merge, force-push or change GitHub settings | **Proposed** |
