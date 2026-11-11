# Web spike (Slice 0): react-native-web without Expo

> Status: **done, pending the Slice 0 decision gate** (`02-plan.md` §8).
> Goal: render the Explore screen in a browser from the same `app/src` code, using react-native-web, and learn what breaks before building the Lab on top of it.

## Decision

**Vite** (8.3) with `react-native-web` (0.21). Config: [`app/web/vite.config.mts`](../app/web/vite.config.mts).

webpack 5 was built and tested with the same code and also works; it is documented below as the fallback. Both passed the same 15 browser checks in development and production. The choice is about maintenance cost, not about one failing.

### Why Vite

| | Vite | webpack 5 |
|---|---|---|
| Browser checks (dev + prod) | 15/15 + 15/15 | 15/15 + 15/15 |
| Dev server ready | ~0.16 s | ~1.7 s (first compile) |
| Production build | ~0.3 s | ~4.9 s |
| JS bundle (min / gzip) | 693 kB / 217 kB | 673 kB / 206 kB |
| devDependencies added | 2 (`vite`, `@vitejs/plugin-react`) | 5 (`webpack`, `webpack-cli`, `webpack-dev-server`, `babel-loader`, `html-webpack-plugin`) |
| Config size | 43 lines | 77 lines + a second HTML template |
| Workarounds needed | alias, shim, `global` define | alias, shim, `global` define, Babel flag, `fullySpecified` rule, asset rules |
| Needs Babel | No | Yes (`@react-native/babel-preset`) |

Vite is smaller to configure and to keep working, and it is much faster, which matters for iterating on the Lab. The workarounds that webpack needed beyond the shared ones were all webpack/Babel configuration, not problems in our code.

### Risks accepted with Vite (and how to leave)

- Vite 8 uses Rolldown, which is new. It is stricter than webpack (it turned a harmless missing export into a build error; see finding 1).
- Third-party React Native libraries that ship Flow-typed `.js` source would need extra loader configuration in Vite. webpack with the React Native Babel preset handles those out of the box. **None of our current libraries need it.** Before adding a library, check that it works on web (a rule already in `CLAUDE.md`).
- If Vite becomes a problem, switch to webpack. These are the settings that were verified to work, in addition to the same aliases and `define`s as the Vite config:
  - `babel-loader` with `module:@react-native/babel-preset` and `disableImportExportTransform: true` (without it the bundle fails in the browser with `exports is not defined`).
  - `{test: /\.m?js$/, resolve: {fullySpecified: false}}` (extensionless ESM imports in `@react-navigation` and AsyncStorage).
  - `asset/resource` for `ttf` and `png`.
  - `HtmlWebpackPlugin` with an HTML template that has no `<script>` tag.

## What works (verified in Chrome 157, mobile-size viewport)

Checked by a script that drives real Chrome through the built app and the dev server.

| Area | Result |
|---|---|
| Explore renders from `app/src`, identical to iOS/Android | Works |
| React Navigation `bottom-tabs` with the custom `TabBar`: render, switch tab, selected tab exposed (`aria-selected`) | Works |
| React Navigation `native-stack` (react-native-screens): push with params, header back | Works, after finding 3 |
| Fonts: all 5 faces (Barlow Condensed 700/800, DM Sans 400/500/700) load in the browser and are used by the right elements | Works |
| `react-native-svg`: pole stripe, price leader, icons | Works |
| `react-i18next`: EN/ES switch is immediate; Spanish money formats as `$25` (`es-US`) | Works |
| AsyncStorage: language survives a page reload | Works. On web, AsyncStorage v3 stores in **IndexedDB** (database `cutline`), not `localStorage` |
| Console errors / failed requests | None |

## Findings (what did not work, and what was done)

Each one was investigated before changing anything.

1. **Vite production build failed: `"TurboModuleRegistry" is not exported by react-native-web`.**
   `react-native-svg` has a lazy `require` of a native-only module that runs only on Android (`SvgTouchableMixin`). The code never runs on web, but Rolldown fails the build on a missing export, and webpack-dev-server shows the same thing as a full-screen overlay that blocks all clicks.
   *Fix:* [`app/web/shims/react-native.ts`](../app/web/shims/react-native.ts) re-exports all of `react-native-web` and adds a stub for that one name. It is applied as an alias for the bare `react-native` import. It does not touch `node_modules`.
2. **`Can't resolve '@react-native/assets-registry/registry'`** (from `react-native-svg`'s web code; React Native 0.88 no longer provides it). Only used for numeric image assets, which we do not use.
   *Fix:* alias to the equivalent module that ships inside `react-native-web`. No extra dependency.
3. **`ReferenceError: global is not defined` when going back in a `native-stack`** (blank screen). `react-native-screens` reads `global.*`, which exists in Metro and Node but not in browsers. It only appeared when testing a stack, not with tabs.
   *Fix:* `define: {global: 'globalThis'}`.
4. **Our own bug, found by the web check:** the selected tab, selected language and busy/disabled button states were not exposed to assistive technology on web. `react-native-web` ignores the `accessibilityState` object. *Fix (in our components):* use the `aria-selected`, `aria-checked`, `aria-disabled` and `aria-busy` props, which React Native also supports natively. This is now the rule for new components.
5. **Our own bug:** passing `accessible={false}` to an `<Svg>` produced a React DOM warning in development. *Fix:* `aria-hidden` on decorative icons.
6. Vite 8 deprecation notices in my first config (`vite.config.ts` as CommonJS, `optimizeDeps.esbuildOptions`). *Fix:* `vite.config.mts` and `optimizeDeps.rolldownOptions`.

## Not verified / open

Be careful about reading more into this spike than it shows.

- **Only Chrome was tested** (desktop Chrome with a 390 px viewport, not a real phone). Safari and Firefox were not tested.
- **No deep links or browser history.** The `NavigationContainer` has no `linking` config, so the URL never changes and the browser back button does not navigate. Whether the Lab needs this is a decision for Slice 4.
- **Wide screens:** the layout caps content at 480 but the tab bar spans the viewport. The 390x844 phone frame belongs to the Lab (Slice 4) and is not built.
- **Fonts have no fallback stack** on web (a failed font download shows the browser default).
- **Bundle is 693 kB** (217 kB gzip), mostly `react-native-web`. Vite warns about chunk size. Acceptable for a static demo; not optimized.
- **Hot reload and production deploy** were not exercised beyond a clean dev start and `vite build` + `vite preview`.
- The browser check script is not in the repo (it needs `puppeteer-core` and a local Chrome). It could become a CI smoke test if you want it.

## How to run

```bash
cd app
npm install
npm run web          # dev server (Vite)
npm run web:build    # static build into app/dist/web
npm run web:preview  # serve the build locally
```
