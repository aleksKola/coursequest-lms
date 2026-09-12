<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

- TypeScript strict, no `any` ever — this is a graded criterion.
- Use shadcn/ui primitives from `src/components/ui/`, don't hand-roll UI that shadcn already covers.
- Course/Module/Lesson types live in `src/lib/courses.ts`, import from there — don't redefine.
- Progress state: `useCourseProgress` hook only, localStorage keyed by Clerk `userId`. No new persistence mechanism.
- Keep components small, one concern each (CourseCard, CourseGrid, Filters, SearchBar separate).
