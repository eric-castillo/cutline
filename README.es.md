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

Las instrucciones se añadirán con el Slice 0 (iOS, Android y web).

## Construido con ayuda de IA

Planeado y construido con **Claude (Anthropic)** como asistente de desarrollo. El autor revisa, ejecuta y responde por cada cambio. Los detalles estarán en `docs/ai-workflow.md`.

## Autor

**Eric Fabian Castillo Ruiz**, desarrollador full-stack móvil.

## Licencia

MIT. Cutline es una barbería ficticia; todos los datos son inventados.
