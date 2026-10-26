# The Joy of Working

A responsive, static editorial website for Sharda Mohammed. Built with semantic HTML, CSS, and a small amount of vanilla JavaScript. No runtime dependencies, analytics, cookies, or backend.

## Run and build

Use Node.js 22 (the version used by GitHub Actions). No package installation is necessary.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173/thejoyofworking/. Rebuild and refresh after editing. The production artifact is `dist/`; it is generated and ignored by Git. If an older local Node/npm pairing reports a compatibility warning, use Node 22; the scripts can also run directly with `node scripts/build.mjs`, `node scripts/check.mjs`, and `node scripts/serve.mjs`.

## Edit the copy and design

- `index.html`: all page copy, headings, FAQ answers, and form labels. The supplied opening, approach, service, keynote, biography, and FAQ copy is preserved. Development advice from the source document is excluded.
- `styles.css`: palette, typography, layout, responsive breakpoints, and reduced-motion support.
- `app.js`: mobile menu, service-interest selection, keynote inquiry prefill, and the guard against unconfigured form submissions.
- `site.config.mjs`: canonical site URL, image configuration, and contact destination. Template values are resolved at build time, so images and content also work without JavaScript.

All local asset URLs are relative and all navigation uses section fragments. This supports the GitHub Pages project path `/thejoyofworking/`. Change `site.url` if a custom domain is added; this updates canonical metadata, sitemap, and social URLs.

## Replace demo images

The two stock photos are illustrations of working life, not photographs of Sharda or her clients. Captions identify them as demo photography. The biography uses an original, abstract SM monogram labeled as a portrait placeholder.

1. Add optimized, permission-cleared WebP or JPEG photographs to `assets/images/` with clear names.
2. Change the relevant `src`, `alt`, `caption`, `width`, and `height` in `site.config.mjs`. Set dimensions to the actual image dimensions. Update the caption to accurately describe the real photograph and remove its demo/placeholder wording only when appropriate.
3. For a real portrait, use `sharda-portrait.webp` and alt text such as “Sharda Mohammed.” The portrait area uses a 4:5 composition. Adjust `object-position` in CSS if needed.
4. Rebuild and inspect mobile and desktop crops. Image sources and licenses are in `ASSET-SOURCES.md`.

`assets/social-card.png` is a locally generated 1200×630 sharing image. To regenerate it, install Pillow in a temporary Python environment and run `python scripts/social-card.py`; Pillow is not required to build or serve the site.

## Configure contact delivery

**Delivery is intentionally unconfigured.** The page explains that the form cannot send messages, the submit button is disabled, and JavaScript also prevents submission without an endpoint. No inquiry is stored locally and no success message is fabricated. The service buttons still select the relevant interest; the keynote button supplies a starting message only if the message is empty.

1. Create and verify a form with your chosen static-form provider (for example, Formspree) and verify the recipient account there.
2. Set `contactEndpoint` in `site.config.mjs` to the provider's verified public HTTPS form endpoint. Use a provider that supports standard HTML `POST` submissions with fields named `name`, `email`, `organization`, `interest`, `message`, and `timing`.
3. Configure allowed origins, spam protection, notification destination, and the provider's confirmation/error page. Do not put private API keys in this repository.
4. Rebuild. A configured endpoint enables the button and changes the notice. Submission navigates to the provider, which handles the true success or error response; this site does not infer success.
5. Send a real test inquiry and verify receipt before announcing availability. Add appropriate privacy information for the chosen provider and actual data practices.

## Publish and redeploy

The workflow `.github/workflows/deploy.yml` builds, checks, uploads `dist/`, and deploys with GitHub Pages on every push to `main`. It can also be run manually from Actions. It uses `contents: read`, `pages: write`, and `id-token: write`.

The repository is public with the owner's authorization, and GitHub Pages uses **GitHub Actions** as its build source. HTTPS is enforced.

Production URL: https://ssmkconsulting.github.io/thejoyofworking/

To redeploy:

1. Build and check locally, then commit and push the changes to `main`.
2. Open **Actions → Deploy to GitHub Pages** and wait for both build and deploy jobs to succeed. You can also choose **Run workflow** on `main` to redeploy manually.
3. Open the production URL and check styles, images, navigation, and contact behavior.

## Verification

`npm run check` validates all section links, unique IDs, local assets, image metadata, labeled form controls, all four FAQs, service-interest values, canonical metadata, and the disabled unconfigured form. Use a browser to check responsive layouts and keyboard interaction. See `VERIFICATION.md` for the implementation verification record.
