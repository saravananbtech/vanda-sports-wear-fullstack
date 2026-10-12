# Git & Deployment Readiness Guide

This covers what's been added to make this folder a proper git repo, and
the realistic path from here to a live product.

## 1. What's been added (no app code touched)

```
vanda-sports-wear/
├── .gitignore                  # root-level ignores (OS files, env files)
├── .env.example                # docker-compose variables
├── docker-compose.yml          # backend + frontend + MySQL, wired together
├── .github/workflows/ci.yml    # sanity-checks build + migrations on every push
├── backend/
│   ├── .gitignore              # venv, __pycache__, db.sqlite3, media, .env
│   ├── .dockerignore
│   └── Dockerfile              # gunicorn-served production image
└── frontend/
    ├── .gitignore              # node_modules, dist, .env
    ├── .dockerignore
    ├── Dockerfile              # multi-stage build, served by nginx
    └── nginx.conf              # SPA routing + gzip + asset caching
```

Also added: `GET /healthz/` on the backend — a plain `{"status": "ok"}`
endpoint most hosts (Docker, Kubernetes, Render, Railway, etc.) use to
know your app is alive.

## 2. Turn this folder into a git repo

```bash
cd vanda-sports-wear
git init
git add .
git commit -m "Initial commit: React frontend + Django REST backend"
```

Sanity check before your first push — confirm nothing sensitive is staged:
```bash
git status                 # .env files should NOT appear (gitignored)
git ls-files | grep .env   # should only show .env.example files
```

Push to GitHub/GitLab:
```bash
git remote add origin https://github.com/<you>/vanda-sports-wear.git
git branch -M main
git push -u origin main
```

### Suggested branching model
- `main` — always deployable
- `develop` — integration branch (optional, if you're not solo)
- `feature/<name>` — one branch per feature, PR into `develop`/`main`

## 3. Try the full stack via Docker (optional, but this is your production shape)

```bash
cp .env.example .env    # edit DB password, SECRET_KEY, etc.
docker compose up --build
```
This brings up MySQL + the Django API (gunicorn) + the React app (nginx)
together — the same topology you'd run in production, just on your own
machine. Note: Docker wasn't available in the sandbox this was built in,
so the Dockerfiles are written carefully but not build-tested — run this
locally first and flag anything that needs adjusting.

After the containers are up, seed data once:
```bash
docker compose exec backend python manage.py seed_data
docker compose exec backend python manage.py createsuperuser
```

## 4. Before it's actually "live"

These are things this build deliberately left as placeholders/TODOs —
worth closing before real customers hit it:

- **Rotate `SECRET_KEY`** — generate a real one (`python -c "import secrets; print(secrets.token_urlsafe(50))"`), never reuse the dev default.
- **`DEBUG=False`** in any production environment — leaking Django's debug
  page in prod exposes source paths and settings.
- **Admin route protection** — as flagged in the earlier audit, `/admin`
  on the frontend currently has no auth guard. Fix before going live.
- **`ALLOWED_HOSTS` / `CORS_ALLOWED_ORIGINS`** — set to your real domain(s),
  not `localhost`.
- **HTTPS** — put the stack behind a reverse proxy/load balancer with TLS
  (Caddy, nginx + certbot, or your host's managed TLS) before exposing it
  publicly.
- **Managed MySQL + object storage** — the `media_data` Docker volume is
  fine for testing; for real traffic use a managed DB (RDS, PlanetScale,
  etc.) and object storage (S3/Cloudinary) for uploaded images instead of
  local disk.

## 5. Realistic hosting options once you're ready

- **Simplest split hosting:** frontend on Vercel/Netlify (point it at
  `frontend/`, build command `npm run build`), backend + MySQL on
  Railway/Render (they both support Django + managed MySQL directly).
- **Single VPS:** `docker compose up -d` on a DigitalOcean/Hetzner/EC2
  box, with Caddy or nginx in front for TLS — the `docker-compose.yml`
  here is already shaped for this.
- **CI/CD:** the `.github/workflows/ci.yml` added here only checks that
  the app builds and migrates — extend it with a deploy step (e.g.
  `railway up`, or SSH + `docker compose pull && up -d`) once you've
  picked a host.
