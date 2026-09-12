"use client";

import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getCourseById } from "@/lib/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { ModuleSection } from "@/components/lessons/ModuleSection";
import { Progress } from "@/components/ui/progress";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId);

  const { user } = useUser();
  const { progressByCourseId, isLessonComplete, toggleLesson } = useCourseProgress(
    user?.id
  );

  if (!course) {
    return <div className="p-6">Course not found.</div>;
  }

  const progressPercent = progressByCourseId[course.id] ?? 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold">{course.title}</h1>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </div>

      <div className="flex items-center gap-3">
        <Progress value={progressPercent} className="max-w-sm" />
        <span className="text-sm text-muted-foreground">{progressPercent}%</span>
      </div>

      <div className="flex flex-col gap-4">
        {course.modules.map((module) => (
          <ModuleSection
            key={module.id}
            module={module}
            isLessonComplete={(lessonId) => isLessonComplete(course.id, lessonId)}
            onToggleLesson={(lessonId) => toggleLesson(course.id, lessonId)}
          />
        ))}
      </div>
    </div>
  );
}
