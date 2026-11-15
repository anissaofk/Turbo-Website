# Turbo — car marketplace template

Starter for a **buy & sell cars** website. Inspired by marketplace UX patterns (search-first home, filters, listing detail, sell flow) — not a clone of any existing site.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s included

| Route | Role |
|-------|------|
| `/` | Brand hero + quick search + featured cars |
| `/search` | Filter / sort inventory |
| `/cars/[id]` | Listing detail + seller contact |
| `/sell` | Demo “list your car” form |

Data is seeded in `src/data` so you can run without a database.

## Folder structure

```
src/
  app/                 # Next.js App Router pages
    cars/[id]/         # Listing detail
    search/            # Browse + filters
    sell/              # Seller form
  components/
    layout/            # Header, Footer
    cars/              # CarCard, ListingGallery
    search/            # SearchForm, FiltersPanel, SortSelect
    sell/              # SellForm
  data/                # Seed cars + filter helpers
  hooks/               # Shared hooks (add yours here)
  lib/                 # Small utilities (cn, etc.)
  types/               # Domain TypeScript types
public/
  images/              # Local images / logos
```

## Customize next

1. Replace seed cars in `src/data/cars.ts` with your API or CMS.
2. Drop brand assets into `public/images/`.
3. Tweak colors / fonts in `src/app/globals.css` and `src/app/layout.tsx`.
4. Connect `SellForm` to a real backend endpoint.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm start        # serve build
npm run lint     # ESLint
```
