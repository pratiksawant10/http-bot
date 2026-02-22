# HTTPBot (Next.js + Supabase)

A Postman-first, vibrant HTTP client built with Next.js App Router, Supabase Auth/Postgres, Tailwind, shadcn-style UI primitives, Framer Motion, TanStack Query/Table, and Zod.

## Setup
1. Create a Supabase project.
2. Run SQL migration in `supabase/migrations/0001_init.sql` (SQL editor).
3. Copy `.env.example` to `.env.local` and fill values.
4. In Supabase Auth providers, enable Google OAuth and paste Google client id/secret.
5. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```

## Features
- Email/password + Google OAuth login.
- First login initializes workspace + default environment.
- Request Builder: method/url/headers/params/body, send via server `/api/run`.
- Variable interpolation helpers and export/cURL copy.
- History view with run details.

## Routes
Public: `/`, `/pricing`, `/login`, `/signup`.
Protected: `/app`, `/app/requests`, `/app/requests/new`, `/app/requests/[id]`, `/app/collections`, `/app/environments`, `/app/history`, `/app/settings`.

## Notes
- No Prisma is used.
- Secrets are not logged and should be masked in UI previews.
