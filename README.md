# React + Tailwind

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. One top of the standard Vite setup, [tailwindcss](https://tailwindcss.com/) is installed and ready to be used in React components.

Additional references:

- [Getting started with Vite](https://vitejs.dev/guide/)
- [Tailwind documentation](https://tailwindcss.com/docs/installation)

## Airtable Integration

Install the Airtable package and set the following environment variables in an `.env` file (see `.env.example`):

```
VITE_AIRTABLE_API_KEY=your_api_key
VITE_AIRTABLE_BASE_ID=your_base_id
```

Use the helpers in `src/utils/airtable.ts` to fetch or modify records.
