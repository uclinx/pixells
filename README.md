# PIXELLS — Static Crypto Store UI

A minimal, production-ready static site to showcase 3 products and link to external crypto payments (BTC/LTC). No backend required.

## Files
- `index.html` — Landing/products page
- `success.html` — Informational success page
- `styles.css` — Minimal dark theme
- `assets/logo.svg` — PIXELLS wordmark

## Run locally
- Open `index.html` directly in your browser. No build step.

## Deploy to Render (Static Site)
1. Push this folder to a Git repo (GitHub, GitLab, etc.).
2. In Render, click New > Static Site.
3. Connect your repo and select the branch.
4. Set "Publish Directory" to `./`.
5. Leave build command empty.
6. Deploy.

## Replace payment links
Edit `index.html` and replace the three placeholder `href` values on the product buttons:
- `https://example.com/nowpay-1day`
- `https://example.com/nowpay-5day`
- `https://example.com/nowpay-eldorado`

Buttons already open in a new tab with `target="_blank" rel="noopener"`.

## Customize logo, colors, and email
- Logo: replace `assets/logo.svg` with your own.
- Colors: tweak CSS variables in `styles.css` under `:root` (e.g. `--brand`).
- Contact email: edit the email text in the footer of `index.html` and `success.html`.

## Change success page text/URL
- Text: edit `success.html` copy.
- URL: point your payment provider's return/redirect to `/success.html` or to `/index.html?status=success` (index shows a toast for `?status=success`).

## Notes
- Semantic HTML, responsive layout, accessible focus states.
- No external fonts, scripts, or trackers.
- Pure HTML/CSS/vanilla JS.
