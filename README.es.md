# Cutline

**Una app de citas para barberías en React Native, con datos locales y un backend simulado. Su versión web muestra la misma app dentro de un teléfono, junto a un Lab que explica paso a paso cómo se comportaría un backend real.**

[English](README.md) · [Documentación](docs/) · Demo en vivo: _próximamente_

> **Estado: en construcción (v2).** Se construye por slices; consulta [`docs/02-plan.md`](docs/02-plan.md). La primera versión fue un intento full-stack (Laravel + PostgreSQL); se conserva en el repositorio archivado [`cutline-v1-archive`](https://github.com/eric-castillo/cutline-v1-archive).

---

## Qué es

- **App móvil** (React Native CLI, TypeScript, React Navigation) con tres experiencias: **cliente**, **barbero** y **administrador**, con cuentas de demostración precargadas.
- **Backend simulado** en TypeScript: datos semilla, motor de disponibilidad, reglas de reserva, permisos por rol y un pipeline de solicitudes. La app solo habla con una interfaz `CutlineApi`, así que un servidor real podría reemplazar la simulación sin cambiar las pantallas.
- **Lab (web):** la app dentro de un teléfono con un inspector que reproduce cada solicitud paso a paso y un narrador en vivo (inglés/español).
- **Bilingüe:** interfaz, datos de ejemplo y notificaciones en inglés y español.

## Límites, con honestidad

Es un **MVP móvil con backend simulado**. No hay servidor, base de datos, autenticación, correo ni push reales. Las sesiones son simuladas y no son un mecanismo de seguridad. Las trazas del Lab las produce la simulación. Lista completa: [`docs/01-mvp.md`](docs/01-mvp.md) §9 (en español).

## Ejecutarlo

> **En qué punto está el proyecto:** Slice 0 (fundamentos). La app muestra por ahora la pantalla **Explorar** con servicios de ejemplo fijos dentro de tres pestañas de cliente vacías. Todavía no hay flujo de reserva ni backend simulado; llegan en los siguientes slices.

Todos los comandos se ejecutan dentro de `app/`. No hay monorepo ni Expo.

### Requisitos

Sigue la guía de React Native [Set up your development environment](https://reactnative.dev/docs/set-up-your-development-environment) (React Native CLI, no Expo Go). En resumen:

- **Node** 22.11 o superior, y Watchman.
- **iOS** (solo macOS): Xcode con sus herramientas de línea de comandos, Ruby y CocoaPods (se instalan con Bundler, ver abajo).
- **Android:** un JDK (funciona el 17), Android Studio con un SDK y un emulador (o un dispositivo con depuración USB).

### Instalar

```bash
cd app
npm install
```

### iOS

```bash
cd ios
bundle install            # una sola vez
bundle exec pod install   # lento la primera vez (varios minutos)
cd ..
npm start                 # Metro, déjalo corriendo
npm run ios               # en otra terminal; añade -- --simulator "iPhone 16" para elegir uno
```

### Android

Inicia un emulador (o conecta un dispositivo) y luego:

```bash
npm start                 # Metro, déjalo corriendo
npm run android           # en otra terminal
```

### Web

```bash
npm run web               # servidor de desarrollo; abre la URL que imprime
npm run web:build         # build estático en app/dist/web
npm run web:preview       # sirve ese build en local
```

La versión web usa `react-native-web` empaquetado con Vite. Por ahora solo se ha comprobado en Chrome de escritorio; en [`docs/spike-web.md`](docs/spike-web.md) (en inglés) está lo que funciona, lo que necesitó ajustes y lo que sigue abierto.

### Comprobaciones

```bash
npm run check             # lint, tipos, formato, claves i18n, tokens de diseño y pruebas
```

Scripts sueltos: `npm run lint`, `typecheck`, `format:check`, `i18n:check`, `tokens:check`, `test`. Tras editar `docs/design/design-tokens.json`, ejecuta `npm run tokens` para regenerar `app/src/theme/tokens.ts`.

## Construido con ayuda de IA

Planeado y construido con **Claude (Anthropic)** como asistente de desarrollo. El autor revisa, ejecuta y responde por cada cambio. Los detalles estarán en `docs/ai-workflow.md`.

## Autor

**Eric Fabian Castillo Ruiz**, desarrollador full-stack móvil.

## Licencia

MIT. Cutline es una barbería ficticia; todos los datos son inventados.
