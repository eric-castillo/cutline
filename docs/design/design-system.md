> **Nota v2:** esta guía nació para una versión web. En React Native se aplican los **mismos tokens** con `StyleSheet`. Lo que mencione CSS, rutas web, barra lateral de admin o escritorio queda **sustituido por `docs/02-plan.md`** (navegación por rol en pestañas, sin drawer). Se actualiza en el Slice 0. Las pantallas aprobadas del lienzo siguen vigentes; las de barbero ampliado y admin móvil se rediseñan antes de los Slices 5 y 6.

# 08 — Design System

> Visual and interaction rules for Cutline, plus the navigation map and the screen inventory for every role.
> Language: English. Tokens live in `design-tokens.json` (single source of truth). Mockups live in `docs/design/`.
> Direction: **A · Letrero** (D-29). Status: **Draft v1** — foundation, components and navigation are defined; Barber and Admin mockups follow.

---

## 1. Principles

1. **Common, not fancy.** Plain words, big targets, prices up front. It should feel like the shop sign and the price board on the wall, not a luxury brand.
2. **One red action per screen.** Red means "do this" (book, confirm, continue). Everything else is ink, outline or neutral.
3. **Honest and flat.** No shadows, gradients or decoration for its own sake. Structure comes from lines, type and spacing.
4. **Readable first.** Text sizes never below 12, controls never below 44, contrast always checked.
5. **Same everywhere.** The web and the future mobile app use the same tokens, names and structure (`06` §15).

---

## 2. Identity

| Element | Rule |
|---|---|
| Name | **Cutline** (a fictional shop). Wordmark: Barlow Condensed 800, uppercase, tracking +0.04 em, followed by the small word "Barbershop" (12 px, tracking +0.2 em, muted) |
| Pole stripe | A 10-unit band of diagonal hard-stop stripes in red, card and blue (`pattern.poleStripe`). Used on: the top edge of the client app shell, the Lab frame, email headers, empty states. Never as a large background or behind text |
| Price leader | Dotted line between a service name and its price (`pattern.priceLeader`). The signature element of the service list |
| Icons | Stroke icons, 24 px, 2 px stroke, round caps and joins, `currentColor`. No filled icons, no emoji |
| Avatars | Initials in a circle (ink, blue or red fill; light text). Photos are optional later |
| Imagery | None required in the MVP |
| Voice | Short, friendly, plain. "Pick your service", not "Select a service offering". No exclamation marks, no jokes at the user's expense |

---

## 3. Color

All pairs below were computed (WCAG 2.x contrast ratio).

### 3.1 Roles
| Token | Hex | Used for |
|---|---|---|
| `paper` | `#F5F0E6` | App background |
| `card` | `#FBF8F1` | Bars (tab bar, CTA bar), raised surfaces |
| `white` | `#FFFFFF` | Text on red/ink/blue; input backgrounds |
| `ink` | `#1C1A17` | Primary text, outlines, selected states |
| `muted` | `#5E574D` | Secondary text, captions, inactive tabs |
| `line` / `lineStrong` | `#D9D1C1` / `#B8AE9B` | Dividers, light outlines / dotted leaders |
| `red` / `redPressed` | `#B3261E` / `#8F1E18` | Primary action, selected slot, active tab, errors |
| `blue` | `#1F4E79` | Information, links, focus ring, secondary accents |
| `focus` | `#1F4E79` | Keyboard focus ring |

### 3.2 Contrast
| Pair | Ratio | Passes |
|---|---|---|
| `ink` on `paper` | 15.3 : 1 | AAA |
| `muted` on `paper` | 6.3 : 1 | AA |
| `muted` on `card` | 6.7 : 1 | AA |
| `white` on `red` | 6.5 : 1 | AA |
| `white` on `redPressed` | 8.9 : 1 | AAA |
| `red` text on `paper` | 5.8 : 1 | AA |
| `blue` on `paper` | 7.6 : 1 | AAA |

### 3.3 Status colors (appointments)
Status is **always** shown as a text label plus color, never color alone.

