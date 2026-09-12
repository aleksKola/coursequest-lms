"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getCourseById, getLessonById } from "@/lib/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { MockVideoPlayer } from "@/components/lessons/MockVideoPlayer";
import { Checkbox } from "@/components/ui/checkbox";

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const course = getCourseById(courseId);
  const found = course ? getLessonById(course, lessonId) : undefined;

  const { user } = useUser();
  const { isLessonComplete, toggleLesson } = useCourseProgress(user?.id);

  if (!course || !found) {
    return <div className="p-6">Lesson not found.</div>;
  }

  const { module, lesson } = found;
  const isComplete = isLessonComplete(course.id, lesson.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-neutral-900">
        <Link
          href={`/courses/${course.id}`}
          className="absolute left-4 top-4 z-10 text-sm text-white/90 hover:underline"
        >
          &larr; Back to Course Modules
        </Link>
        <div className="mx-auto max-w-4xl">
          <MockVideoPlayer thumbnail={course.thumbnail} title={lesson.title} />
        </div>
      </div>

      <div className="flex flex-col gap-1 px-6 pb-6">
        <p className="text-sm text-muted-foreground">{module.title}</p>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{lesson.title}</h1>
          <label className="flex w-fit items-center gap-2 text-sm">
            <Checkbox
              checked={isComplete}
              onCheckedChange={() => toggleLesson(course.id, lesson.id)}
            />
            {isComplete ? "Completed" : "Mark complete"}
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          {lesson.durationMinutes} min
        </p>
      </div>
    </div>
  );
}
