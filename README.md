# [AWO] Alpha Wolves — Hunt Tracker

Live analytics dashboard for the **Alpha Wolves** Total Battle clan. Reads the clan event sheet in real time and recomputes every hunter's score independently, surfacing quota compliance, points attribution, and chest efficiency at a glance.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![ECharts](https://img.shields.io/badge/charts-Apache%20ECharts-AA344D)
![Netlify](https://img.shields.io/badge/deploy-Netlify-00C7B7?logo=netlify&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.9.8-informational)

---

## What it is

A single-file, zero-build dashboard (vanilla JS + Apache ECharts) that pulls the `[AWO] Alpha Wolves` Google Sheet over the gviz API and renders four views:

- **Overview** — march to the clan point goal with a pace line (ahead/behind at a glance), KPI band, and a source-breakdown chart that toggles between **points** and **opens** (they tell very different stories).
- **Leaderboard** — every hunter, sortable, each row carrying a mini quota bar against the per-day requirement. Green = on pace, amber = behind, red = idle.
- **Chests** — every chest source ranked by points contributed, with wasted-open totals (chests opened on zero-point sources).
- **Player** — tap any hunter for a points-attribution chart, pace-vs-quota bar, and their wasted opens.

## How it works

Scores are **recomputed client-side** from `ChestMatrix × Points` rather than trusting the summary tab's `VALUE` column. That keeps the dashboard correct even when the summary leaderboard and the matrix disagree on the player roster, and immune to column drift in the sheet. The summary tab is used only for event dates and the quota/goal constants.

Tabs consumed:

| Tab | Role |
|---|---|
| `[AWO] Alpha Wolves` | event dates, per-day quota, point goal |
| `ChestMatrix` | per-player × per-source chest counts (source of truth) |
| `Points` | per-source point weight (scoring key) |
| `ClanStat` | clan distribution (derived locally, not fetched) |

If the live fetch is blocked (e.g. a preview sandbox, or the sheet temporarily unshared), the page falls back to an **embedded snapshot** and shows an amber banner so it's never mistaken for live data. Deployed, the live fetch always wins.

## Tech stack

- **HTML / CSS / vanilla JS** — no framework, no build step
- **Apache ECharts** (CDN) — charts
- **Google Sheets gviz** — live data source (CSV endpoint)
- **Netlify** — static hosting + auto-deploy from this repo
- **PWA** — installable, `noindex` (private clan tool)

## Local preview

It's a static file — just open `index.html` in a browser. The sheet must be shared **Anyone with the link · Viewer** for the live gviz read to work; otherwise you'll see the embedded snapshot.

## Deploy

Hosted on Netlify, auto-deploying from this repo's default branch. `netlify.toml` sets the publish root, a `noindex` header, and an SPA fallback. Push to the branch → Netlify rebuilds.

## Adding a new cycle (when this hunt ends)

The History view is scaffolded for recurring events. When a cycle closes:

1. Duplicate the Google Sheet (or archive the relevant tab) so its data is frozen.
2. In `index.html`, find `ARCHIVE_SHEETS` near the top of the script and **prepend** the new entry (newest first):
   ```js
   const ARCHIVE_SHEETS = [
     { id: "<archivedSheetId>", label: "Jun 24 – Jul 1" },
     // older cycles…
   ];
   ```
3. Commit and push — cycle-over-cycle comparison turns on automatically once there's history.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). Versioning follows [SemVer](https://semver.org); commits follow [Conventional Commits](https://www.conventionalcommits.org).

## License

[MIT](LICENSE) © 2026 Ryan Breen