| Status | Text | Background | Ratio |
|---|---|---|---|
| `confirmed` | `#1F4E79` | `#E3ECF4` | 7.3 : 1 |
| `completed` | `#2E6B3F` | `#E4EFE3` | 5.4 : 1 |
| `cancelled` | `#5E574D` | `#EAE4D6` | 5.6 : 1 (also struck through where space allows) |
| `no_show` | `#7A4A00` | `#F6E7C8` | 6.1 : 1 |
| error | `#B3261E` | `#F8E1DE` | 5.2 : 1 |

### 3.4 Dark mode
Not in the MVP. Tokens are semantic (`paper`, `ink`), so a dark set can be added without touching components.

---

## 4. Typography

**Heading family:** Barlow Condensed (700, 800), uppercase, like painted signs. **Body family:** DM Sans (400, 500, 700).
Both are **self-hosted** static TTF files (SIL OFL, see `app/assets/font-licenses/`) to avoid third-party requests. Native bundles them with `react-native-asset`; web registers them with `@font-face` under the same names. Each weight is a separate face named after its PostScript name (for example `BarlowCondensed-ExtraBold`), so the same `fontFamily` string works on iOS, Android and web. They cover Spanish accents and `ñ`.

| Style | Font | Size / line | Weight | Notes |
|---|---|---|---|---|
| `display` | Barlow Condensed | 42 / 1.0 | 800 | Uppercase, +0.02 em. Screen titles on Explore |
| `h1` | Barlow Condensed | 32 / 1.05 | 800 | Uppercase. Step screens ("Date & time") |
| `h2` | Barlow Condensed | 24 / 1.1 | 800 | Uppercase. Section titles |
| `label` | Barlow Condensed | 18 / 1.1 | 700 | Uppercase, +0.08 em. "Morning", "Our barbers" |
| `price` | Barlow Condensed | 26 / 1.0 | 700 | Prices and day numbers |
| `button` | Barlow Condensed | 20 / 1.0 | 700 | Uppercase, +0.06 em |
| `tab` | Barlow Condensed | 14 / 1.0 | 700 | Uppercase, +0.06 em |
| `title` | DM Sans | 18 / 1.3 | 700 | Service and barber names |
| `body` / `bodyStrong` | DM Sans | 16 / 1.5 | 400 / 700 | Default text |
| `small` | DM Sans | 14 / 1.4 | 500 | Durations, helper text |
| `caption` | DM Sans | 12 / 1.35 | 700 | Day-of-week, status labels. Minimum size in the system |

**Language rules:** set `lang` on the document and on switched content so uppercase transforms and hyphenation behave in Spanish. Spanish text is typically 20–30 % longer: buttons and tab labels must **wrap or shorten, never truncate**, and no component has a fixed width tied to its English label ("My Appointments" becomes "Mis citas").

---

## 5. Layout, shape and elevation

| Topic | Rule |
|---|---|
| Spacing scale | 4, 8, 12, 16, 20, 24, 32, 40, 48 (`space.1…12`). Screen gutter 20 |
| Radii | `sm` 6 (buttons, chips, slots) · `md` 8 (date pills) · `lg` 12 (sheets, dialogs) · `full` (avatars) |
| Borders | `thin` 1 px (`line`) for dividers · `thick` 2 px (`ink`) for interactive controls and bars |
| Elevation | **None.** No drop shadows. Overlays (sheets, dialogs) use a 2 px `ink` border and a dimmed scrim |
| Client width | Single column; on screens wider than 480 the app is centered at 480 on `paper`, so the mobile layout is the layout |
| Barber width | Tablet-first: ≥ 768 shows agenda plus detail side by side |
| Admin width | Desktop-first: ≥ 1024 shows a 240 px sidebar and content up to 1200 |
| Safe areas | Respect `env(safe-area-inset-*)` on web and the safe-area context on mobile |

---

## 6. Components

States for every interactive component: default, pressed, focus-visible, disabled, loading (where it triggers a request), error (inputs).

