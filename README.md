# React + Tailwind

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. One top of the standard Vite setup, [tailwindcss](https://tailwindcss.com/) is installed and ready to be used in React components.

Additional references:

- [Getting started with Vite](https://vitejs.dev/guide/)
- [Tailwind documentation](https://tailwindcss.com/docs/installation)

## Supabase Integration

Set the following environment variables in an `.env` file (see `.env.example`):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_public_anon_key
```

The Supabase client is configured in `src/utils/supabaseClient.ts` and helper functions are available in `src/utils/supabaseService.ts`.
