# CourseQuest

Learning management dashboard — browse courses, track lesson progress, resume where you left off. Built as a take-home assessment.

## Architecture

### Routes

| Route | Purpose |
|---|---|
| `/sign-in` | Clerk-hosted sign-in form |
| `/` | Course catalog (protected) |
| `/courses/[courseId]` | Course detail + module/lesson checklist (protected) |
| `/courses/[courseId]/lessons/[lessonId]` | Lesson view + mock video player (protected) |

Route protection: `src/proxy.ts` runs `clerkMiddleware()` on every request to attach session state. The actual auth gate lives in `src/app/(dashboard)/layout.tsx`, shared by every route in the `(dashboard)` route group — it checks `auth()` server-side and redirects to `/sign-in` if there's no `userId`. Centralizing the check in one layout (rather than per-page) avoids duplicating auth logic and follows Clerk's current guidance to prefer resource-based checks over path-matching middleware.

### Key components

| Component | Location | Purpose |
|---|---|---|
| `Header` | `components/layout/Header.tsx` | App header with Clerk `<UserButton>` (avatar, name, sign-out) |
| `CourseCard` | `components/courses/CourseCard.tsx` | Single course preview: title, description, category/difficulty/duration tags, progress bar, completion badge. Takes `progressPercent` as a prop rather than computing it — progress state lives in the page, not the card. |
| `CourseGrid` | `components/courses/CourseGrid.tsx` | Renders a responsive grid of `CourseCard`s. Takes `progressByCourseId: Record<string, number>` as a prop — the page owns progress state, the grid just distributes it. |
| `SearchBar` | `components/courses/SearchBar.tsx` | Controlled search input, title/description filtering handled by the catalog page (debounced via `useDebouncedValue` once wired). |
| `Filters` | `components/courses/Filters.tsx` | Category, difficulty, and completion-status `Select` dropdowns. Controlled — the catalog page owns `FilterState` and passes it down. |
| `LessonItem` | `components/lessons/LessonItem.tsx` | Single lesson row: checkbox + title + duration. Fires `onToggle()`, doesn't touch progress state itself. |
| `ModuleSection` | `components/lessons/ModuleSection.tsx` | Module title + its `LessonItem`s. Takes `isLessonComplete`/`onToggleLesson` callbacks scoped to lesson id, so it doesn't need to know about course id itself. |
| `MockVideoPlayer` | `components/lessons/MockVideoPlayer.tsx` | Styled static player (course thumbnail backdrop, fake play button, fake progress bar) rather than an HTML5 `<video>` tag — `courses.json` has no real video URLs, so a `<video>` with no `src` would just show broken native controls. |
| `CatalogSkeleton` / `CourseDetailSkeleton` | `components/courses/` | Loading states shown while Clerk's `useUser()` resolves (`isLoaded === false`). Course data itself is static JSON with no real network delay, so Clerk's auth resolution is the one genuinely async thing worth gating on. |

### Custom hooks

| Hook | Location | Purpose |
|---|---|---|
| `useDebouncedValue` | `hooks/useDebouncedValue.ts` | Generic debounce — delays updating the returned value until `delayMs` has passed with no new input. Used to debounce the catalog search (300ms) so filtering doesn't re-run on every keystroke. |
| `useCourseProgress` | `hooks/useCourseProgress.ts` | Source of truth for lesson completion, persisted to `localStorage["courseProgress:<userId>"]` (keyed by Clerk `userId`, no backend). Stores raw completed-lesson IDs per course, not percentages — `progressByCourseId` (a `Record<courseId, number>`) is derived from that via `useMemo` against each course's total lesson count. Exposes `toggleLesson(courseId, lessonId)` and `isLessonComplete(courseId, lessonId)` for the lesson checklist. |

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

*(to be filled in at deploy time)*

## Trade-offs

*(to be filled in as decisions are made)*

## AI Usage

*(to be filled in)*

## Future Work

*(up to 3 bullets — to be filled in)*