### 6.1 Actions
| Component | Spec |
|---|---|
| **Button, primary** | `red` fill, white `button` text, radius `sm`, height 52 (CTA 56). Pressed: `redPressed`. Loading: label replaced by a spinner, width unchanged. One per screen |
| **Button, secondary** | Transparent, 2 px `ink` outline, `ink` text |
| **Button, destructive** | Same as secondary with `red` outline and text. Always behind a confirmation |
| **Icon button** | 44 × 44, 2 px `ink` outline, radius `sm`, `aria-label` required |
| **Segmented toggle (EN \| ES)** | 2 px `ink` outline, selected segment `ink` fill with `paper` text, each segment ≥ 44 wide |
| **Link** | `blue`, underlined, never red |

### 6.2 Selection and content
| Component | Spec |
|---|---|
| **Service row** | Name (`title`) · dotted leader · price (`price`); duration below (`small`, `muted`). Whole row is the tap target, min height 64, divider `line` |
| **Barber avatar item** | 52 px initials circle plus first name. Selected: 2 px `ink` ring |
| **Chip** | Height 34 (44 when interactive), radius `sm`, 1 px `line` on `card`; selected chips use `ink` fill |
| **Date pill** | 7 per row; weekday (`caption`) over day number (`price`). Selected: `ink` fill. Closed day: dashed outline, "Closed" label, not focusable |
| **Slot button** | Height 48, radius `sm`, 2 px `ink` outline, 3 columns. Selected: `red` fill. Only **available** slots are shown (the API returns no others) |
| **Status badge** | `caption` text on the status background (§3.3), radius `sm` |

### 6.3 Appointment ticket (the signature card)
The appointment is drawn like a **numbered ticket from the shop**: `card` background, 1 px `line` border, a dotted perforation between the header and body, service and barber on the left, shop-local date and time large (`h2`) on the right, status badge top right, and actions (Cancel, Reschedule) on a footer row. Past appointments render the same ticket with muted text. The ticket is reused in My Appointments, the booking success screen, the barber agenda and the notification detail.

### 6.4 Navigation chrome
| Component | Spec |
|---|---|
| **Tab bar (client, barber)** | 72 px, `card` background, 2 px `ink` top border; 3 tabs, icon 24 + `tab` label; active tab `red` with a 4 px bar on top; inactive `muted` |
| **Stack header** | 44 px back icon button, `h1` title, step indicator ("3 of 4") in `small` |
| **Sticky CTA bar** | `card` background, 2 px `ink` top border, one primary button. Replaces the tab bar inside the booking stack |
| **Admin sidebar / drawer** | `ink` background, `paper` text; active item has a `red` left bar |
| **Notification bell** | Icon button in the header of every shell; unread count in a `red` badge (number plus accessible label) |

### 6.5 Forms and feedback
| Component | Spec |
|---|---|
| **Text input** | Height 52, 2 px `ink` outline, radius `sm`, `white` fill, visible label above (never placeholder-only), helper text below. Error: `red` outline plus message with an icon |
| **Switch** | For preferences (email reminders). 44 target, label on the left |
| **Banner** | Full width, status background, icon + text + optional action. Types: error, info, **demo** (always visible in the demo) |
| **Toast** | Short confirmation at the bottom above the bar; 4 s; `aria-live="polite"`. Never the only record of something important |
| **Dialog / bottom sheet** | `lg` radius, 2 px `ink` border, scrim; destructive dialogs name what will happen and who is notified |
| **Empty state** | Pole stripe, one sentence, one action. Examples in §8 |
| **Skeleton** | `line`-colored bars in the shape of the final content; no shimmer when `prefers-reduced-motion` |

### 6.6 Role-specific
| Component | Spec |
|---|---|
| **Agenda block (barber)** | Time-grid card sized by duration; client name, service, status badge. Tap opens the action sheet (completed, no-show, cancel) |
| **Day columns (admin)** | One column per barber, shared time axis, blocks as above, holidays and breaks hatched |
| **Data table (admin)** | Sticky header, zebra off (rely on `line`), row actions on the right, filters above; collapses to ticket cards below 768 |
| **Conflict dialog (BR-16)** | Lists affected appointments, states "N clients will be notified", offers *Cancel them and apply* and *Keep as is* |

---

## 7. Motion

