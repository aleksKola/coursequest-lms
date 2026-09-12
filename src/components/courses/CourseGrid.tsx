import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/lib/courses";

type CourseGridProps = {
  courses: Course[];
  progressByCourseId: Record<string, number>;
};

export function CourseGrid({ courses, progressByCourseId }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 py-16 text-center text-muted-foreground">
        <p className="font-medium">No courses found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

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
