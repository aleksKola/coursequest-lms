# CourseQuest

Learning management dashboard: browse courses, track lesson progress, resume where you left off. Built as a take-home assessment.

## Architecture

### Routes

| Route | Purpose |
|---|---|
| `/sign-in` | Clerk-hosted sign-in form |
| `/` | Course catalog (protected) |
| `/courses/[courseId]` | Course detail + module/lesson checklist (protected) |
| `/courses/[courseId]/lessons/[lessonId]` | Lesson view + mock video player (protected) |

Clerk's prebuilt components (`<SignIn>`, `<UserButton>`) use the official `@clerk/ui/themes` shadcn theme, set via `appearance={{ theme: shadcn }}` in the root `ClerkProvider`. This keeps them visually consistent with the rest of the app.

Auth is enforced in `src/app/(dashboard)/layout.tsx`. It checks `auth()` server-side and redirects to `/sign-in` if there's no `userId`. Every route in the `(dashboard)` group shares this layout, so the check only lives in one place. `src/proxy.ts` runs `clerkMiddleware()` on every request to keep session state available.

### Key components

| Component | Location | Purpose |
|---|---|---|
| `Header` | `components/layout/Header.tsx` | App header with the dark mode toggle and Clerk `<UserButton>` for avatar, name, and sign-out. |
| `ThemeProvider` / `ThemeToggle` | `components/layout/` | Dark mode, via `next-themes`. `ThemeProvider` wraps the app in root `layout.tsx`; `ThemeToggle` is the header button that switches between light and dark. |
| `CourseCard` | `components/courses/CourseCard.tsx` | Single course preview: title, description, tags, progress bar, completion badge. Receives `progressPercent` as a prop instead of computing it. |
| `CourseGrid` | `components/courses/CourseGrid.tsx` | Responsive grid of `CourseCard`s. Also handles the empty state when no courses match. |
| `SearchBar` | `components/courses/SearchBar.tsx` | Controlled search input. Filtering happens in the catalog page. |
| `Filters` | `components/courses/Filters.tsx` | Category, difficulty, and completion-status dropdowns. Controlled by the catalog page's `FilterState`. |
| `LessonItem` | `components/lessons/LessonItem.tsx` | Single lesson row with a checkbox, title, and duration. |
| `ModuleSection` | `components/lessons/ModuleSection.tsx` | Module title plus its list of `LessonItem`s. |
| `MockVideoPlayer` | `components/lessons/MockVideoPlayer.tsx` | Styled static player using the course thumbnail. `courses.json` has no real video URLs, so a real `<video>` tag would just show broken controls. |
| `CatalogSkeleton` / `CourseDetailSkeleton` | `components/courses/` | Loading states shown while Clerk resolves the signed-in user. |

### Custom hooks

| Hook | Location | Purpose |
|---|---|---|
| `useDebouncedValue` | `hooks/useDebouncedValue.ts` | Generic debounce. Delays updating the returned value until `delayMs` has passed with no new input. Used to debounce the catalog search at 300ms. |
| `useCourseProgress` | `hooks/useCourseProgress.ts` | Source of truth for lesson completion. Persists completed-lesson IDs to `localStorage`, keyed by Clerk `userId`. Derives `progressByCourseId` (a percentage per course) via `useMemo`, and exposes `toggleLesson` and `isLessonComplete`. |

## Local Setup

```bash
npm install
```

Create `.env.local` with:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

(Get these from your Clerk dashboard → API Keys.)

```bash
npm run dev
```

## Deployment Notes

Deployed on Vercel: https://coursequest-lms.vercel.app

**Host environment variables** (set for both Production and Preview in Vercel's project settings, secret key marked as Sensitive/Secret):
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**Clerk allowed origins:** this project uses a Clerk production instance. Production instances restrict which domains can use the API keys, so the deployed Vercel URL (`https://coursequest-lms.vercel.app`) was added under Clerk Dashboard → Domains to allow auth requests from it.

## Trade-offs

- **Default shadcn/Clerk styling beyond dark mode.** Added dark mode (via `next-themes`) and Clerk's shadcn theme for visual consistency, but didn't go further into a custom color scheme, button variants, or fully custom-branded sign-in/sign-up screens. Prioritized functional completeness across all required features over deep visual polish given the time box.
- **Progress stored as raw completed-lesson IDs, not percentages.** `progressByCourseId` is derived via `useMemo` from the raw completed-lesson state rather than stored directly, so it can't drift out of sync with actual lesson completion. Slightly more computation on read, but avoids synchronization issues.

## AI Usage

**Tool used:** Claude Code, throughout the entire project.

**Most helpful prompts/workflows:**
1. Breaking the assignment brief into a step-by-step plan before writing any code, then working through it in order (scaffold, auth, data layer, catalog, detail/lesson views, polish) rather than jumping between features.
2. Building components bottom-up as they appear in the actual data/UI flow: smallest leaf components first (`CourseCard`, `LessonItem`), then composing them into their containers (`CourseGrid`, `ModuleSection`), then wiring the pages around them last.

**One thing AI got wrong and how it was caught/fixed:**
While tightening `FilterState.category`/`.difficulty` to a union type, Claude wrote the `Select` change handlers assuming a `(value: string) => void` signature. I reviewed the code and noticed the logical type mismatch: Base UI's `Select` actually fires `(value: string | null, eventDetails)`, since it emits `null` on clear/close, not just on a real selection. Had this cast a `null` straight into the union type unchecked. Fixed by adding a null-guard before the cast.

## Future Work

- Finer-tuned visual styling: a real color scheme, custom button variants
- Custom-branded Clerk sign-in/sign-up screens instead of the current hosted-style flow
- Module-level progress indicators and a "Continue" CTA that jumps to the first incomplete lesson.