| Rule | Value |
|---|---|
| Durations | 120 ms (taps, toggles), 200 ms (screen and sheet transitions) |
| Easing | `cubic-bezier(0.2, 0, 0, 1)` |
| Stack transitions | Slide on mobile only; instant on desktop |
| Reduced motion | `prefers-reduced-motion` removes transitions and skeleton animation; the Lab uses manual stepping (US-LAB-02) |
| No decorative motion | Nothing animates unless it explains a change |

---

## 8. States and error mapping

### 8.1 Loading, empty, error
- **Loading:** skeletons for lists and ticket cards; spinner only inside a button that triggered a request.
- **Empty:** *My Appointments, upcoming* → "No upcoming appointments." + button "Book one". *History* → "Nothing here yet." *Barber agenda, empty day* → "No appointments today." *No slots* → "No times left on this day. Try another day." plus the next day with availability.
- **Error:** a banner with plain language and **Try again**; never raw codes. The `trace_id` is shown only in the demo, small, with a copy button.
- **Offline:** banner "You're offline"; cached app shell only (`06` §5), no stale availability.

### 8.2 API error → what the user sees
| `code` | UX |
|---|---|
| `slot_unavailable` (409) | Stay on *Date & time*, keep the chosen day, reload slots, inline message "That time was just taken. Pick another." |
| `min_notice_violated`, `outside_booking_window`, `slot_not_on_grid`, `outside_working_hours` | Same screen, message from the server, slots reload (these only happen if the page was stale) |
| `active_limit_reached` | Dialog explaining the limit, link to *My Appointments* |
| `outside_cancellation_window` | Dialog with the shop phone number and a "Call" action |
| `invalid_transition`, `appointment_not_started` | Toast with the server message; the list refreshes |
| `validation_failed` | Field-level errors under each input; focus moves to the first |
| `rate_limited` (429) | Banner with a countdown from `Retry-After`; the button stays disabled until it ends |
| `unauthenticated` (401) | Redirect to *Login*, remembering the intended route and booking state |
| `forbidden` (403) / `not_found` (404) | Friendly "Not available" screen with a way back |
| `csrf_mismatch` (419) | One silent retry after refreshing the CSRF cookie, then a generic error |
| `schedule_conflict` (409) | Conflict dialog (§6.6) |

---

## 9. Navigation and routes

The structure deliberately matches **React Navigation** so the mobile app (Slice 13) mirrors it: tab navigator → stacks → drawer for admin. Web paths come from React Router layout routes with `<Outlet>`.

### 9.1 Client (and guest)
```
Root
 ├─ Tabs (layout: tab bar visible)
 │   ├─ Explore            /app/explore
 │   ├─ MyAppointments     /app/appointments        (tabs inside: Upcoming | History)
 │   └─ Profile            /app/profile
 ├─ BookingStack (no tab bar; sticky CTA bar)
 │   ├─ ServiceStep        /app/book/service        (reached by tapping a service on Explore)
 │   ├─ BarberStep         /app/book/barber         ("Any available barber" first)
 │   ├─ DateTimeStep       /app/book/time
 │   ├─ ConfirmStep        /app/book/confirm        (auth gate: Log in | Register | Continue as guest)
 │   └─ BookedSuccess      /app/book/done/:id       (the ticket)
 ├─ AppointmentDetail      /app/appointments/:id    (cancel, reschedule)
 ├─ RescheduleStack        /app/appointments/:id/reschedule  (reuses BarberStep and DateTimeStep)
 ├─ Notifications          /app/notifications
 ├─ Auth                   /app/login, /app/register
 └─ GuestAppointment       /app/g/:appointmentId    (token in URL fragment)
```
Rules:
- **Browsing never needs an account.** Services, barbers and availability are public. The account question appears only at *ConfirmStep*, as three clear choices: **Log in · Create account · Continue as guest**.
- Tab bar is hidden inside the booking and reschedule stacks (one clear path, one CTA).
- The system back action goes one step back; leaving the stack from the first step returns to *Explore*.
- Booking state (service, barber, day, slot) lives in memory and survives a login detour.
- The language toggle sits in the *Explore* header and in *Profile*.

