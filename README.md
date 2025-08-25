# Wedding

A beautiful wedding website built with Next.js and TypeScript.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Better Auth with Google OAuth
- **Database:** PostgreSQL with Drizzle ORM
- **Linting:** ESLint

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── login/        # Login page
│   ├── demo/         # Demo page
│   └── providers.tsx # Context providers
├── lib/              # Utility functions and configurations
│   ├── auth.ts       # Authentication setup
│   ├── db/           # Database configuration
│   └── queries.ts    # Data fetching functions
└── components/       # Reusable components
```

## Features

- **User Authentication** - Google OAuth with Better Auth
- **Role-based Access** - Guest and Admin user roles
- **Responsive Design** - Mobile-friendly wedding website
- **Data Management** - PostgreSQL with Drizzle ORM
- **Type Safety** - Full TypeScript implementation

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
