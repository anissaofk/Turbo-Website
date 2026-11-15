# Turbo — Vehicle marketplace

Car buying and selling site inspired by [mobile.de](https://www.mobile.de/): search-first homepage, filterable listings, detail pages with seller contact, and a sell flow.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Seed listings in `src/data` (no database required for the MVP)

## Scripts

```bash
npm run dev
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Purpose |
|------|---------|
| `/` | Search-first homepage + featured cars |
| `/search` | Browse/filter/sort listings |
| `/cars/[id]` | Listing detail + seller contact |
| `/sell` | Publish a car (demo form) |
