# 02 — Plan: cómo lo construimos

> Arquitectura, riesgos, estructura del repo, Lab y slices. Depende de `01-mvp.md`.
> Estado: **plan definitivo, pendiente de autorización de Eric**.

---

## 1. Principio rector

**Una sola app. Un solo código. Tres roles. Dos formas de verla.**
En el teléfono es la app. En el navegador es la misma app dentro de un marco de teléfono, con el Lab al lado.

---

## 2. Tecnología

| Pieza | Elección | Nota |
|---|---|---|
| Framework | **React Native CLI** + TypeScript | Proyecto creado con la CLI oficial de la comunidad. **Cero Expo** |
| Navegación | **React Navigation**: native-stack y bottom-tabs | Sin drawer ni Reanimated |
| Web | **react-native-web** con bundler web (Vite o webpack; se decide en el spike del Slice 0) | Misma carpeta `src/` |
| Estado de servidor | TanStack Query | Carga/error sobre la API simulada |
| Formularios | React Hook Form + Zod | |
| Idioma | i18next / react-i18next | EN/ES |
| Almacenamiento | `@react-native-async-storage/async-storage` | Funciona en móvil y web |
| Fuentes | Barlow Condensed y DM Sans empaquetadas con `react-native-asset` | En web, `@font-face` |
| Iconos | `react-native-svg` (iconos propios en SVG) | Sin librerías de iconos pesadas |
| Animación | `Animated` incluido en React Native | Sin Reanimated |
| Pruebas | Jest + React Native Testing Library | |
| Calidad | ESLint, TypeScript estricto, Prettier | |
| CI | GitHub Actions: lint, tipos y pruebas | Compilar nativo en CI queda fuera del MVP |

Fuera de la lista a propósito: Expo, Redux, monorepo, Docker, backend, base de datos, drawer, Reanimated.

**Requisitos en tu Mac (los instalas tú antes del Slice 0):** Xcode y sus herramientas de línea de comandos, CocoaPods, Android Studio con SDK y emulador, JDK compatible, Node LTS, Watchman. La guía oficial "Set up your environment" de React Native manda la lista exacta y las versiones.

---

## 3. Estructura del repo

```
cutline/
  app/                          # proyecto React Native CLI
    android/  ios/              # nativo (generado por la CLI)
    src/
      api/                      # LA COSTURA
        types.ts                # contrato: Service, Barber, Slot, Appointment, errores
        client.ts               # interfaz CutlineApi
        mock/                   # backend simulado (§4)
      domain/                   # lógica pura y probada: disponibilidad, reglas, permisos, estados
      navigation/               # raíz por rol: ClientTabs, BarberTabs, AdminTabs
      screens/
        client/  barber/  admin/  auth/  shared/
      components/               # Button, ServiceRow, DatePill, SlotButton, Ticket, StatusBadge, PoleStripe...
      theme/                    # tokens desde design-tokens.json
      i18n/                     # en.json, es.json
      lab/                      # solo web: marco de teléfono, inspector, narrador, escenarios
    web/                        # entrada web (index.html, bundler config)
    index.js  App.tsx
  docs/                         # 01-mvp.md, 02-plan.md, repo-hardening.md, design/
  README.md  README.es.md  CLAUDE.md
```

Los archivos del Lab usan extensión de plataforma (`.web.tsx` con un stub `.native.tsx` vacío) para que **nunca entren al paquete móvil**.

---

## 4. El backend simulado

Una capa en TypeScript que **se comporta como un servidor**, pero vive dentro de la app.

### 4.1 La costura
La app **solo** habla con la interfaz `CutlineApi` (`getServices`, `getSlots`, `createAppointment`, `rescheduleAppointment`, `cancelAppointment`, `blockTime`, etc.). Hoy la implementa `MockApi`. Si algún día hay un servidor, se escribe `HttpApi` con la misma interfaz y las pantallas no cambian.

### 4.2 Qué hace `MockApi`
- **Datos semilla** EN/ES: 3 barberos, 6 servicios, horarios, cuentas de demostración y citas de ejemplo.
- **Almacén local** persistido; botón "Reiniciar datos".
- **Latencia configurable** y errores forzables (para los escenarios del Lab).
- **Motor de disponibilidad** (función pura): horario semanal − descansos − bloqueos − cierres − citas, en cuadrícula de 15 min, con anticipación y ventana máximas.
- **Operaciones de dominio** (una vez, parametrizadas por rol): crear, reprogramar, cancelar, cerrar (completada/no asistió), bloquear. Cada una recibe el **actor** (rol + id) y pasa por el **pipeline**.
- **Pipeline** con etapas con nombre: sesión → validación → permisos → reglas de dominio → "transacción" sobre el almacén (traslape, límite) → efectos (evento + notificación) → respuesta. Cada etapa se **registra** como parte de la traza.
- **Errores tipados:** `validation_failed`, `forbidden`, `not_found`, `slot_unavailable`, `min_notice_violated`, `outside_booking_window`, `active_limit_reached`, `outside_cancellation_window`, `invalid_transition`, `schedule_conflict`.

