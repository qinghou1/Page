# Qing Hou | Academic personal website

A ready-to-publish personal website for an urban and regional planning job search. Built with plain HTML, CSS, and JavaScript. There is no framework, package installation, build service, account integration, or backend to configure.

## Start here

Open `index.html` in a modern browser after extracting the ZIP. Keep the `assets` folder beside it. For a single-file version, use the separately supplied `Qing_Hou_Personal_Website.html`: its images, styles, scripts, and public CV PDF are embedded.

The site has not been published to a live repository by this delivery.

## Publish on GitHub Pages

1. Create a repository, or back up the existing site before using an existing repository. For a personal account homepage, the repository name is `qinghou1.github.io`. A separate project repository such as `Personal_Website` also works. The account name comes from the GitHub links in the supplied CV; confirm that this is the account you intend to use. For a GitHub Free account, use a public repository.
2. Upload the extracted files and folders to the repository's `main` branch. `index.html` and `assets/` must be at the repository root, not inside an extra enclosing folder. Upload the contents, not the ZIP itself. Keep the empty `.nojekyll` file; if a drag-and-drop upload misses dotfiles, create that empty file in GitHub.
3. Open **Settings → Pages → Build and deployment → Source → Deploy from a branch**. Select **main** and **/(root)**, then **Save**. Check the deployment status and use **Visit site** when it appears.

For a user repository named `qinghou1.github.io`, the intended address is `https://qinghou1.github.io/`. For a repository named `Personal_Website`, the intended address is `https://qinghou1.github.io/Personal_Website/`. These are deployment examples, not claims that either site is currently live.

All internal asset paths are relative, so the same files work at an account root or a project subpath. No GitHub Actions workflow is required for the recommended branch-based setup.

Official documentation, consulted October 13, 2026:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## What's included

```text
index.html                       All website content and project-detail templates
assets/
  css/style.css                  Layout, responsive design, and color variables
  js/app.js                      Navigation, publication search, dialogs, citation copying
  images/                        Ten actual project previews and an SVG favicon
  files/Qing_Hou_CV.pdf           Public-sharing CV, with private contacts omitted
.nojekyll                        Disables Jekyll processing
README.md                        Setup and editing instructions
CONTENT_NOTES.md                  Source provenance and pre-publication checks
QA_REPORT.md                     Browser and content checks
tools/make_self_contained.py      Optional single-file bundler (Python standard library)
```

## Content editing

**General text:** Edit `index.html` in a text editor or GitHub's file editor. The sections have HTML comments marking the introduction, research, publications, teaching, portfolio, service, and about content. Do not change an element's `id` without also updating the matching navigation link.

**Publication records:** Each entry is an `<article class="publication">`. Change its title, author list, venue, link, and `data-citation`. Keep `data-status="published"` for published work/reports and `data-status="review"` for manuscripts in review. `data-selected="true"` controls inclusion in the initial selected view. Use a unique ID when adding an entry. Filter totals are calculated from the articles automatically. Review the date labels in the footer, publication note, results-count text, and `app.js` when updating the academic record.

**Design projects:** A card and its corresponding `<template id="project-...">` contain each project's title, location, date, image paths, two design-approach points, and full-PDF link. Update both when changing a project. The templates supply the popup galleries; full-PDF links also work without JavaScript. Preview images are optimized for the web; linked original portfolio PDFs remain external.

**CV:** Replace `assets/files/Qing_Hou_CV.pdf` with a new public-sharing PDF using the same filename. Review it for private phone numbers and referee details before publication. The copy included here removes the personal phone number and the entire referee contact block from the supplied CV. The source CV has not been uploaded in this package.

**Profile links and email:** Search for `houqing@ufl.edu`, `scholar.google.com`, and `linkedin.com` in `index.html`. Also update the JSON-LD profile metadata in the document head.

**Colors and typography:** Edit the CSS variables at the top of `assets/css/style.css`. The design uses system sans-serif fonts and Georgia, without external font requests or bundled font files.

**Portrait:** The current lead visual is an actual Green Network project rendering, because no professional portrait was supplied. To use a portrait instead, place an image in `assets/images/`, update the hero image path and alt text, and revise the figure caption and overlay text so they describe the portrait rather than the design project. Adjust `.hero-image` object positioning as needed.

**Availability:** Update or remove the “Open to academic & research opportunities” text when the job-market status changes.

## Regenerate the self-contained file after edits

Python 3.9 or newer, with no third-party packages:

```bash
python tools/make_self_contained.py
```

The default output is `Qing_Hou_Personal_Website.html` in the parent folder. A custom path is also supported:

```bash
python tools/make_self_contained.py --output ./Qing_Hou_Standalone.html
```

The script embeds all local images, CSS, JavaScript, and the public CV PDF. Viewing the website and using its search/gallery features does not require an internet connection. Following DOI, Google Scholar, LinkedIn, project-site, or full-portfolio links still requires internet access. Email links open the visitor's configured mail application; there is no contact form or message-storage service.

## Review before making public

Read `CONTENT_NOTES.md`. In particular, confirm degree dates, manuscript statuses and DOI links, the intended institution for the volunteer-research entry, and the rights/credits for the source project images. Records follow the supplied October 12, 2026 CV; they have not been independently verified.

No research results, citation counts, unprovided job-market papers, teaching statements, research statements, or headshots were invented. The site uses selected research themes and presentation text based on the CV rather than repeating every CV entry verbatim. All 19 publications/manuscripts are retained in the searchable list.

## Technical and privacy notes

- No analytics, tracking pixels, cookies, externally hosted libraries, or runtime API calls.
- All visible content is in HTML; JavaScript is a progressive enhancement.
- Keyboard-accessible navigation, native project dialogs, visible focus indicators, a skip link, image alt text, and reduced-motion support.
- No server-side processing is needed. All paths are compatible with GitHub Pages.
- Page title, description, Open Graph text, and Person structured data are supplied. No unconfirmed live address is hardcoded as a canonical URL. Add canonical and absolute social-preview image URLs only after confirming the deployment address.
- `window.print()`/the browser's print command uses a simplified print layout; the dedicated CV download is the recommended application document.
- Full portfolio PDFs and publications remain at the original destinations provided in the CV. External link availability was not independently verified.
- Do not assume that publishing the site grants a license to third-party material in the original design portfolios. Preserve original credits where applicable.
