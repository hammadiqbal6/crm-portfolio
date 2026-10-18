# crm-portfolio

CRM developer portfolio of M. Hammad Iqbal: SugarCRM, SuiteCRM, integrations (React, Vite, Tailwind).

Live site: https://hammadiqbal6.github.io/crm-portfolio/

## Stack
- React 18 + Vite 5
- Tailwind CSS 3 (class-based dark mode, follows the system preference by default)
- GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main`

## Develop
```bash
npm ci
npm run dev      # http://localhost:5173/crm-portfolio/
npm run build    # outputs dist/
```

## Editing content
All copy lives in `src/content.js` (site info, about, experience, projects, skills). Brand colours are CSS variables in `src/theme.css`.

## Content rules
- Client and company work is written up as case studies with no client names and no links to private code.
- Contact goes through GitHub only. No email or phone number is published.
- No invented metrics or testimonials.
