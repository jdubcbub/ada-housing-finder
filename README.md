# ADA Housing Finder

A housing discovery app that helps people find accessible housing, starting with Seattle.
All listing data in this repo and in the development database is test data.

## Stack

Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Router.
Listings come from the Express backend in `backend/`, which serves the fictional
test units in `backend/src/listings.json`. In development, Vite forwards `/api/*`
requests to the backend on port 3001.

## Run locally

Requires Node.js 20 or later.

```sh
npm ci
npm --prefix backend ci

npm run api        # terminal 1: backend on http://localhost:3001
npm run dev        # terminal 2: app on http://localhost:8080
```

To add or change test units, edit `backend/src/listings.json`. The backend
re-reads the file on every request, so there's no need to restart it.

## Checks

```sh
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run check      # all of the above, plus backend tests and type check
```

The critical journey test (`src/__tests__/criticalJourney.test.tsx`) covers
open site, search, view results, and open property details, using fixed test
units so it runs without the backend. Backend API tests are in
`backend/src/listings.test.tsx`.

## Docs

Product and design docs are in `docs/` (PRD, SDD, ADA features).