### 4.3 Reutilizado de la v1
El **diseño** (tokens y pantallas) y la **lógica de disponibilidad y reglas** (simplificada). El resto se archiva.

---

## 5. El Lab (web)

Cada llamada a `MockApi` deja una **traza** (etapas con resultado y datos). El Lab la muestra y la reproduce.

| Pieza | Qué es |
|---|---|
| **Marco de teléfono** | En web y pantallas ≥ 1024: la app dentro de un teléfono 390×844 |
| **Inspector** | Lista de solicitudes y, para la seleccionada, la línea de tiempo de etapas, la solicitud y la respuesta |
| **Reproducción** | ⏮ ◀ ▶ ⏸ ▶| y velocidad; con movimiento reducido, solo paso manual |
| **Narrador** | Frases cortas que siguen la reproducción. **Determinista:** cada etapa tiene un código y textos EN/ES en dos niveles (Simple/Detallado). Sin IA en ejecución |
| **Modo Laboratorio** | Interruptor: apagado, solo la app; encendido, se registra y muestra la traza |
| **Escenarios** | Botones que provocan fallas reales de la simulación (incluida una acción sin permiso) |
| **Carrera (Podría)** | Dos teléfonos reservan el mismo horario; el almacén local resuelve quién gana |
| **Aviso fijo** | "Backend simulado: así funcionaría un servidor real" |

---

## 6. Navegación por rol

```
Login (cuentas de demostración / invitado)
 ├─ Cliente  → Tabs: Explorar · Mis citas · Perfil
 │             Stack de reserva: Servicio → Barbero → Fecha y hora → Confirmar → Ticket
 ├─ Barbero  → Tabs: Agenda · Bloqueos · Perfil
 │             Pantallas: Detalle de cita, Nueva cita, Reprogramar
 └─ Admin    → Tabs: Agenda · Servicios · Equipo · Barbería   (Perfil desde el encabezado)
               Pantallas: Editar servicio, Editar barbero (servicios y horario), Cierres, Nueva cita, Ajustes
```

El diseño de las pantallas nuevas (barbero ampliado y admin móvil) lo preparo **antes** de cada slice correspondiente, igual que hicimos con el flujo de cliente.

---

## 7. Riesgos y cómo se contienen

| Riesgo | Impacto | Medida |
|---|---|---|
| **Sin Expo: toolchain nativa (Xcode, Android Studio, Pods)** | El Slice 0 puede alargarse | Requisitos instalados antes; Slice 0 tiene 5–6 sesiones; criterio: la app abre en iOS **y** Android |
| **Web sin Expo: react-native-web con la CLI exige configurar el bundler y revisar que cada librería funcione en web** | Es el riesgo técnico más alto | **Spike en el Slice 0** con **puerta de decisión** (§8). Librerías elegidas por compatibilidad web; sin Reanimated ni drawer |
| **Alcance creció (barbero y admin completos)** | Más pantallas y reglas | Un solo motor de operaciones (§4.2); conflictos se bloquean, no se cascadean (BR-11); formularios mínimos; orden de recortes (§9) |
| Fuentes personalizadas en iOS/Android | Nombres de fuente distintos por plataforma | Probar en el Slice 0 con los dos pesos de cada familia |
| Perder el rumbo otra vez | Abandono | Reglas de tiempo por slice y recorte de alcance, no de calidad (§10) |
| Afirmar de más en el CV | Credibilidad | Se presenta como "MVP móvil con backend simulado" (§11) |

---

## 8. Slices

Cada slice termina con la app funcionando, pruebas en verde y una captura o GIF. Estimación a ~2 h por sesión; es una guía, no una promesa.

### Slice 0 — Fundamentos y spike web (5–6 sesiones)
Crear el proyecto React Native CLI en `app/`, React Navigation con pestañas vacías, tokens de diseño, fuentes empaquetadas, i18n EN/ES con chequeo de claves, componentes base, ESLint/Prettier/Jest, CI, y el **spike web**: la pantalla Explorar renderizada en el navegador con react-native-web.
**Listo cuando:** Explorar abre en simulador iOS, emulador Android y navegador, con la franja de barbero, las fuentes correctas y el cambio EN/ES.
**Puerta de decisión (fin del Slice 0):** si la web no renderiza de forma estable, se decide con Eric entre (a) un día extra de depuración, (b) mover el Lab **dentro de la app** (como pantalla "Lab") y dejar la web solo como README con GIFs. No se avanza sin decidirlo.