### 9.2 Barber (tablet / mobile)
```
BarberTabs
 ├─ Agenda     /app/barber/agenda      (Day | Week toggle; tap a block → action sheet)
 ├─ Blocks     /app/barber/blocks      (list + add block; walk-in button in the Agenda header)
 └─ Profile    /app/profile            (shared screen)
Modal: WalkInForm   /app/barber/walk-in
```

### 9.3 Admin (desktop-first)
```
AdminShell (sidebar ≥ 1024, top bar + drawer below)
 ├─ Dashboard     /app/admin/dashboard    (today: appointments per barber)
 ├─ Agenda        /app/admin/agenda       (day columns by barber)
 ├─ Appointments  /app/admin/appointments (filters, create manual appointment)
 ├─ Staff         /app/admin/staff        (list → edit: profile, services, weekly schedule)
 ├─ Services      /app/admin/services
 ├─ Holidays      /app/admin/holidays
 └─ Settings      /app/admin/settings
```

### 9.4 Outside the app
`/` Lab landing · `/learn` and `/learn/:lesson` · each has its own light shell with the pole stripe and a link into `/app`. The demo banner appears on every route in the demo environment.

### 9.5 Header chrome common to the app shells
Language toggle (client), notification bell with unread badge (all roles), demo banner (demo only).

---

## 10. Screen inventory

State columns: **L** loading · **E** empty · **X** error.

### Client
| Screen | Purpose | Key components | States | Stories |
|---|---|---|---|---|
| Explore | Browse services and barbers | Service rows, barber avatars, language toggle | L E X | CAT-01, CAT-02 |
| BarberStep | Choose a barber for the service | Barber list with "Any available barber" first; "No availability" state | L X | CAT-02 |
| DateTimeStep | Pick a day and time | Date pills, shop-time label, slot grid, sticky CTA | L E X | CAT-03, X-02 |
| ConfirmStep | Review and confirm; identify | Summary ticket, auth choices, guest form, CTA | L X | BOOK-01, BOOK-06 |
| BookedSuccess | Confirmation | Ticket, "Add to calendar" later, link to My Appointments | — | BOOK-01 |
| MyAppointments | Upcoming and history | Tickets, Upcoming/History tabs | L E X | BOOK-03 |
| AppointmentDetail | Manage one appointment | Ticket, Cancel and Reschedule, shop phone | L X | BOOK-04, BOOK-05 |
| Notifications | In-app list | Notification items, mark all read | L E X | SYS-03 |
| Profile | Account and preferences | Name, phone, password, language, reminders switch, logout | L X | AUTH-04 |
| Login, Register | Authenticate | Inputs with visible labels, errors, rate-limit banner | X | AUTH-01, AUTH-02 |
| GuestAppointment | Magic-link view | Ticket, Cancel | L X | BOOK-06 |

### Barber
| Screen | Purpose | Key components | States | Stories |
|---|---|---|---|---|
| Agenda | Day/week view | Time grid, agenda blocks, status sheet | L E X | BAR-01, BAR-02 |
| Blocks | Manage blocked time | List, add block form, conflict dialog | L E X | BAR-03 |
| WalkInForm | Add walk-in | Name, optional phone, service, free slot | X | BAR-04 |

### Admin
| Screen | Purpose | Key components | States | Stories |
|---|---|---|---|---|
| Dashboard | Today at a glance | Per-barber list of today's tickets | L E X | ADM-01 |
| Agenda | Global agenda | Day columns by barber, filters | L E X | ADM-01 |
| Appointments | List and manual booking | Data table, filter bar, create form | L E X | ADM-01, ADM-07 |
| Staff | Barbers | Table, edit form, services assignment, weekly schedule editor, deactivate with conflict dialog | L E X | ADM-02, ADM-04 |
| Services | Catalog | Table, bilingual form (EN/ES tabs), activate/deactivate | L E X | ADM-03 |
| Holidays | Closed days | List, add, conflict dialog | L E X | ADM-05 |
| Settings | Shop and rules | Timezone select, numeric rule inputs | L X | ADM-06 |

Lab and Learn screens are specified in `09-lab-inspector.md` and `10-learn-security.md`, using the same tokens.

---

## 11. Accessibility

