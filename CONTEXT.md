# CONTEXT.md — AWO Hunt Tracker (`index.html`)

Reference for anyone (human or agent) editing this repo. Read this before touching `index.html`.

## What this is

A **single-file** dashboard: HTML + CSS + vanilla JavaScript + [Apache ECharts](https://echarts.apache.org/) (CDN). **No build step**, no bundler, no framework. Open `index.html` locally or deploy the repo root as static files (Netlify serves `index.html` from `.` per `netlify.toml`).

Private clan tool: `noindex` in page meta and Netlify `X-Robots-Tag`.

## Data source

Live data comes from a Google Sheet via the **gviz CSV endpoint**:

| Constant | Value |
|---|---|
| `SHEET_ID` | `15p_q4io0lD6Cffv4kLzNw0YbwqB3P3ZfRdQfAUD5Tvw` |
| Summary tab | `[AWO] Alpha Wolves` — event dates, per-day quota, point goal |
| Matrix tab | `ChestMatrix` — per-player × per-source chest counts (**source of truth for scoring**) |
| Points tab | `Points` — per-source point weight |

URL pattern (see `gvizUrl()`):

```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={tabName}
```

The sheet must be shared **Anyone with the link · Viewer** for live fetches to work.

`ClanStat` is listed in `TABS` but **not fetched** — clan distribution is derived locally from the matrix.

## Scoring (client-side)

Scores are **recomputed in the browser**, not read from the summary tab's leaderboard `VALUE` column:

```
player points = Σ (ChestMatrix opens × Points weight)  for each source
```

Flow in `load()`:

1. Fetch (or snapshot) CSV for summary, matrix, points.
2. `parseSummary()` → `{ start, end, updated, perDay, goal }`
3. `parseMatrix()` → `{ sources[], players[] }`
4. `parsePoints()` → `Map(source → weight)`
5. `compute()` → `STATE` (players, clan totals, pace, projection, status)

Per-player **status** (`compute()`):

- **Hunting** — pace ≥ `perDay` (default 4,000 pts/day)
- **Lagging** — has points but pace below quota
- **Idle** — zero points

Overview **pace-line**: gold fill = points banked; chrome notch = where the pack should be by elapsed time; projection = `clanValue / elapsed × totalDays`.

## Summary tab parsing (gviz quirk)

**Critical:** gviz CSV **drops row labels** (`Start`, `End`, `Updated`, etc.). They appear in the Sheets UI but not in the export — column A is often empty and dates arrive **positionally**.

`parseSummary()` therefore:

1. Stops scanning before a row containing `PLAYER` (leaderboard header).
2. Collects cells matching a datetime-with-time regex (skips date-only rows like "Today").
3. Takes the **last three** timestamps as Start, End, Updated (robust to extra date rows).
4. Reads the first two positive numbers **after** the Updated row as `perDay` and `goal`.

Do not revert to label-based `find("Start")` parsing — it silently fails on live gviz and breaks countdown + projection.

## Snapshot fallback

`const SNAPSHOT = { summaryCsv, pointsCsv, matrixCsv }` near the top of the script holds **embedded CSV strings** captured from a real sheet state.

- Live fetch is always tried first (`fetchCsv` on matrix + points, then summary).
- If the network fetch fails entirely, all three tabs fall back to `SNAPSHOT` and `USING_SNAPSHOT = true`.
- An amber banner (`renderBanner()`) warns when snapshot data is shown.

### ⛔ Do not touch these blobs

1. **`SNAPSHOT`** — three large template-literal strings (`summaryCsv`, `pointsCsv`, `matrixCsv`). Never regenerate, reformat, pretty-print, or run bulk find-and-replace across them. A stray backtick or comma breaks the whole script.

2. **ALPHA WOLVES logo** — `<img class="logo" src="data:image/png;base64,...">` in the header. Same rule: never regenerate or reformat the base64 data URI. Edit around it, not inside it.

## Code map (`index.html` script sections)

| Section | Functions / symbols |
|---|---|
| CONFIG | `SHEET_ID`, `TABS`, `ARCHIVE_SHEETS`, `FALLBACK_*`, `REFRESH_MS`, `SNAPSHOT` |
| FETCH + PARSE | `gvizUrl`, `fetchCsv`, `parseCsv`, `parseSummary`, `parseMatrix`, `parsePoints` |
| COMPUTE | `compute()` → `STATE` |
| VIEWS | `viewOverview`, `viewLeaderboard`, `viewChests`, `viewHistory` |
| CHARTS | `renderDist` (gold = points, silver = opens), `renderAttr` |
| MODAL | `openPlayer`, `closePlayer` |
| ROUTER | hash routes: `#overview`, `#leaderboard`, `#chests`, `#history` |
| LOAD | `load()`, 10 min auto-refresh, manual Refresh button |

## Views (hash routing)

| Hash | Label | Purpose |
|---|---|---|
| `#overview` | Overview | Goal hero + pace bar, KPIs, source chart (points/opens toggle), top 5 |
| `#leaderboard` | The Pack | Full sortable table with quota mini-bars |
| `#chests` | Chests | Sources ranked by contribution; wasted opens on 0-pt sources |
| `#history` | History | Scaffold — empty until `ARCHIVE_SHEETS` has entries |

Player rows / names open a **modal** with attribution chart and quota bar.

## Recurring cycles (`ARCHIVE_SHEETS`)

When a hunt ends, prepend to `ARCHIVE_SHEETS` (newest first):

```js
{ id: "<archivedSheetId>", label: "Jun 24 – Jul 1" }
```

History comparison UI is scaffolded; it activates once archives exist.

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

5. **Test live vs snapshot** — deployed site should load without the amber snapshot banner; banner = live gviz was blocked.

## Deploy

Push to `main` → Netlify auto-deploys (~30s). No build command. Publish directory: `.` (root).

## Related files

| File | Role |
|---|---|
| `index.html` | Entire app |
| `netlify.toml` | Publish root, noindex header, SPA fallback |
| `CHANGELOG.md` | Release notes (Keep a Changelog + SemVer) |
| `README.md` | User-facing overview |
