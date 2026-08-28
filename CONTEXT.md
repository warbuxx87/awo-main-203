# CONTEXT.md — AWO Hunt Tracker (`index.html`)

Reference for anyone (human or agent) editing this repo. Read this before touching `index.html`.

## What this is

A **single-file** dashboard: HTML + CSS + vanilla JavaScript + [Apache ECharts](https://echarts.apache.org/) (CDN). **No build step**, no bundler, no framework. Open `index.html` locally or deploy the repo root as static files (Netlify serves `index.html` from `.` per `netlify.toml`).

Private clan tool: `noindex` in page meta and Netlify `X-Robots-Tag`.

## Data source

Live data comes from the **clan API** via the Netlify function at `/api/clan` (`netlify/functions/clan.js`). The dashboard fetches:

```
/api/clan?endpoint=aggregates
```

`TBCP_API_KEY` is a Netlify env var — never commit it. Goal and per-hunter quota are page constants (`CLAN_GOAL`, `PER_DAY`); they are not in the API.

Flow in `load()`:

1. `fetch("/api/clan?endpoint=aggregates")` — authoritative player totals
2. `buildState(payload, { goal, perDay })` → `STATE`
3. Per-day `fetch("/api/clan?endpoint=chest-data&from=&to=")` (parallel, under the 10k-row cap) → `mergeChestData()` replaces coarse Crypt/Citadel/Epic sources with real per-source breakdowns for Events, Chests, overview chart, and modal attribution
4. `fetch("/api/clan?endpoint=members&include_former=true")` → `mergeMembers()` (might, VIP, hero, tenure on the player modal; failure is ignored)

Auto-refresh is every 30 minutes.

Per-player **status** (`buildState()`):

- **Hunting** — `requirement_met`
- **Lagging** — has points but requirement not met
- **Idle** — zero points

Overview **pace-line**: gold fill = points banked; chrome notch = where the pack should be by elapsed time; projection = `clanValue / elapsed × totalDays`.

## Snapshot fallback

`const SNAPSHOT` and the gviz parsers are still in `index.html` but **`load()` no longer uses them**. Live fetch is the clan API; failure shows the boot error screen.

### ⛔ Do not touch these blobs

1. **`SNAPSHOT`** — three large template-literal strings (`summaryCsv`, `pointsCsv`, `matrixCsv`). Never regenerate, reformat, pretty-print, or run bulk find-and-replace across them. A stray backtick or comma breaks the whole script.

2. **ALPHA WOLVES logo** — `<img class="logo" src="data:image/png;base64,...">` in the header. Same rule: never regenerate or reformat the base64 data URI. Edit around it, not inside it.

## Code map (`index.html` script sections)

| Section | Functions / symbols |
|---|---|
| CONFIG | `CLAN_GOAL`, `PER_DAY`, `EVENT_GROUPS`, `CHANGELOG`, `SNAPSHOT` |
| STATE | `buildState()` → `STATE` |
| VIEWS | `viewOverview`, `viewLeaderboard`, `viewEvents`, `viewChests`, `viewHistory` |
| CHARTS | `renderDist` (gold = points, silver = opens), `renderAttr` |
| MODAL | `openPlayer`, `closePlayer` |
| ROUTER | hash routes: `#overview`, `#leaderboard`, `#events`, `#chests`, `#history` |
| LOAD | `load()` → `/api/clan?endpoint=aggregates` |

## Views (hash routing)

| Hash | Label | Purpose |
|---|---|---|
| `#overview` | Overview | Goal hero + pace bar, KPIs, source chart (points/opens toggle), top 5 |
| `#leaderboard` | The Pack | Full sortable table with quota mini-bars |
| `#chests` | Chests | Crypt / Citadel / Epic ranked by contribution |
| `#history` | History | Prior cycles from the API payload |

Player rows / names open a **modal** with attribution chart and quota bar.

## CSS / brand notes

- Palette: gold-on-black (`#0A0706`, `#CA883C`, `#CBC2B5` chrome pace-line).
- Fonts: **Cinzel** (headings/UI), **EB Garamond** (body) — loaded from Google Fonts.
- JS chart colors reference hex values directly in ECharts options as well as CSS vars.

## Editing rules

1. **Surgical edits only** — change the specific function or block you mean to change. Do not reformat the whole file.

2. **Never bulk replace** across `index.html` — especially inside `SNAPSHOT` template literals, the logo data URI, or strings that contain backticks.

3. **After ANY edit to `index.html`**, verify the inline script parses before committing:

   ```bash
   node --check <(sed -n '/^<script>$/,/^<\/script>$/p' index.html | sed '1d;$d')
   ```

   Exit code 0 = syntax OK. Fix errors before commit.

4. **Do not bump a version inside `index.html`** — there is no in-file version constant. Version lives in `CHANGELOG.md`, README badge, and git tags.

5. **Test live vs proxy** — deployed site should load via `/api/clan`; boot error = function missing, env key unset, or upstream failure.

## Deploy

Push to `main` → Netlify auto-deploys (~30s). No build command. Publish directory: `.` (root).

## Related files

| File | Role |
|---|---|
| `index.html` | Entire app |
| `netlify/functions/clan.js` | Clan API proxy (`/api/clan`) |
| `netlify.toml` | Publish root, noindex header, SPA fallback, API rewrite |
| `CHANGELOG.md` | Release notes (Keep a Changelog + SemVer) |
| `README.md` | User-facing overview |
