import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/lib/courses";

type CourseGridProps = {
  courses: Course[];
  progressByCourseId: Record<string, number>;
};

export function CourseGrid({ courses, progressByCourseId }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progressPercent={progressByCourseId[course.id] ?? 0}
        />
      ))}
    </div>
  );
}
