This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ENV file 
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out (https://github.com/yashBhartari/LeadDesk-Mini-Task-A.git)- your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# LeadDesk Mini — Task A & Task B

LeadDesk Mini is a full-stack, responsive lead capture application featuring dual-layer validation, SSR authentication, and real-time lead pipeline tracking.

- **Live Landing Page: (https://lead-desk-mini-task-a.vercel.app/)
- **Admin Dashboard:** (https://lead-desk-mini-task-a.vercel.app/admin)


---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Database:** Supabase PostgreSQL with Row Level Security (RLS)
- **Form & Validation:** Zod + React Hook Form (Dual Client-Side and Server-Side Action Validation)
- **Styling:** Tailwind CSS + `next-themes` (Light/Dark mode)

---

## 📊 Data Model & Database Schema

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed'))
);
