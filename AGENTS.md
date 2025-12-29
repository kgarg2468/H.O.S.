# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js (App Router) TypeScript project.
- `app/` holds the route entrypoints, layouts, and global styles (e.g., `app/page.tsx`, `app/layout.tsx`, `app/globals.css`).
- `components/` contains UI modules grouped by feature (`components/os/`, `components/workspaces/`).
- `lib/` provides shared utilities and types (e.g., data loaders and domain models).
- `data/` stores JSON fixtures used by the UI (e.g., `data/buyers.json`).

## Build, Test, and Development Commands
Use `pnpm` (lockfile: `pnpm-lock.yaml`).
- `pnpm dev`: run the local dev server with hot reload.
- `pnpm build`: create a production build.
- `pnpm start`: serve the production build locally.
- `pnpm lint`: run Next.js linting rules.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; keep line wrapping readable.
- Language: TypeScript + React functional components.
- Imports: use path aliases like `@/lib/...` and `@/app/...` when present.
- Naming: PascalCase for components (`Workspace.tsx`), camelCase for helpers.
- Formatting/Linting: rely on `next lint`; no dedicated formatter config is present.

## Testing Guidelines
No test framework is configured in this repo. If you add tests, document the tool and add a script in `package.json` (for example, `pnpm test`). Prefer colocated test files like `Component.test.tsx` or `lib/foo.test.ts`.

## Commit & Pull Request Guidelines
Git history shows merge commits from PRs (e.g., “Merge pull request #16 …”). There is no strict commit message convention beyond concise, descriptive subjects.
PRs should include:
- A clear description of user-facing changes.
- Linked issues (if any).
- Screenshots or short clips for UI changes.

## Configuration Tips
`next.config.js` and `tsconfig.json` are the primary configuration entrypoints. Update them intentionally and keep changes scoped to the need (routing, build output, or path aliases).
