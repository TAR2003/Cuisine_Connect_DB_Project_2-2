# Cuisine Connect

Cuisine Connect is a course project for a social food network: customers, restaurants, and foodie pages share posts, and customers order from restaurant menus. The private deployment is one Node process and the current SvelteKit interface, both talking to Oracle.

## What you need

- Node.js 18
- An Oracle database you are allowed to rebuild. The scripts in `database/rebuild/` drop tables. Do not point them at a database you need to keep.
- The Oracle password that used to be stored in this repository is public. Rotate it before you connect. This repository does not contain the new password.

## Configure

```text
cd backend
copy .env.example .env
```

Set `ORACLE_USER`, `ORACLE_PASSWORD`, and `ORACLE_CONNECT_STRING`. `PORT` defaults to 3001. `SEED_PASSWORD` is used only by `database/rebuild/seed.js` and is never written into SQL. Leave `COOKIE_SECURE` false for local HTTP. The server exits before it listens if an Oracle variable is missing.

## Install and run for development

```text
cd backend
npm install
node server.js
```

In another terminal:

```text
cd frontend
npm install
npm run dev
```

Vite serves the interface and proxies `/api`, `/uploads`, `/save-data`, `/addpostwithpicture`, and `/addreviewpostwithpicture` to port 3001. The session cookie is first-party because the browser talks only to the Vite origin.

## One process

```text
cd frontend
npm run build
cd ../backend
node server.js
```

When `frontend/build` exists, Express serves that static app and the API on `PORT`. The SvelteKit build is a client-side app (`ssr` is off, with an `index.html` fallback).

## Schema

`database/rebuild/ORDER.md` lists the destructive scripts in order: drop, tables, indexes, sequences, routines, then `node seed.js`. Seed inserts one admin, one customer, one restaurant, and one menu, using a bcrypt hash of `SEED_PASSWORD`. If Oracle is not configured, the seed step does not connect.

`database/scratch/` holds old notes. Those files are not installers.

## Sign-in

`POST /api/login` checks a bcrypt password and sets an httpOnly `cc.sid` cookie (`SameSite=Lax`, seven days). The cookie value is a random session id, not the user id. `GET /api/me` reads that session. `POST /api/logout` deletes it. A user with `ACTIVE_STATUS` other than `A` cannot sign in. Disabling an account sets `ACTIVE_STATUS` to `D` and revokes that user's sessions. It does not delete the row.

Admin screens require `USER_TYPE` `A` from `/api/me`. The browser cookies that still carry the display name are not authorization.

## Uploads

Registration and post photos are stored in `backend/uploads/`, limited to 5 MB, and limited to `.jpg`, `.jpeg`, `.png`, and `.webp`. Express serves them at `/uploads`. New rows store that `/uploads/...` path.

## Checks

```text
cd backend
node --test
cd ../frontend
npm run check
```

GitHub Actions runs those two commands. It does not connect to Oracle. `npm audit` is recorded there and does not fail the job.
