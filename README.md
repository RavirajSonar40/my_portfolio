# Raviraj Sonar — portfolio

This is a dependency-light, single-page portfolio implementation for Raviraj Sonar. It uses semantic HTML, responsive CSS, and a small progressive-enhancement layer for scroll reveals, pointer ambience, and magnetic CTA motion. It is a static site and does not require a framework build step.

## Run locally

Open `index.html` directly, or serve the folder with any static server:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173`.

The resume PDF is copied into the project root as `Raviraj_Sonar_RESUME_FINAL.pdf` so both resume CTAs work without an external dependency.

## Deploy on Vercel

Import the GitHub repository in Vercel and use these project settings:

- Framework preset: Other
- Root directory: `.`
- Build command: leave empty
- Output directory: `.`
- Install command: leave empty

`vercel.json` sets clean URLs and basic response headers. Every required site asset, including the résumé PDF, is in this folder.
