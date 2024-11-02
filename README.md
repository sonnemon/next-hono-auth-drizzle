# Next.js Boilerplate with Auth.js, Hono.js, Zod, and Drizzle

This boilerplate streamlines the setup for a full-stack Next.js application, including authentication, API routing, and database integration. It combines Auth.js for free and flexible authentication options (credentials and external providers), Hono.js for custom backend routing, Zod for type-safe validations, and Drizzle for a powerful, schema-driven ORM.


Features:
- Authentication: Auth.js with credentials and OAuth provider support
- Custom Routing: Hono.js for flexible backend routing
- Type Safety: Zod integration for end-to-end validation
- Database: Drizzle ORM for simplified migrations and custom schemas

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Environment Variables

Create a `.env` file and add the following variables:

```bash
DATABASE_URL=#Required
AUTH_SECRET=#Required
AUTH_URL=#Required
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.