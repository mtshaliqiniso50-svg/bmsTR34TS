# BMS Treats — Website

Small Cups. Big Happiness.

## What this is

A 5-page, mobile-first website for BMS Treats: Home, Our Treats, About Us,
Retail Partners, Contact. Plain HTML, CSS and JavaScript — no build tools,
no framework required. Product cards, the product detail view, and the
retail enquiry form are all wired up and working.

## Project structure

```
bms-treats/
  index.html      Home
  treats.html     Our Treats (product grid + detail modal)
  about.html      About Us
  retail.html     Retail Partners (enquiry form)
  contact.html    Contact
  css/style.css   All styling
  js/main.js      Product data, modal, nav, form logic
  images/         Put real product photos here (see below)
```

## Running it locally

No installation needed. Two options:

1. **Just open it.** Double-click `index.html` — it works in any browser.
2. **Local server (recommended, avoids some browser quirks):**
   ```
   cd bms-treats
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Adding your real product photos

Every image is currently a labelled placeholder (dashed border, e.g.
"Photo: Chocolate Cup") — no stock photography or invented images were used.

1. Add your photos to `images/`, e.g. `images/cup-chocolate.jpg`.
2. In `js/main.js`, find the `PRODUCTS` array and swap each product's
   `photoLabel` line for an actual `<img>` — or simpler, replace the
   `.photo-frame` divs in the generated card/modal HTML with
   `<img src="images/cup-chocolate.jpg" alt="Chocolate dessert cup">`.
3. Do the same for the hero and About page placeholders directly in
   `index.html` / `about.html`.

## Editing content

- **Products** (name, description, flavour, packaging, storage): edit the
  `PRODUCTS` array at the top of `js/main.js`. Every card and detail popup
  is generated from this one list.
- **WhatsApp number**: change `WHATSAPP_NUMBER` once at the top of
  `js/main.js` — every WhatsApp button on the site updates automatically.
- **Text/copy**: edit directly in the relevant `.html` file.
- **Colours/fonts**: edit the `:root` variables at the top of `css/style.css`.

## The retail enquiry form

The form on `retail.html` currently builds a pre-filled WhatsApp message
from what the store manager types in, and opens WhatsApp to send it. This
was the honest choice for a static site with no backend or email address
to send to yet.

When you're ready to also collect these as proper leads (e.g. into an
email inbox or spreadsheet), the cleanest upgrade is a hosted form
endpoint — no backend code required:

- [Formspree](https://formspree.io) or [Getform](https://getform.io) — free tier, just point the form's `action` at the URL they give you
- **Netlify Forms** — if you deploy on Netlify, add `netlify` as a form attribute and it handles submissions for you

## Deploying it online

Any of these work with this project as-is (no build step):

**Netlify (easiest)**
1. Create a free account at [netlify.com](https://netlify.com)
2. Drag the `bms-treats` folder onto the Netlify dashboard
3. You get a live URL immediately; add a custom domain later if you get one

**GitHub Pages**
1. Push this folder to a GitHub repository
2. Repo Settings → Pages → set source to the `main` branch, root folder
3. Your site is live at `https://<username>.github.io/<repo-name>`

**Vercel**
1. Create a free account at [vercel.com](https://vercel.com)
2. Import the folder/repo — no configuration needed for a static site

## Growing the site later

This MVP is deliberately simple so it ships fast and you can maintain it
alone. When you're ready for the features listed in the brief — online
ordering, payments, accounts, an admin dashboard, inventory — you'll need
a backend and a database, which plain HTML/CSS/JS can't provide alone.
A sensible path when that day comes:

1. **Rebuild the frontend in Next.js (React)** — keeps the same pages and
   design, but lets you add server logic and dynamic data in the same project.
2. **Add a backend + database** — Node.js/Express or Next.js API routes,
   with Postgres (e.g. via Supabase, which also gives you auth for
   customer/retailer accounts for free).
3. **Add payments** — Stripe or Yoco (South African, supports local cards)
   once online ordering is in place.
4. **Admin dashboard** — a simple authenticated `/admin` section for
   managing products, orders and retail enquiries.

Migrate one feature at a time rather than rebuilding everything at once —
the current site can keep running while you build the next layer behind it.
