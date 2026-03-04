# My Cranbrook

## Development

First clone the repo and run `pnpm i` to install everything

### Database

- Make sure you're added to the My Cranbrook Supabase project
- Install Supabase CLI: `brew install supabase/tap/supabase`

* Make sure you have Docker running

- Start the Supabase integration with `supabase start`
- In `.env`, use this as the connection string: `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres`

### Coding

- Run `pnpm run dev` to start the local server
- The site is at `http://localhost:3000/`
- The admin panel is at `http://localhost:3000/admin`

## Infrastructure

- Hosted on Vercel
- Should deploy on push to `main` branch
- Images - use Vercel Blob
- HTML template - Clarity from UI Deck https://clarity-tailwind.preview.uideck.com/
