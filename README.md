# Curriculum Ideas Cymru

An interactive teaching-ideas browser built around the Curriculum for Wales.

**Live site:** [curriculum-ideas-cymru.jss9899.chatgpt.site](https://curriculum-ideas-cymru.jss9899.chatgpt.site)

## What the site includes

- All six Areas of Learning and Experience
- Progression Step 2 (Years 1–3) and Progression Step 3 (Years 4–6)
- 347 official descriptors of learning
- Two adaptable lesson ideas for every descriptor
- 694 lesson ideas in total
- Technology-based and barefoot activities
- A learning goal, equipment list, lesson steps and classroom example for every idea
- Filters for AoLE, progression step and curriculum statement
- Keyword search across curriculum content and teaching ideas
- Responsive layouts for phones, tablets and computers

## Technology

- React 19
- Next.js 16
- TypeScript
- Tailwind CSS
- Vercel hosting
- Lucide icons

## Run locally

Node.js 22.13 or newer is required.

```bash
corepack enable
pnpm install
pnpm dev
```

Then open the local address shown in the terminal.

Create a production build with:

```bash
pnpm build
```

## Deploy on Vercel

Import the `JSS9899/Digital-Teaching` repository into Vercel and leave the root directory set to the repository root. Vercel should automatically detect **Next.js** and use `pnpm build`.

No environment variables are required for the current version of the site.

## Main project files

- `app/page.tsx` contains the interactive interface.
- `app/globals.css` contains the visual styling and motion.
- `app/curriculum-data.json` contains the curriculum structure and lesson content.
- `scripts/` contains the content-generation and build helpers used by the project.

## Curriculum attribution

The curriculum descriptors are based on the official Curriculum for Wales guidance published by the Welsh Government on [Hwb](https://hwb.gov.wales/curriculum-for-wales). Always check Hwb for the latest statutory guidance.
