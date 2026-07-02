# Royal Arabian — China Destination

A production-ready luxury travel experience for China, built with Next.js 14 App Router, React, TypeScript, Tailwind CSS and Sanity CMS.

## Installation

```bash
git clone <repository-url>
cd ra-developer-assessment
npm install
cp .env.example .env.local
npm run dev
```

The storefront is available at `http://localhost:3000/cn`. Package pages use `/cn/packages/[slug]`.

## Sanity setup

This repository includes a configured standalone Sanity Studio and registered `destination`, `package`, and reusable `seo` schemas. The schemas use Sanity's current `defineType`, `defineField`, and `defineArrayMember` APIs.

```bash
npm run studio
```

The Studio opens at `http://localhost:3333`. Create a Destination with slug `cn`, then create Package documents that reference it. Featured packages are displayed first. Images should include alternative text and can be cropped using Sanity hotspots.

For a hosted storefront, add its URL as an allowed CORS origin in [Sanity Manage](https://www.sanity.io/manage).

## Environment variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=x0gfl5n9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-02
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Only public read access is used; no API token is needed for a public dataset. Keep the dated API version stable unless intentionally adopting newer Sanity behavior.

## Useful commands

```bash
npm run dev           # Next.js development server
npm run lint          # ESLint
npm run build         # Production build
npm run start         # Run the production build
npm run studio        # Sanity Studio development server
npm run studio:build  # Validate and build Sanity Studio
```

## Architecture

- `src/app/cn` — destination route, loading/error states, and package detail route
- `src/components` — reusable presentation components
- `src/lib/queries.ts` — projected, parameterized GROQ queries
- `src/lib/sanity.ts` — Sanity client and image URL builder
- `src/lib/helpers.ts` — currency and metadata helpers
- `src/types` — domain types shared by server components
- `sanity/schemas` — registered CMS schemas

Content is fetched in async Server Components and revalidated hourly. Destination and package metadata is generated dynamically from Sanity, including canonical, Open Graph, Twitter and robots directives. Sanity images use `next/image`, responsive sizing, hotspot crops and optional LQIP placeholders.

## Deployment

1. Push the repository to GitHub and import it into Vercel.
2. Add all variables from `.env.example`, setting `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Add that URL to the Sanity project's CORS origins.
4. Deploy. Vercel runs `npm run build` automatically.

The Studio may be deployed separately with `npx sanity deploy`, or hosted through another static deployment workflow after `npm run studio:build`.
