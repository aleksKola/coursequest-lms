"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { SearchBar } from "@/components/courses/SearchBar";
import { Filters, type FilterState } from "@/components/courses/Filters";
import { CatalogSkeleton } from "@/components/courses/CatalogSkeleton";
import { courses } from "@/lib/courses";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useCourseProgress } from "@/hooks/useCourseProgress";

export default function CatalogPage() {
  const { user, isLoaded } = useUser();
  const { progressByCourseId } = useCourseProgress(user?.id);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300).trim().toLowerCase();
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    difficulty: "All",
    status: "All",
  });

  if (!isLoaded) {
    return <CatalogSkeleton />;
  }

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      filters.category === "All" || course.category === filters.category;
    const matchesDifficulty =
      filters.difficulty === "All" || course.difficulty === filters.difficulty;

    const progress = progressByCourseId[course.id] ?? 0;
    const matchesStatus =
      filters.status === "All" ||
      (filters.status === "In Progress" && progress > 0 && progress < 100) ||
      (filters.status === "Completed" && progress === 100);

    const matchesSearch =
      debouncedSearch === "" ||
      course.title.toLowerCase().includes(debouncedSearch) ||
      course.description.toLowerCase().includes(debouncedSearch);

    return matchesCategory && matchesDifficulty && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <Filters filters={filters} onChange={setFilters} />
      </div>
      <CourseGrid courses={filteredCourses} progressByCourseId={progressByCourseId} />
    </div>
  );
}
