# Cutline

**A barbershop booking app for React Native, running on local data and a simulated backend. Its web version shows the same app inside a phone next to a Lab that explains, step by step, how a real backend would behave.**

[Español](README.es.md) · [Docs](docs/) · Live demo: _coming soon_

> **Status: work in progress (v2).** Built in slices; see [`docs/02-plan.md`](docs/02-plan.md). The first version was a full-stack attempt (Laravel + PostgreSQL); it is kept in the archived repository [`cutline-v1-archive`](https://github.com/eric-castillo/cutline-v1-archive).

---

## What it is

- **Mobile app** (React Native CLI, TypeScript, React Navigation) with three experiences: **client**, **barber** and **admin**, switchable through preloaded demo accounts.
- **Simulated backend** in TypeScript: seeded data, availability engine, booking rules, role permissions and a request pipeline. The app only talks to a `CutlineApi` interface, so a real server could replace the simulation without changing the screens.
- **Lab (web):** the app inside a phone frame with an inspector that replays every request step by step and a live narrator (English/Spanish).
- **Bilingual:** UI, sample data and notifications in English and Spanish.

## Honest limits

This is a **mobile MVP with a simulated backend**. There is no real server, database, authentication, email or push. Sessions are simulated and are not a security mechanism. The Lab's traces are produced by the simulation. Full list: [`docs/01-mvp.md`](docs/01-mvp.md) §9.

## Run it

Setup instructions will be added with Slice 0 (iOS, Android and web).

## Built with AI assistance

Planned and built with **Claude (Anthropic)** as a development assistant. The author reviews, runs and is accountable for every change. Details will live in `docs/ai-workflow.md`.

## Author

**Eric Fabian Castillo Ruiz**, full-stack mobile developer.

## License

MIT. Cutline is a fictional shop; all data is made up.
