# HealthBreak — Copilot Instructions

A Pomodoro timer + guided active break app. React 19 · TypeScript · Vite · MUI v7.

## Architecture

```
src/
  App.tsx                        # Root layout, state for timerLayout / activeBreakOpen / bgConfig
  components/
    styles.ts                    # GLASS_COLOR shared style constant — import here, don't hardcode
    backgroundConfig.ts          # BackgroundConfig type, STATIC_COLORS, load/save helpers
    AppBackground.tsx            # Renders background layer (image / color / gradient variants)
    BackgroundConfigMenu.tsx     # ⚙ fixed button + MUI Menu for background selection
    PomodoroTimer.tsx            # Countdown timer, presets, break prompt banner
    Sidebar.tsx                  # Glass panel (size=3 Grid): PomodoroTimer + TodoList
    SidebarToggleButton.tsx      # Fixed icon button to toggle center/sidebar timer layout
    TodoList.tsx                 # localStorage-persisted task list
    ActiveBreak.tsx              # Full-screen guided break overlay — orchestrates all steps
    break-components/
      types.ts                   # BreakStep union type, BREAK_STEPS config, getStepLabel()
      helpers.ts                 # Box-breathing constants, getBreathPhaseDuration(), playNotificationSound()
      TimedStep.tsx              # Reusable countdown step (eyes-closed + look-distance both use this)
      BodyPromptStep.tsx         # Message-only step with a Next button, no timer
      BoxBreathingStep.tsx       # Animated conic-gradient border trace
      index.ts                   # Barrel export for all break-components
```

## Key Conventions

**Glass panels** — use `GLASS_COLOR` from `./styles` (`rgba(20,20,20,0.55)`). Do not hardcode it.

**Break steps** — defined in `types.ts` as a `BreakStep` union + `BREAK_STEPS` array. To add a step:
1. Add a variant to the `BreakStep` union in `types.ts`
2. Add a case to `getStepLabel()` in `types.ts`
3. Add an entry to `BREAK_STEPS`
4. Handle it in `ActiveBreak.tsx`: initialize state in the step-init effect, render in `renderStep()`
5. Create a component in `break-components/` if needed; export it from `index.ts`

**Background variants** — `BackgroundConfig` is a discriminated union in `backgroundConfig.ts`. Gradient variants use `{ type: 'gradient'; variant: 'warp' | 'spheres' | 'aurora' }`. Add new variants there + render in `AppBackground.tsx` + add menu item in `BackgroundConfigMenu.tsx`.

**Timer layout** — persisted in `localStorage` as `'healthbreak-timer-layout'`. When `'center'`, `PomodoroTimer` renders in the main grid area. When `'sidebar'`, the `Sidebar` component renders it alongside the todo list.

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `healthbreak-timer-layout` | `'center'` \| `'sidebar'` |
| `healthbreak-bg-config` | Serialized `BackgroundConfig` |
| `healthbreak-todos` | Serialized `TodoItem[]` |
| `DEV_TIMER_SPEED` | Number — multiplier for timer speed during development |

## Gotchas

- **`@mui/icons-material` is NOT installed** — it's incompatible with MUI v7. Use unicode characters instead (e.g. `✕`, `+`, `☰`).
- **`playNotificationSound()`** lives in `helpers.ts` but is intentionally NOT re-exported from the barrel. Import directly from `'./helpers'` if needed inside `break-components/`.
- **`secondsLeft === 0` fires on mount** — the countdown-zero effect in `ActiveBreak` guards with `if (!stepStarted) return` and `if (type === 'body-prompt') return` to prevent false triggers.
- **`@keyframes` in MUI `sx`** — TypeScript accepts keyframe objects without `as any`; do not add type casts.

## Build & Dev

```bash
npm install       # install deps
npm run dev       # dev server at http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve dist/ locally
```
