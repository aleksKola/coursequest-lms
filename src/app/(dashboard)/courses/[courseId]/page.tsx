"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { getCourseById } from "@/lib/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { ModuleSection } from "@/components/lessons/ModuleSection";
import { Progress } from "@/components/ui/progress";
import { CourseDetailSkeleton } from "@/components/courses/CourseDetailSkeleton";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId);

  const { user, isLoaded } = useUser();
  const { progressByCourseId, isLessonComplete, toggleLesson } = useCourseProgress(
    user?.id
  );

  if (!isLoaded) {
    return <CourseDetailSkeleton />;
  }

  if (!course) {
    return <div className="p-6">Course not found.</div>;
  }

  const progressPercent = progressByCourseId[course.id] ?? 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold">{course.title}</h1>
          <p className="text-sm text-muted-foreground">{course.description}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{course.instructor}</span>
            <span>★ {course.rating.toFixed(1)}</span>
            <span>{course.enrolledCount.toLocaleString()} enrolled</span>
            <span>{Math.round(course.durationMinutes / 60)}h total</span>
            <div className="flex items-center gap-2">
              <Progress value={progressPercent} className="w-32" />
              <span>{progressPercent}% completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {course.modules.map((module) => (
          <ModuleSection
            key={module.id}
            courseId={course.id}
            module={module}
            isLessonComplete={(lessonId) => isLessonComplete(course.id, lessonId)}
            onToggleLesson={(lessonId) => toggleLesson(course.id, lessonId)}
          />
        ))}
      </div>
    </div>
  );
}
