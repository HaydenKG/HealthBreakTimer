# HealthBreakTimer

A focus app that pairs a Pomodoro timer with guided active breaks — eye rest, box breathing, and body movement prompts — to help you stay healthy during long work sessions.

Working long hours in front of a PC?
Want to take care of you health?
Feel dizzy after a long day sitting?

This is for you! A tool that guides you through various active breaks to feel better after a long day of deskwork.

https://haydenkg.github.io/HealthBreakTimer/

**Stack:** React 19 · TypeScript · Vite · MUI v7

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other commands

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run build`   | Type-check and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally                   |
| `npm run lint`    | Run ESLint                                           |

### Dev speed flag

To fast-forward the Pomodoro timer during development, run this in the browser console:

```js
localStorage.setItem('DEV_TIMER_SPEED', '60'); // 1 real second = 60 timer-seconds
```

Remove it to restore normal speed:

```js
localStorage.removeItem('DEV_TIMER_SPEED');
```

---

## Deploy to GitHub Pages

### 1. Set the base path

In `vite.config.ts`, add the `base` option matching your repository name:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/'
});
```

### 2. Build

```bash
npm run build
```

### 3. Deploy

Using github pages `gh-pages` CLI:

```bash
npx gh-pages -d dist
```

This pushes `dist/` to the `gh-pages` branch. In your GitHub repo settings, set **Pages → Source** to the `gh-pages` branch.