### Slice 1 — Backend simulado y dominio (7–8 sesiones)
Contrato de la API, datos semilla y cuentas, almacén local, motor de disponibilidad, permisos por rol, operaciones de dominio, pipeline con trazas, errores tipados, latencia y reinicio.
**Listo cuando:** las pruebas de disponibilidad, reglas, permisos y estados pasan, y desde un test cada rol ejecuta sus operaciones permitidas y recibe `forbidden` en las demás.

### Slice 2 — Sesión y flujo de reserva del cliente (6–7 sesiones)
Login con cuentas de demostración e invitado, Explorar, Elegir barbero, Fecha y hora, Confirmar, Ticket, estados de carga/vacío/error.
**Listo cuando:** en tu teléfono reservas una cita real de la simulación de principio a fin.

### Slice 3 — Mis citas y perfil del cliente (5–6 sesiones)
Mis citas (próximas e historial), cancelar, reprogramar, Perfil (idioma, recordatorios, cambiar de cuenta, reiniciar datos), notificaciones internas con contador.
**Listo cuando:** el ciclo completo del cliente funciona en EN y ES.

### Slice 4 — Lab v1 (6 sesiones) — **hito presentable**
Marco de teléfono, inspector, reproducción paso a paso, narrador Simple/Detallado, modo Laboratorio, aviso de "backend simulado".
**Listo cuando:** en el navegador reservas en el teléfono y ves la traza reproducida con explicación.
*Aquí ya hay algo que mostrar en entrevistas.*

### Slice 5 — Barbero (5–6 sesiones)
Diseño previo de pantallas. Agenda por día/semana, detalle de cita, nueva cita, reprogramar, cancelar, completada/no asistió, bloqueos.
**Listo cuando:** un barbero opera su día completo y el cliente ve los cambios y sus notificaciones.

### Slice 6 — Administrador (7–8 sesiones)
Diseño previo de pantallas. Agenda global con filtros, crear/reprogramar/cancelar cualquier cita, servicios (formulario bilingüe), equipo (perfil, servicios, horario semanal), cierres de la barbería; conflictos bloqueados con lista de citas afectadas. Ajustes de reglas solo si sobra tiempo.
**Listo cuando:** el admin opera la barbería completa y los cambios se reflejan en las otras dos experiencias.

### Slice 7 — Lab v2 (4–5 sesiones)
Escenarios guiados (incluida acción sin permiso por rol). Si hay tiempo: modo Carrera y recorrido guiado.
**Listo cuando:** puedes provocar y explicar cada falla en el Lab.

### Slice 8 — Pulido y publicación (5 sesiones)
Accesibilidad, revisión de ambos idiomas, versión web publicada como **sitio estático**, README EN/ES con límites y sección de IA, GIFs, `docs/ai-workflow.md`, prueba final en dispositivo real.
**Listo cuando:** alguien clona el repo, sigue los pasos y lo ve funcionar, y la demo web está en línea.

### Totales
**50 a 57 sesiones.** A 7 sesiones por semana, unas 8 semanas; a 5 por semana, unas 11. El hito presentable (Slice 4) llega alrededor de la sesión 29 a 33.

---

## 9. Orden de recortes si falta tiempo

1. Modo Carrera y recorrido guiado (Slice 7).
2. Ajustes de reglas del admin (RF-27).
3. Ficha de cita del barbero (RF-20) y vista semanal.
4. Notificaciones internas (RF-11).
**Nunca se recorta:** disponibilidad y reglas con pruebas, permisos por rol, Lab v1, bilingüe, límites honestos en el README.

---

## 10. Reglas para no perder el rumbo

1. **Una frase por slice** (su "Listo cuando"). Si no se cumple, el slice no termina.
2. **Tope de tiempo:** si un slice llega a 1.5 veces su estimación, se **recorta alcance** (según §9), no se alarga.
3. **Nada nuevo sin pasar por `01-mvp.md`.** Una idea nueva se anota en "Futuro" y no entra al MVP.
4. **Diseño antes de código** para pantallas nuevas.
5. **Reporte al final de cada slice** aquí, para revisión y puntos de CV.

---

## 11. Definición de "terminado" (todos los slices)

1. Funciona en iOS y Android; en web si el slice toca la web.
2. Pruebas nuevas en verde; ESLint y TypeScript limpios.
3. Toda cadena nueva existe en EN y ES.
4. Estados de carga, vacío y error cubiertos.
5. Sin secretos ni datos reales; commits pequeños y firmados.
6. Documentación actualizada en el mismo cambio.

---

## 12. Para tu CV (con honestidad)

Lo que respalda este proyecto: app React Native CLI con TypeScript, React Navigation, lógica de dominio con permisos por rol y pruebas, arquitectura con interfaz intercambiable, i18n, accesibilidad, CI y un visualizador interactivo del flujo cliente-servidor. Se presenta como **"MVP móvil con backend simulado"**, nunca como un sistema con servidor real. Tu experiencia de backend real (Laravel, GitHub Actions, servidor Ubuntu) la respaldan RACSA y LESCU.
