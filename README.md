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

### Custom hooks

*(not yet built — will document here once added)*

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
