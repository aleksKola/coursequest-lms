import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@/lib/courses";

type CourseCardProps = {
  course: Course;
  progressPercent: number;
};

export function CourseCard({ course, progressPercent }: CourseCardProps) {
  const isComplete = progressPercent === 100;
  const durationLabel = `${Math.round(course.durationMinutes / 60)}h`;

  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium leading-snug">{course.title}</h3>
        {isComplete && <Badge>Completed</Badge>}
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">
        {course.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="secondary">{course.category}</Badge>
        <Badge variant="secondary">{course.difficulty}</Badge>
        <Badge variant="secondary">{durationLabel}</Badge>
      </div>

      <Progress value={progressPercent} />
    </Link>
  );
}
