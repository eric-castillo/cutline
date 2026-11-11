# 01 — MVP: qué construimos

> **Cutline v2.1.** Alcance definitivo del MVP. Reemplaza a la especificación anterior (que se archiva).
> Estado: **pendiente de autorización de Eric**. Idioma: español para validar; los README del repo serán en inglés y español.

---

## 1. En dos frases

**Cutline es una app móvil en React Native (React Native CLI, sin Expo) para reservar y gestionar citas en una barbería, con datos locales y un backend simulado.**
**Su versión web muestra la misma app dentro de un teléfono, junto a un Lab que explica paso a paso cómo funcionaría el backend.**

Si una idea no cabe en esas dos frases, queda fuera del MVP.

---

## 2. Qué cambia respecto a la versión anterior

| Antes (v1) | Ahora (v2) |
|---|---|
| Backend real (Laravel + PostgreSQL) | **Sin backend.** Backend **simulado**, local, con datos de prueba |
| Web primero | **Móvil primero**; web como teléfono simulado + Lab |
| Admin solo web de escritorio | **Admin y barbero dentro de la app móvil** (mismo código) |
| Invitados con enlace mágico, Learn, despliegue en VPS, correos reales | Fuera del MVP |
| 14 slices, 10 documentos | **9 slices (0 a 8), 2 documentos de especificación** |

**Se conserva:** el diseño "Letrero", el flujo de pantallas, el Lab y el bilingüe EN/ES.

---

## 3. Qué demuestra este proyecto (y qué no)

**Demuestra:** diseño de producto, una app React Native con CLI bien estructurada y probada, lógica de negocio real (disponibilidad, reglas, permisos por rol), bilingüe, y la capacidad de **explicar cómo funciona un backend** con el Lab.
**No demuestra:** un backend real, base de datos, despliegue de servidor ni seguridad de producción. El README lo dice con claridad. La capa simulada se puede reemplazar por una API real sin tocar las pantallas (ver `02-plan.md` §4.1).

---

## 4. Actores y cuentas de demostración

| Actor | Qué hace |
|---|---|
| **Cliente** | Explora, reserva y gestiona sus citas |
| **Barbero** | Opera su agenda: ve, crea, reprograma, cancela y cierra citas; bloquea tiempo |
| **Administrador** | Opera toda la barbería: agenda global, servicios, equipo, horarios y cierres |
| **Sistema** | Aplica reglas y permisos, genera notificaciones simuladas |

**Cuentas precargadas** (inicio de sesión de un toque, sin contraseñas reales):

| Rol | Cuentas |
|---|---|
| Cliente | Sam Rivera, Lia Moreno, Omar Díaz (cada una con citas de ejemplo) + opción **Continuar como invitado** |
| Barbero | Marcus, Diego, Aisha (cada uno ligado a su agenda) |
| Administrador | Admin Cutline |

Desde Perfil se puede **cambiar de cuenta** para ver cada rol sin reiniciar la app. El rol decide qué interfaz se muestra.

---

## 5. Requerimientos funcionales

Prioridad: **M** = Debe · **D** = Debería · **P** = Podría (si sobra tiempo).

### 5.1 Cliente
| ID | Requerimiento | Prio |
|---|---|---|
| RF-01 | Ver el catálogo de **servicios** (nombre, duración, precio) | M |
| RF-02 | Ver a los **barberos** y elegir uno o "cualquier barbero disponible" | M |
| RF-03 | Ver **días y horarios disponibles** según servicio y barbero, en la hora de la barbería, con días cerrados marcados | M |
| RF-04 | **Reservar** una cita: confirmación con resumen y ticket al terminar | M |
| RF-05 | Reglas de reserva (sin traslape, anticipación mínima, ventana máxima, límite de citas activas) | M |
| RF-06 | **Sesión simulada** con cuentas de demostración, o continuar como invitado (nombre y correo) | M |
| RF-07 | **Mis citas:** próximas e historial, como tickets con su estado | M |
| RF-08 | **Cancelar** una cita hasta 2 h antes | M |
| RF-09 | **Reprogramar** una cita (la misma cita cambia de horario) | M |
| RF-10 | **Perfil:** nombre, teléfono, idioma EN/ES, recordatorios (interruptor), cambiar de cuenta, cerrar sesión | M |
| RF-11 | **Notificaciones dentro de la app** (confirmada, cancelada, reprogramada, recordatorio simulado) con contador | D |
| RF-12 | **Idioma EN/ES** en toda la interfaz y datos de ejemplo, con cambio inmediato | M |
| RF-13 | **Reiniciar datos de demostración** | M |

