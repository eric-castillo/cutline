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

> **Where the project is:** Slice 0 (foundations). The app currently shows the **Explore** screen with fixed sample services inside three empty client tabs. There is no booking flow and no simulated backend yet; those come in later slices.

All commands run inside `app/`. There is no monorepo and no Expo.

### Requirements

Follow the React Native guide [Set up your development environment](https://reactnative.dev/docs/set-up-your-development-environment) (React Native CLI, not Expo Go). In short:

- **Node** 22.11 or newer, and Watchman.
- **iOS** (macOS only): Xcode with its command line tools, Ruby and CocoaPods (installed through Bundler, see below).
- **Android:** a JDK (17 works), Android Studio with an SDK and an emulator (or a device with USB debugging).

### Install

```bash
cd app
npm install
```

### iOS

```bash
cd ios
bundle install            # once
bundle exec pod install   # slow the first time (several minutes)
cd ..
npm start                 # Metro bundler, keep it running
npm run ios               # in another terminal; add -- --simulator "iPhone 16" to pick one
```

### Android

Start an emulator (or connect a device), then:

```bash
npm start                 # Metro bundler, keep it running
npm run android           # in another terminal
```

### Web

```bash
npm run web               # dev server; open the URL it prints
npm run web:build         # static build into app/dist/web
npm run web:preview       # serve that build locally
```

The web build uses `react-native-web` bundled by Vite. It has only been checked in desktop Chrome so far; see [`docs/spike-web.md`](docs/spike-web.md) for what works, what needed workarounds and what is still open.

### Checks

```bash
npm run check             # lint, types, formatting, i18n keys, design tokens, tests
```

Individual scripts: `npm run lint`, `typecheck`, `format:check`, `i18n:check`, `tokens:check`, `test`. After editing `docs/design/design-tokens.json`, run `npm run tokens` to regenerate `app/src/theme/tokens.ts`.

## Built with AI assistance

Planned and built with **Claude (Anthropic)** as a development assistant. The author reviews, runs and is accountable for every change. Details will live in `docs/ai-workflow.md`.

## Author

**Eric Fabian Castillo Ruiz**, full-stack mobile developer.

## License

MIT. Cutline is a fictional shop; all data is made up.
