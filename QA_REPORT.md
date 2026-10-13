# Quality checks

Prepared October 13, 2026.

## Browser checks

The self-contained site was rendered in Chromium using its complete embedded HTML. Local URL navigation was restricted in the authoring environment, so testing used direct HTML loading rather than a live deployment. The GitHub Pages package contains the same HTML, stylesheet, script, and assets as the tested bundled file; relative paths are separately checked. No claim of a deployed-site test is made.

- No JavaScript errors in the tested browser.
- Viewport widths checked: 320, 360, 390, 768, 820, 1024, 1440, and 1920 pixels.
- No horizontal page overflow or broken image loads at those widths.
- Publication views: 5 selected; 6 published works/reports; 13 manuscripts in review; 19 total.
- Search, no-results state, and the doctoral-manuscript shortcut were exercised.
- All five portfolio dialogs opened; both images loaded; Escape closed the dialog and returned focus to the opener.
- Mobile navigation opened and closed, and section links were exercised.
- Research-detail disclosures were tested.
- With JavaScript disabled, all 19 publications and all five portfolio PDF links remain available.
- The standalone page made no external network requests to render or operate the tested interactions.
- Citation copying was exercised and returned the confirmed “Copied” state.
- The embedded CV was downloaded in Chromium; its filename and bytes matched the public CV PDF in the ZIP.
- The public CV was rendered and visually inspected. Personal phone and referee contact information were removed.

These are functional and visual checks, not a formal WCAG certification or testing in every browser. DOI links, publication metadata, degree status, and external portfolio URLs were copied from the supplied CV, not independently verified.