### 5.2 Barbero
| ID | Requerimiento | Prio |
|---|---|---|
| RF-14 | Ver su **agenda** por día (y por semana) con el estado de cada cita | M |
| RF-15 | **Crear una cita** para un cliente (walk-in o manual) en un horario libre | M |
| RF-16 | **Reprogramar** una cita de su agenda a otro horario libre | M |
| RF-17 | **Cancelar** una cita de su agenda (el cliente recibe notificación simulada) | M |
| RF-18 | Marcar una cita como **completada** o **no asistió** (solo después de la hora de inicio) | M |
| RF-19 | **Bloquear tiempo** propio (descanso, ausencia) y quitar bloqueos | M |
| RF-20 | Ver la **ficha de la cita** (cliente, contacto, servicio, historial de cambios) | D |

### 5.3 Administrador
| ID | Requerimiento | Prio |
|---|---|---|
| RF-21 | **Agenda global** con filtro por barbero y por día | M |
| RF-22 | Crear, reprogramar y cancelar **cualquier cita** | M |
| RF-23 | **Servicios:** crear, editar (nombre EN/ES, duración, precio) y desactivar | M |
| RF-24 | **Equipo:** crear y editar barberos, asignar servicios, desactivar | M |
| RF-25 | **Horario semanal** de cada barbero (días, horas de trabajo y descanso) | M |
| RF-26 | **Cierres de la barbería** (días festivos o cerrados) | M |
| RF-27 | **Ajustes de reglas** (anticipación, ventana, límite de citas, cancelación) | P |

### 5.4 Lab (versión web)
| ID | Requerimiento | Prio |
|---|---|---|
| RF-L1 | La web muestra la app **dentro de un teléfono** junto a un **inspector** | M |
| RF-L2 | Cada acción de la app genera una **traza** del backend simulado (validación, permisos, reglas, "transacción", respuesta) que se **reproduce paso a paso** | M |
| RF-L3 | Un **narrador** explica cada paso en lenguaje sencillo (nivel Simple y Detallado), en EN/ES | M |
| RF-L4 | **Modo Laboratorio** activable y desactivable | M |
| RF-L5 | **Escenarios guiados** de falla (horario ocupado, poca anticipación, límite de citas, cancelación tardía, acción sin permiso) | D |
| RF-L6 | **Modo Carrera:** dos teléfonos reservan el mismo horario; uno gana y el otro recibe conflicto | P |
| RF-L7 | **Recorrido guiado** de 2–3 minutos | P |

El Lab dice siempre, de forma visible, que el backend es **simulado**.

---

## 6. Permisos por rol (el motor es uno; cambia el alcance)

| Operación | Cliente | Barbero | Admin |
|---|---|---|---|
| Ver catálogo y disponibilidad | Sí | Sí | Sí |
| Ver citas | Las propias | Las de su agenda | Todas |
| Crear cita | Para sí (con todas las reglas) | En su agenda (sin anticipación mínima ni límite) | En cualquier agenda (igual) |
| Reprogramar | Las propias (reglas del cliente) | Las de su agenda (sin ventana de cancelación) | Cualquiera |
| Cancelar | Las propias hasta 2 h antes | Las de su agenda | Cualquiera |
| Completada / no asistió | No | Las de su agenda | Cualquiera |
| Bloquear tiempo | No | El propio | El de cualquier barbero |
| Servicios, equipo, horarios, cierres, ajustes | No | No | Sí |

Todos los casos "Sí" siguen respetando el **no traslape**. Una acción fuera de permisos devuelve `forbidden` y se ve en el Lab.

**Cómo se controla la complejidad:** las operaciones (crear, reprogramar, cancelar, cerrar, bloquear) se escriben **una sola vez** en la capa de dominio y reciben el rol del actor. Barbero y admin no son "otra app": son pantallas distintas sobre las mismas operaciones.

---

## 7. Requerimientos no funcionales

| ID | Categoría | Requerimiento |
|---|---|---|
| RNF-01 | Plataforma | **React Native CLI**, TypeScript. **Sin Expo ni paquetes `expo-*`** |
| RNF-02 | Dispositivos | Se ejecuta en simulador iOS, emulador Android y **dispositivo real** |
| RNF-03 | Navegación | **React Navigation** (tabs y stacks). Sin drawer ni Reanimated (se evita para no complicar la versión web) |
| RNF-04 | Web | Misma base de código en navegador con **react-native-web**, dentro de un marco de teléfono en pantallas grandes |
| RNF-05 | Datos | Todo local. Sin red, sin cuentas reales, sin secretos. Persistencia en el dispositivo y reinicio de datos |
| RNF-06 | Idioma | Toda cadena visible existe en EN y ES; un chequeo automático falla si falta alguna |
| RNF-07 | Diseño | Sistema "Letrero": solo tokens, sin valores sueltos; sin sombras |
| RNF-08 | Usabilidad | Objetivos táctiles ≥ 44, texto ≥ 12, contraste AA, etiquetas de accesibilidad, estados de carga, vacío y error en cada pantalla |
| RNF-09 | Rendimiento | Latencia simulada configurable (por defecto ~300 ms) para mostrar estados de carga; listas fluidas |
| RNF-10 | Calidad | TypeScript estricto, ESLint, pruebas de la lógica de dominio y de los componentes clave |
| RNF-11 | Mantenibilidad | La app solo habla con la interfaz `CutlineApi`; el backend simulado es intercambiable |
| RNF-12 | Arranque | Pasos documentados y reproducibles para correr en iOS, Android y web |
| RNF-13 | Transparencia | README EN/ES con límites claros y sección de uso de IA; ningún texto afirma seguridad o backend inexistentes |
| RNF-14 | Repositorio | Público, sin secretos, commits firmados, CI con lint, tipos y pruebas |

