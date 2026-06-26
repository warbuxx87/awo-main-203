# AWO Hunt Tracker — Cursor + GitHub + Netlify setup

Same workflow as the GoD repo. Files are already scaffolded — this just wires up Git sync and deploy.

**Repo name (suggested):** `awo-hunt-tracker` · **Netlify subdomain (suggested):** `awo-hunt-tracker.netlify.app`
Swap both for whatever you like; if you change the subdomain, no code change is needed (nothing hardcodes the URL).

---

## 1 · Get the files into a folder

Drop these into a new folder named `awo-hunt-tracker`:

```
awo-hunt-tracker/
├─ index.html
├─ README.md
├─ LICENSE
├─ netlify.toml
└─ .gitignore
```

Then in Cursor: **File → Open Folder…** → pick that folder.

---

## 2 · Sync to GitHub (private)

**Easiest — Cursor's built-in publish:**

1. Source Control panel (the branch icon, or `Cmd/Ctrl+Shift+G`).
2. **Initialize Repository** → stage all → commit message: `feat: initial AWO hunt tracker` → commit.
3. **Publish Branch** → choose **Publish to GitHub** → **Private** → owner `warbuxx87` → name `awo-hunt-tracker`.

That's the GitHub sync done. From now on, every commit + push from Cursor updates the repo.

**Or, if you'd rather have the Cursor agent do it via terminal** — paste this into Cursor chat (needs the `gh` CLI signed in):

```
In this folder, set up Git and push to a new PRIVATE GitHub repo under warbuxx87.
Run, showing me each command's output:
  git init
  git add -A
  git commit -m "feat: initial AWO hunt tracker"
  git branch -M main
  gh repo create warbuxx87/awo-hunt-tracker --private --source=. --remote=origin --push
If gh isn't installed or authed, stop and tell me instead of guessing — don't create a public repo.
Do not modify index.html.
```

---

## 3 · Connect Netlify (auto-deploy)

1. Netlify → **Add new site → Import an existing project → GitHub** → authorize → pick `warbuxx87/awo-hunt-tracker`.
2. Build settings: **build command** empty, **publish directory** `.` (root). `netlify.toml` already sets this — just confirm and deploy.
3. After first deploy: **Site configuration → Change site name** → `awo-hunt-tracker`.

Done. Every push to `main` now auto-deploys.

---

## 4 · Day-to-day

Edit in Cursor → commit → push → Netlify rebuilds in ~30s. No build step, it just serves `index.html`.

**One guardrail from the GoD project:** don't let an AI agent do blind find-and-replace across `index.html` — the big embedded data string and the template literals are easy to corrupt. For surgical edits, point the agent at a specific function and have it show the diff before committing.

---

## Pre-flight checklist

- [ ] Sheet shared **Anyone with the link · Viewer** (gviz needs this for live reads)
- [ ] Repo is **Private**
- [ ] Netlify publish dir `.`, build command empty
- [ ] Live site loads without the amber "snapshot" banner (banner = live fetch was blocked)
