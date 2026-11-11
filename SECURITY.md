# Security Policy

Cutline is a portfolio project: a mobile app with a **simulated backend** and fictional data. There is no production server, database or real user data.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

- Use GitHub's **Private vulnerability reporting** (Security tab → "Report a vulnerability"), or
- Email the author (see the profile on the repository page).

Include what you found, steps to reproduce, and the impact. This is a personal project maintained in spare time: there is no bounty and no guaranteed timeline, but reports are taken seriously and credited if you wish.

## Scope

In scope: the code in this repository (app, simulated backend, Lab) and its CI configuration, including any leaked secret or unsafe workflow.
Out of scope: third-party services (GitHub, hosting), social engineering, automated scanning at scale. The simulated sessions and local data are **not** security mechanisms by design (see `docs/01-mvp.md` §9).

## Supported versions

Only the latest release on `main`.

## Design notes

Known limitations are documented in `docs/01-mvp.md` (§9). Repository protection is described in `docs/repo-hardening.md`.
