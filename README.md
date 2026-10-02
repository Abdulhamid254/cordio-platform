# CORDIO Platform

Relational research database and stakeholder dashboard for CORDIO's conservation data.

- `apps/api` NestJS + TypeORM + PostgreSQL/PostGIS
- `apps/web` Next.js (App Router) + Tailwind CSS

## Getting started

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
pnpm install
pnpm db:up
pnpm db:migrate
pnpm dev:api   # http://localhost:4000/api/docs
pnpm dev:web   # http://localhost:3000
```
