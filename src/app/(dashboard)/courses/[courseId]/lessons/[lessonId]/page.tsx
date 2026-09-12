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
    <div className="flex flex-col gap-4 p-6">
      <Link
        href={`/courses/${course.id}`}
        className="text-sm text-muted-foreground hover:underline"
      >
        &larr; Back to {course.title}
      </Link>

      <MockVideoPlayer thumbnail={course.thumbnail} title={lesson.title} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{module.title}</p>
          <h1 className="text-xl font-semibold">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground">
            {lesson.durationMinutes} min
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={isComplete}
            onCheckedChange={() => toggleLesson(course.id, lesson.id)}
          />
          Mark complete
        </label>
      </div>
    </div>
  );
}
