# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.12.0] - 2026-08-28

### Added
- Player modal: might, VIP, hero level, tenure from /members

## [1.11.1] - 2026-08-28

### Added
- Events/Chests tabs now run off /chest-data (real per-source breakdowns)

## [1.11.0] - 2026-08-28

### Changed
- Run off the clan API via Netlify proxy — real penalties, requirement flag, cross-cycle history

## [1.10.0] - 2026-08-03

### Added
- **Ragnarök and Olympus** added to the Events tab. Tracked events: Ragnarök, Dark Omens, Olympus, Rise of the Ancients, Union of Triumph. Hermes' Store counts toward Olympus; Epic Jörmungandr squad, Jörmungandr Shop, and Epic Fenrir squad count toward Ragnarök. Union of Triumph event tab; Briareus → Olympus.
- Event pill labels now translate; event names and their chest sources localized across all 10 languages.

## [1.9.12] - 2026-06-27

### Added
- Translate footer; add chest/event source-name translation engine.

## [1.9.11] - 2026-06-27

### Fixed
- Wire Pack tab to lb.* i18n keys (headers, search, pace note).

## [1.9.10] - 2026-06-27

### Fixed
- Restore lb.* leaderboard translation keys (modal, Pack tab, Events columns).

## [1.9.9] - 2026-06-27

### Fixed
- Fix mobile header overflow: icon-only buttons, single-line countdown.

## [1.9.8] - 2026-06-27

### Added
- Translate remaining UI chrome — tooltips, charts, changelog, errors, aria-labels.

## [1.9.7] - 2026-06-27

### Added
- History tab and player modal translated (10 languages).

## [1.9.6] - 2026-06-27

### Fixed
- Flag-based language switcher; fix mobile header overflow.

## [1.9.5] - 2026-06-27

### Added
- Chests tab translated (10 languages).

## [1.9.4] - 2026-06-27

### Added
- Events tab translated (10 languages).

## [1.9.3] - 2026-06-27

### Added
- German and Dutch — 10 languages.

## [1.9.2] - 2026-06-27

### Added
- Overview tab translated (8 languages).

## [1.9.1] - 2026-06-27

### Added
- Italian and Polish locales.

## [1.9.0] - 2026-06-27

### Added
- Multilingual support (EN/ES/FR/RU/AR/TR) with browser-language detection, a switcher, and Arabic RTL — navigation, header, status, and footer translated; tab content next.

## [1.8.2] - 2026-06-26

### Fixed
- Events page stat cards overflowed on mobile — now collapse to 2 columns.

## [1.8.1] - 2026-06-26

### Changed
- Mobile polish: horizontal-scroll tables and a tighter header on small screens.

## [1.8.0] - 2026-06-26

### Added
- Mobile bottom navigation bar with icons.

## [1.7.0] - 2026-06-26

### Added
- Live "Next sync" countdown to the next data refresh in the header.

## [1.6.1] - 2026-06-26

### Fixed
- Quota labels now read the per-day target from the sheet instead of a hardcoded 4k.

## [1.6.0] - 2026-06-26

### Added
- Installable PWA — service worker, manifest, and an Install button.

## [1.5.0] - 2026-06-26

### Changed
- Auto-refresh now syncs to the ~2h scrape cadence instead of polling every 10 min.

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

[1.12.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.12.0
[1.11.1]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.11.1
[1.11.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.11.0
[1.10.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.10.0
[1.8.2]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.8.2
[1.8.1]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.8.1
[1.8.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.8.0
[1.7.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.7.0
[1.6.1]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.6.1
[1.6.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.6.0
[1.5.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.5.0
[1.4.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.4.0
[1.3.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.3.0
[1.2.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.2.0
[1.1.1]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.1.1
[1.1.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.1.0
[1.0.0]: https://github.com/warbuxx87/awo-main-203/releases/tag/v1.0.0
