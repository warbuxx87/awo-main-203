# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-06-26

### Added
- In-app changelog — click the version chip in the header to view release notes.

## [1.3.0] - 2026-06-26

### Added
- Events tab: event/monster-chest participation tracking and per-event leaderboards, driven by an editable `EVENT_GROUPS` config.

## [1.2.0] - 2026-06-26

### Added
- Live player search on The Pack tab — filter the leaderboard by hunter name.

## [1.1.1] - 2026-06-26

### Fixed
- **"Hunt ends in" countdown and goal projection never worked on the live site.** gviz returns the summary tab's date rows *without* their labels — "Start / End / Updated" appear in the spreadsheet's web view but not in the CSV export, so the label-based date parser matched nothing and silently fell back to "1 day elapsed." That left the countdown blank and inflated the projection (clan value × 7). The parser now bounds at the `PLAYER` row, takes the last three datetime-with-time cells as Start / End / Updated, and reads the first two positive numbers after Updated as quota and goal (via `num()`, which strips spaces like `4 000` before parseFloat) — independent of labels and column position.

## [1.1.0] - 2026-06-26

Alpha Wolves brand identity.

### Added
- Real **ALPHA WOLVES** wordmark embedded in the header (self-contained data URI); gold wolf favicon and PWA icon.
- Two-metal chart language — **gold = points**, **silver = opens** — mirroring the logo's gold-and-silver lettering.
- Clan voice throughout: status labels **Hunting / Lagging / Idle**, "The Pack" leaderboard, "Wolves move as one." in the footer.

### Changed
- Palette retuned to the brand, sampled from the logo and site: warm near-black `#0A0706`, gold `#CA883C`, silver-chrome `#CBC2B5`, amber wolf-eye accents, with a faint firelight glow.
- Typography moved to **Cinzel** (engraved caps) for headings, labels, and figures and **EB Garamond** for body, matching the site.
- Pace-line signature recoloured to chrome so it reads cleanly against the gold fills.

## [1.0.0] - 2026-06-26

Initial release.

### Added
- Live dashboard reading the `[AWO] Alpha Wolves` Google Sheet via the gviz API — **Overview**, **Leaderboard**, **Chests**, and **History** views.
- Scores **recomputed client-side** from `ChestMatrix × Points`, independent of the summary tab (immune to roster mismatch and column drift).
- Quota compliance against the 4,000-pts/day requirement, per-player points attribution, and wasted-opens analysis.
- Signature **pace-line** progress indicator (clan goal and per-hunter quota), player profile modal with attribution chart.
- Archive scaffolding (`ARCHIVE_SHEETS`) for recurring cycles.
- Embedded snapshot fallback for offline/preview rendering; PWA-installable; `noindex`.

[1.4.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.4.0
[1.3.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.3.0
[1.2.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.2.0
[1.1.1]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.1.1
[1.1.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.1.0
[1.0.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.0.0
