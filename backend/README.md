# Vanda Sports Wear — Backend (Django REST API + MySQL)

Matches the architecture you specified: `accounts, products, categories,
orders, customization, offers, banners, reviews, contact, dashboard,
media, api, settings` — one Django app per concern, aggregated under `/api/`.

## Quick start (SQLite, zero setup)

```bash
cd backend
python -m venv venv && source venv/bin/activate   # optional but recommended
pip install -r requirements.txt
cp .env.example .env        # USE_SQLITE=True by default — good for trying this out
python manage.py migrate
python manage.py seed_data  # loads categories/products/packages/offers matching the frontend
python manage.py createsuperuser
python manage.py runserver
```

API root: `http://127.0.0.1:8000/api/`
Django admin: `http://127.0.0.1:8000/admin/`

### If category pages look wrong, duplicated, or blank

`seed_data` is safe to re-run — it updates existing rows in place rather
than duplicating them, keyed by name. But if you seeded an **older**
version of this project before (different category/subcategory names or
slugs), the old rows are structurally different content, not just a
rename, so they're left behind as orphaned data rather than merged —
which can cause duplicate categories, slug collisions, or a category
page that can't find what it expects. Fix it with:

```bash
python manage.py seed_data --reset
```

This wipes categories, subcategories, products, packages and offers and
reseeds from scratch. Safe to run any time you want a guaranteed-clean
state — nothing outside those tables is touched (orders, accounts, etc.
are untouched).

## Switching to MySQL (as specified in the architecture)

1. Create the database: `CREATE DATABASE vanda_sports_wear CHARACTER SET utf8mb4;`
2. In `.env`, set `USE_SQLITE=False` and fill in `DB_NAME`, `DB_USER`,
   `DB_PASSWORD`, `DB_HOST`, `DB_PORT`.
3. `python manage.py migrate` again against MySQL.

`mysqlclient` is already in `requirements.txt`. On Debian/Ubuntu you'll
need `sudo apt install pkg-config default-libmysqlclient-dev
build-essential` before `pip install` succeeds (already verified working
in this build's environment).

## Apps → what they do

| App | Purpose |
|---|---|
| `accounts` | User registration, JWT login (`simplejwt`), profile (phone/address) |
| `categories` | `Category` + `Subcategory`, with images and ordering |
| `products` | `Product` + `ProductImage`, filterable by category/subcategory/tag |
| `orders` | Storefront `Order` + `OrderItem` (cart checkout) |
| `customization` | `Package`, `TeamOrder`, `Player` — the jersey customizer backend |
| `offers` | Promo codes shown on the storefront |
| `banners` | Hero banner images/copy for the homepage |
| `reviews` | Product reviews with an approval flag |
| `contact` | Contact form submissions |
| `dashboard` | `/api/dashboard/stats/` — aggregated admin stats (staff-only) |
| `media_manager` | Generic image-upload registry for the admin's "upload/replace/delete" flow |
| `api` | Aggregates every app's router under one `/api/` prefix |

## Key endpoints

```
POST   /api/auth/register/          Create account
POST   /api/auth/login/             Get JWT access + refresh tokens
POST   /api/auth/refresh/           Refresh an access token
GET    /api/auth/me/                Current user + profile

GET    /api/categories/             List categories (with nested subcategories)
GET    /api/products/               List products (?category__slug=, ?search=, ?ordering=)
GET    /api/products/<slug>/        Product detail

GET    /api/packages/               Jersey sublimation packages
POST   /api/team-orders/            Submit a jersey team order (validates min 10 players)
GET    /api/team-orders/            List team orders (admin)

POST   /api/orders/                 Create a storefront order (cart checkout)
GET    /api/orders/                 List your own orders (or all, if staff)

GET    /api/offers/                 Promo codes
GET    /api/banners/                Hero banner content
GET    /api/reviews/?product=<id>   Approved reviews for a product
POST   /api/reviews/                Submit a review

POST   /api/contact-messages/       Submit a contact form
GET    /api/contact-messages/       List messages (admin only)

GET    /api/dashboard/stats/        Revenue/order/customer counts (staff only)
GET    /api/media/                  Uploaded image assets (staff only)
```

All list endpoints are paginated (`?page=`) and support DRF's browsable
API — visit any GET endpoint in a browser while `DEBUG=True` to explore
interactively.

## What's already verified working

Migrations run clean, `seed_data` populates 4 categories / 8 products / 9
jersey packages / 3 offers, JWT login issues tokens, the min-10-players
validation on team orders rejects short rosters and accepts full ones, the
staff-only dashboard stats endpoint correctly 401s when unauthenticated
and returns data when authenticated, and CORS is configured for the
Vite dev server origin (`http://localhost:5173`) — confirmed via a real
preflight + POST from that origin.

## Connecting the frontend

The frontend's `src/services/api.js` already points at
`http://127.0.0.1:8000/api` by default (override with
`VITE_API_BASE_URL` in `frontend/.env`). Three flows are already wired
end-to-end: **Login/Sign-up** (`/auth/login`, `/auth/register`),
**Contact form** (`/contact-messages/`), and **Jersey order submission**
(`/team-orders/`, including the min-10 validation surfaced as a toast).

Everything else in the frontend (categories, products, cart/orders,
admin dashboard tables) currently still runs on the in-memory mock data
in `src/utils/data.js` / `src/context/AppContext.jsx` — the API client
already has functions for all of it (`catalog.categories()`,
`catalog.products()`, `orders.create()`, `admin.stats()`, etc.), it's a
matter of swapping each page's data source from the mock arrays to
these calls, the same pattern used in `ContactPage.jsx` and
`LoginPage.jsx`.
