import { CourseGrid } from "@/components/courses/CourseGrid";
import { courses } from "@/lib/courses";

export default function CatalogPage() {
  return (
    <div className="p-6">
      <CourseGrid courses={courses} progressByCourseId={{}} />
    </div>
  );
}
