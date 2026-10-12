# Vanda Sports Wear — Full Stack (React + Django)

Your original single-file HTML mockup, rebuilt as the full project from
your architecture plan: a React frontend and a Django REST + MySQL
backend, in the folder structure you specified.

```
vanda-sports-wear/
├── frontend/   React (Vite) — storefront + admin dashboard
└── backend/    Django REST Framework + MySQL (or SQLite for quick start)
```

## Run both together

**Backend** (from `backend/`):
```bash
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver          # http://127.0.0.1:8000
```

**Frontend** (from `frontend/`, in a second terminal):
```bash
npm install
cp .env.example .env                # points at the backend above
npm run dev                          # http://localhost:5173
```

See `frontend/README.md` and `backend/README.md` for full details on
each half — pages/components on the frontend side, apps/endpoints on the
backend side.

## What's connected right now

- **Login / Sign-up** → real JWT auth (`/api/auth/...`)
- **Contact form** → real `ContactMessage` rows (`/api/contact-messages/`)
- **Customize Jersey → Place Order** → real `TeamOrder` + `Player` rows
  (`/api/team-orders/`), including the min-10-players validation
  enforced server-side

## What's still mock data on the frontend

Categories, products, cart/checkout, and the admin dashboard tables
currently run on in-memory data (`frontend/src/utils/data.js` /
`AppContext.jsx`) rather than calling the backend. The backend already
has working endpoints for all of it (`GET /api/categories/`,
`GET /api/products/`, `POST /api/orders/`, `GET /api/dashboard/stats/`,
etc.) and the frontend's `src/services/api.js` already has functions
ready to call them — wiring each page over follows the same pattern
used in `ContactPage.jsx`, `LoginPage.jsx`, and `CustomizeJersey.jsx`.
Say the word if you'd like that finished next.
