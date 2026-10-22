# harshad.online

Personal site of Harshad Vaghasiya. Plain HTML, CSS and JavaScript with no build step, so it runs as-is on GitHub Pages.

The whole site is one idea: **"9 to 5" and "5 to 9" use the same two digits.**
The landing page swaps them as the sky turns from day to night.

| Side | URL | Theme | What it is |
|---|---|---|---|
| Start | `/` | day → night | Two doors: the day job, or after hours |
| 9 to 5 | `/work/` | day (bone paper, ink, orange sun) | Resume |
| 5 to 9 | `/after-hours/` | night (violet-black, lavender moon) | Projects |
| Project | `/after-hours/project/?p=<id>` | night + project colour | One case study |

The two sides are deliberately separate. The Resume links to the projects only once, at the very bottom ("5:00 PM · Clocking out"), and contains no design work.

---

## Where to edit what

```
content/
  resume.js        ← ALL Resume text (summary, facts, jobs, skills, education, LinkedIn URL)
  projects.js      ← ALL projects: order, text, tags, colours, and the blocks on each project page
assets/
  css/base.css     ← fonts, colour tokens, buttons, shared animations
  css/landing.css  ← start page
  css/work.css     ← Resume page
  css/after.css    ← projects grid
  css/project.css  ← project page
  js/core.js       ← shared helpers: icons, scroll reveals, page transition
  js/landing.js    ← sky colours + digit swap
  js/work.js       ← renders resume.js, live dial, workday scroll dial
  js/after.js      ← renders projects.js grid, filters, hover video, cursor
  js/project.js    ← renders one project
  projects/<id>/   ← images and videos for each project
  files/           ← Harshad-Vaghasiya-Resume.pdf
  fonts/           ← self-hosted fonts (Gloock, Schibsted Grotesk, Martian Mono)
index.html, work/index.html, after-hours/index.html, after-hours/project/index.html
```

### Common changes

- **Change Resume wording** → edit `content/resume.js`. Then regenerate the PDF if the downloadable version should match (see below).
- **Add a project** → put media in `assets/projects/<new-id>/` (at least `cover.webp` and `hero.webp`; those two names are reserved for the tile and the page hero), then add an object to `content/projects.js`. The field list and every block type are documented at the top of that file.
- **Reorder projects** → reorder the objects in `content/projects.js`.
- **Tile shape** → `size: "wide"` (16:10), `""` (6:5) or `"tall"` (4:5). Tiles in the same row always share one height.
- **Colours** → tokens at the top of `assets/css/base.css`. Sky colours for the start page are the three palettes at the top of `assets/js/landing.js`.

### Media guidelines (keeps everything sharp)

- Screens: WebP, about 2400 px wide for desktop shots, about 780 px wide for phone screens.
- Covers: tile shape at 1.5× (e.g. 2400×1500 for wide). `hero.webp` is 16:9 (2880×1620).
- Video: H.264 MP4, 1920 px wide, muted. Short `tile.mp4` (about 1280 px, under 10 s) plays on hover in the grid.

### Rules kept on purpose

- No phone number or email anywhere. LinkedIn is the only contact.
- The file-generation result appears as "~80%", and only in the Experience section.
- Brand-name projects made for open briefs are tagged **Open brief** and carry an ownership note. Fictional brands are tagged **Concept**.

---

## Deploying on GitHub Pages with harshad.online

1. Create a repository (for example `harshad.online`) and upload everything in this folder, keeping the structure.
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The `CNAME` file already contains `harshad.online`.
4. At your domain registrar, add DNS records:
   - `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` pointing to `<your-github-username>.github.io`
5. Back in **Settings → Pages**, wait for the DNS check to pass, then tick **Enforce HTTPS**.

`.nojekyll` is included so GitHub serves every file exactly as it is.

## Previewing locally

Any static server works, for example `python3 -m http.server` in this folder, then open http://localhost:8000.
Opening `index.html` directly from the file system also works.

## v2 notes
- All times on the site are 12-hour (helper `HV.t12()` in `assets/js/core.js`).
- Courses: Resume side → `learning` in `content/resume.js` (shown under Education and in the PDF).
  Projects side → `window.DESIGN_LEARNING` at the bottom of `content/projects.js` (shown before "Say hello").
- New project block type `compare` (today's apps vs this design) — see the field list at the top of `content/projects.js`.
- PDF source: regenerate after changing `content/resume.js` so the download matches the page.