- **Contrast:** all text and controls meet AA (§3). Text sizes ≥ 12; interactive targets ≥ 44.
- **Focus:** a 2 px `focus` (`blue`) ring with 2 px offset on every interactive element, never removed; focus moves to the page heading after a route change and to the first invalid field after a failed submit.
- **Semantics:** real `button`, `a`, `input` + `label`; landmarks (`nav`, `main`); one `h1` per screen; no click handlers on non-interactive elements.
- **Announcements:** toasts and error banners use `aria-live`; form errors are tied to inputs with `aria-describedby`.
- **Not color alone:** statuses carry text; closed days carry a label and a dashed outline.
- **Zoom and text size:** layouts hold at 200 % zoom and at larger system font sizes; nothing relies on fixed heights for text.
- **Motion:** see §7.
- **Language:** `lang` is set per document and per switched fragment.

---

## 12. Copy and i18n

Every string lives in `app/src/i18n/{en,es}.json`; `npm run i18n:check` fails if a key is missing in either language. Keys are dotted and screen-scoped (`explore.title`, `time.shopTime`). Interpolation uses named params; plurals use ICU-style rules. Dates, times and money are formatted with `Intl` in shop time (`03` §2).

| Key | English | Español |
|---|---|---|
| `tabs.explore` | Explore | Explorar |
| `tabs.appointments` | My Appointments | Mis citas |
| `tabs.profile` | Profile | Perfil |
| `explore.title` | Pick your service | Elige tu servicio |
| `barber.title` | Choose your barber | Elige tu barbero |
| `barber.any` | Any available barber | Cualquier barbero disponible |
| `time.title` | Date & time | Fecha y hora |
| `time.shopTime` | Shop time · Eastern (EST) | Hora de la barbería · Este (EST) |
| `time.morning` / `time.afternoon` | Morning / Afternoon | Mañana / Tarde |
| `time.closed` | Closed | Cerrado |
| `cta.continue` | Continue | Continuar |
| `confirm.title` | Confirm your appointment | Confirma tu cita |
| `confirm.guest` | Continue as guest | Continuar como invitado |
| `errors.slotTaken` | That time was just taken. Pick another. | Ese horario se acaba de ocupar. Elige otro. |
| `appointment.cancel` | Cancel appointment | Cancelar cita |
| `status.confirmed` / `completed` / `cancelled` / `no_show` | Confirmed / Completed / Cancelled / No-show | Confirmada / Completada / Cancelada / No asistió |

---

## 13. Web and mobile mapping

| Concern | Web (react-native-web) | Mobile (React Native CLI) |
|---|---|---|
| Tokens | `tokens.css` variables | `tokens.ts` constants |
| Tabs | Layout route + tab bar component | `@react-navigation/bottom-tabs` |
| Booking flow | Nested routes, sticky CTA bar | `@react-navigation/native-stack` |
| Admin shell | Sidebar / drawer | Not planned for mobile (admin stays web) |
| Pole stripe | CSS repeating gradient | Shared SVG asset (no CSS gradients in RN) |
| Dotted leader | CSS `border-bottom: 2px dotted` | `borderStyle: 'dotted'` or a repeated-dot SVG |
| Fonts | `@font-face`, self-hosted TTF | `react-native-asset` with the same files |
| Bottom sheet | Dialog component | `@gorhom/bottom-sheet` or a modal |
| Safe areas | CSS env() | `react-native-safe-area-context` |
| Storage | AsyncStorage (IndexedDB on web) | AsyncStorage. No tokens: the session is simulated (L-03) |

Admin screens are web-only by design; the mobile app covers Client and Barber.

---

## 14. Deliverables in `docs/design/`

`design-tokens.json` · exported images of the approved boards (directions, client flow, barber, admin) · this document. Barber and Admin mockups are added as they are designed.

---

## 15. Decisions

| ID | Decision | Status |
|---|---|---|
| D-29 | Direction A · Letrero | Accepted |
| D-30 | Browsing is public; the account choice appears at the Confirm step (Log in, Create account, Continue as guest) | **Proposed** |
| D-31 | No shadows; elevation is expressed with 2 px ink borders | **Proposed** |
| D-32 | Admin screens are web-only; the mobile app covers Client and Barber | **Proposed** |