---

## 8. Alcance

### Dentro
- App React Native (iOS y Android) con tres experiencias: **Cliente, Barbero y Administrador**.
- Backend **simulado**: catálogo, horarios, disponibilidad, reglas, permisos por rol, citas, bloqueos, notificaciones, latencia, persistencia local, trazas.
- Cuentas de demostración precargadas y cambio de cuenta.
- Idioma EN/ES completo.
- Versión web con teléfono simulado y Lab.
- Documentación, README en dos idiomas, GIFs.

### Fuera (a propósito)
Backend real, base de datos, API HTTP, autenticación real, correos o push reales, pagos, varias barberías, invitados con enlace mágico, Learn, despliegue de servidor, publicación en tiendas, Expo.

---

## 9. Limitaciones (se declaran en el README)

| ID | Limitación |
|---|---|
| L-01 | **No hay backend real.** Los "conflictos" y la "concurrencia" los simula la capa local; no equivalen a una base de datos bajo carga |
| L-02 | **Datos solo en el dispositivo.** No hay sincronización entre dispositivos ni usuarios compartidos |
| L-03 | **La sesión es simulada** y no es un mecanismo de seguridad; no hay contraseñas |
| L-04 | **Sin correos ni push reales.** Las notificaciones son internas y los recordatorios se simulan |
| L-05 | **Una barbería y una zona horaria.** No se modelan cambios de horario de verano |
| L-06 | **Las trazas del Lab las genera la simulación**, no un servidor real |
| L-07 | **El marco de teléfono web es visual**; no sustituye probar en un dispositivo real |
| L-08 | **Los estados finales** (completada, cancelada, no asistió) no se corrigen |
| L-09 | **Cambios de horario, cierres o desactivaciones con citas futuras se bloquean** hasta que esas citas se reprogramen o cancelen (no hay cancelación en cascada) |
| L-10 | **Probar en dispositivo requiere Xcode / Android Studio.** En iOS con una cuenta gratuita de Apple, la instalación en dispositivo caduca cada pocos días |

---

## 10. Reglas de negocio

| ID | Regla |
|---|---|
| BR-01 | Una cita ocupa a su barbero desde el inicio hasta el fin (duración del servicio). No se permite traslape |
| BR-02 | Horarios en cuadrícula de 15 minutos |
| BR-03 | El cliente reserva con al menos 2 horas de anticipación (el personal está exento) |
| BR-04 | El cliente reserva hasta 30 días adelante |
| BR-05 | El cliente cancela o reprograma hasta 2 horas antes (el personal está exento) |
| BR-06 | Máximo 3 citas activas por cliente (el personal está exento) |
| BR-07 | Estados: `confirmada` → `completada` / `cancelada` / `no asistió`. Solo una cita `confirmada` se puede reprogramar o cancelar |
| BR-08 | "Cualquier barbero": se asigna el que tenga menos citas ese día (empate por orden) |
| BR-09 | El precio y la duración se copian a la cita al reservar |
| BR-10 | Marcar completada o no asistió solo es posible después de la hora de inicio |
| BR-11 | Un bloqueo, horario, cierre o desactivación que choque con citas futuras se rechaza y lista esas citas |
| BR-12 | Cada cambio de una cita genera un evento en su historial y una notificación simulada al cliente |

---

## 11. Decisiones (estado)

| ID | Decisión | Estado |
|---|---|---|
| D-01 | **React Native CLI + React Navigation + react-native-web**. Sin Expo | Aceptada |
| D-02 | Backend simulado en TypeScript con datos semilla y persistencia local | Aceptada |
| D-03 | Tres roles completos (cliente, barbero, admin) sobre un único motor de operaciones | Aceptada |
| D-04 | Learn fuera del MVP | Aceptada |
| D-05 | La v1 queda como repositorio archivado (`cutline-v1-archive`); el repositorio nuevo `cutline` parte vacío con solo la fase v2 | Aceptada |
| D-06 | Una zona horaria, sin horario de verano | Aceptada |
| D-07 | Cuentas de demostración precargadas con cambio de cuenta | Aceptada |
| D-08 | Conflictos de horario se bloquean (sin cascada) para contener la complejidad | **Propuesta** |
| D-09 | Sin drawer ni Reanimated: el admin usa pestañas | **Propuesta** |
