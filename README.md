# [AWO] Alpha Wolves — Hunt Tracker

Live analytics dashboard for the **Alpha Wolves** Total Battle clan. Reads clan aggregates in real time and surfaces quota compliance, points attribution, penalties, and chest efficiency at a glance.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![ECharts](https://img.shields.io/badge/charts-Apache%20ECharts-AA344D)
![Netlify](https://img.shields.io/badge/deploy-Netlify-00C7B7?logo=netlify&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.12.2-informational)

---

## What it is

A single-file, zero-build dashboard (vanilla JS + Apache ECharts) that pulls clan aggregates through a Netlify `/api/clan` proxy and renders four views:

- **Overview** — march to the clan point goal with a pace line (ahead/behind at a glance), KPI band, and a source-breakdown chart that toggles between **points** and **opens** (they tell very different stories).
- **Leaderboard** — every hunter, sortable, each row carrying a mini quota bar against the per-day requirement. Green = on pace, amber = behind, red = idle.
- **Chests** — every chest source ranked by points contributed, with wasted-open totals (chests opened on zero-point sources).
- **Player** — tap any hunter for a points-attribution chart, pace-vs-quota bar, and their wasted opens.

## How it works

Scores, penalties, and the per-hunter requirement flag come from the **clan API** (`/api/clan?endpoint=aggregates`). Per-source chest breakdowns for Events, Chests, the overview chart, and player attribution come from `/api/clan?endpoint=chest-data` (fetched one day at a time). The clan point goal is `PER_MEMBER_GOAL` × current members (3,630 this cycle); the per-hunter daily pace display still uses `PER_DAY`. Cycle dates, roster, and cross-cycle history come from the aggregates payload. The dashboard auto-refreshes every 30 minutes.

If the live fetch fails, the boot screen shows the error. Deployed on Netlify, the function reads `TBCP_API_KEY` from site env (not in the repo).

## Tech stack

- **HTML / CSS / vanilla JS** — no framework, no build step
- **Apache ECharts** (CDN) — charts
- **Netlify Functions** — `/api/clan` proxy to the clan portal API
- **Netlify** — static hosting + auto-deploy from this repo
- **PWA** — installable, `noindex` (private clan tool)

## Local preview

It's a static file — just open `index.html` in a browser. Live data needs the Netlify `/api/clan` proxy (and `TBCP_API_KEY` on the site), so a local file open will not reach the clan API.

## Deploy

Hosted on Netlify, auto-deploying from this repo's default branch. `netlify.toml` sets the publish root, a `noindex` header, and an SPA fallback. Push to the branch → Netlify rebuilds.

## Cycle history

Past cycles come from the clan API payload (every `cycle_start` except the current one). The History tab lists them automatically — no sheet archive list to maintain.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). Versioning follows [SemVer](https://semver.org); commits follow [Conventional Commits](https://www.conventionalcommits.org).

## License

[MIT](LICENSE) © 2026 Ryan Breen
