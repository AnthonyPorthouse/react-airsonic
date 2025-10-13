# AGENTS.md

## Purpose

This document defines how AI coding agents and human contributors should interact with this repository.  
It provides setup instructions, tooling context, coding standards, and behavioural rules to maintain consistency and quality across all contributions.

## Context

This project is a Media Player frontend for servers that use the SubSonic API or the OpenSubSonic API.
The application should be compatible with both, but allow extended behaviours for OpenSubSonic compatible servers.

## Setup Instructions

- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- Build the app: `npm run build`
- Build the linter: `npm run lint`
- Run the unit test suite: `npm test -- --run`
- Run the mutation test suite: `npm run test:mutation`

## Tooling

- Vite
- Vitest
- React
- TypeScript
- TailwindCSS
- Tanstack Query
- Tanstack Router
- Storybook
- react-i18next

## Code Standards

- Use lazy routes when creating new pages or components.
- Prefer functional components with hooks over class components.
- Keep logic separated into hooks or utility modules where possible.
- Follow existing naming conventions for components and files (e.g. `PascalCase` for components, `camelCase` for utils).
- Type all functions and props explicitly; avoid using `any`.
- Use ESLint and Prettier for formatting and linting before committing.
- Write unit tests for all new functions, hooks, and components.
- Ensure API calls are wrapped using Tanstack Query and follow existing query key structures.

## AI Agent Behaviour

- Before modifying existing files, read related modules to understand context.
- When creating new files, follow the directory structure and naming conventions of similar features.
- Keep commits atomic and descriptive.
- Do not alter configuration files (like `vite.config.ts` or `.eslintrc`) unless explicitly requested.
- Prefer improving or extending existing patterns over introducing new frameworks or dependencies.
- When introducing a new component, create a storybook story and ensure it follows accessibility and localization guidelines.
- Do not modify translation files (`/src/locales/`) unless the change is user-facing text that has been reviewed.

## File Structure Overview

```
/ # Project root
├── src/ # Source code
│    ├── api/ # SubSonic API calls
│    ├── Components/ # Reusable UI components
│    ├── Contexts/ # UI context definitions
│    ├── Providers/ # UI context providers
│    ├── routes/ # Route components, loaded lazily
│    ├── hooks/ # Custom React hooks
│    ├── locales/ # react-i18next translations
│    ├── styles/ # Global Tailwind setup and theme config
│    └── test/ # Unit and integration tests
├── public/ # Static assets
└── index.html # HTML template
```

## Testing Guidance

- Unit tests should use Vitest.
- Mutation tests should be run using `npm run test:mutation`.
- Place test files alongside their implementation (`ComponentName.test.tsx`).
- Use React Testing Library for component tests.

## Do Not

- Do not refactor large sections of code without a clear functional reason.
- Do not introduce new dependencies without checking for existing equivalents.
- Do not modify build or deployment pipelines.
- Do not commit generated or build output.
