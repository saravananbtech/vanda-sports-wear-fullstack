# Vanda Sports Wear — Frontend (React)

React (Vite) storefront + admin dashboard, built from your original
single-file HTML mockup. See the root `README.md` for running this
alongside the Django backend.

## Running standalone (mock data only, no backend needed)

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
```

Without the backend running, everything works off in-memory mock data —
only the Login page, Contact page, and Customize Jersey → Place Order
button will show a "could not reach backend" toast, since those three
are wired to real API calls.

## Pages

**Storefront:** Home · Category → Subcategory → Product listing → Product
Details · Cart → Checkout → Payment → Order Success · Wishlist · Contact
· Login/Sign-up · Customize Jersey (package grid, team/player forms,
live order summary).

**Admin (`/admin`):** Dashboard, Categories, Products, Homepage & Offers,
Orders, Jersey Orders, Customers, Reviews, Contact Messages, Reports,
Settings.

## Structure

- `src/utils/data.js` — mock content (products, categories, packages,
  testimonials, admin table seed data).
- `src/context/AppContext.jsx` — cart, wishlist, toast, and the
  admin-editable in-memory "CMS" state.
- `src/services/api.js` — the Django API client. Has a function for
  every backend endpoint; only auth/contact/team-orders are wired into
  pages so far (see root README).
- `src/hooks/` — `usePlayers`, `useReveal`, `useCountUp`, `useCountdown`.
- `src/components/` — `navbar`, `footer`, `hero`, `cards`, `products`,
  `forms`, `admin`, `common`.
- `src/pages/` — every routed page; `src/pages/admin/` — dashboard
  screens.
- `src/routes/AppRoutes.jsx` — all routes, including nested `/admin/*`.
- `src/styles/globals.css` — the black/gold visual design.

## Env

Copy `.env.example` to `.env` to point at a non-default backend URL:

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Deploying: the one thing that will bite you

This is a client-side-routed app (React Router). Clicking around inside
the app always works, because the browser never makes a fresh server
request — React just swaps what's rendered. But if someone **lands
directly** on a route that isn't `/` — a shared link, a bookmark, hitting
refresh on `/category/tshirts`, or a search engine crawling it — the
*browser* makes a real HTTP request for that exact path. A plain static
file server has no file at `/category/tshirts`, so it 404s, and the page
looks blank or broken even though nothing in the app is wrong.

**The fix: your server or host must serve `index.html` for any unknown
path**, so React Router can take over client-side. This repo already
includes the config for the common options:

- **Vercel** — `vercel.json` (already set up, just deploy the `frontend/` folder)
- **Netlify** — `public/_redirects` (already set up)
- **Docker / nginx** — `nginx.conf` has `try_files $uri /index.html;` built in
- **GitHub Pages** — has no server-side rewrite support; needs the
  [404.html SPA redirect trick](https://github.com/rafgraph/spa-github-pages) if you go that route
- **Any other static host** (S3, plain nginx/Apache, etc.) — look for
  "SPA fallback" or "rewrite all routes to index.html" in that host's docs

**Testing this locally before you deploy:** `npm run dev` and
`npm run build && npm run preview` both already handle this correctly —
if it works locally with `npm run preview` but breaks once deployed,
it's this issue, on your host.

If something still looks blank after all that, an error boundary now
wraps the whole app — instead of a silent blank page, you'll see an
actual error message on screen, and the full error/stack trace in the
browser console (F12 → Console tab).
