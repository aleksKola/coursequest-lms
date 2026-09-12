import coursesData from "@/data/courses.json";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  durationMinutes: number;
  thumbnail: string;
  instructor: string;
  rating: number;
  enrolledCount: number;
  modules: Module[];
};

export const courses: Course[] = coursesData as Course[];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getTotalLessonCount(course: Course): number {
  return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}
