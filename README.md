# CORDIO Platform

Relational research database and stakeholder dashboard for CORDIO's conservation data.

- `apps/api` NestJS + TypeORM + PostgreSQL/PostGIS
- `apps/web` Next.js (App Router) + Tailwind CSS

## Getting started

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm install
npm run db:up
npm run db:migrate
npm run db:seed      # optional: invented sample data for development only
npm run dev:api   # http://localhost:4000/api/docs
npm run dev:web   # http://localhost:3000
```

## Structure

```
apps/api/src
  config/            typed configuration and env validation
  common/            shared DTOs and filters
  database/          data source, migrations, seeds
  modules/           one folder per domain (health, projects, sites, dashboard)
apps/web/src
  app/               routes (App Router)
  components/        layout and reusable UI primitives
  features/          feature-specific components (overview, projects, sites)
  lib/ types/        API client, formatting helpers, API types
```

## Roadmap

1. Legacy import pipeline (staging schema, import batches, quality flags)
2. Authentication and role-based access (admin, data manager, researcher, partner, public)
3. Survey events and observations screens, map explorer
4. Data entry forms and bulk upload
5. Exports (CSV, GeoJSON) and production hardening
