import { ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Design",
  "Business",
  "DevOps",
  "Mobile",
] as const;

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export type CompletionStatus = "All" | "In Progress" | "Completed";
export const COMPLETION_STATUSES: CompletionStatus[] = [
  "All",
  "In Progress",
  "Completed",
];

export type FilterState = {
  category: "All" | (typeof CATEGORIES)[number];
  difficulty: "All" | (typeof DIFFICULTIES)[number];
  status: CompletionStatus;
};

type FiltersProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

export function Filters({ filters, onChange }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <ListFilter className="size-4" />
        Filter by:
      </span>
      <Select
        value={filters.category}
        onValueChange={(value) => {
          if (value) onChange({ ...filters, category: value as FilterState["category"] });
        }}
      >
        <SelectTrigger>
          <SelectValue>
            {(value: string) => (value === "All" ? "All Categories" : value)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectItem value="All">All Categories</SelectItem>
          {CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.difficulty}
        onValueChange={(value) => {
          if (value) onChange({ ...filters, difficulty: value as FilterState["difficulty"] });
        }}
      >
        <SelectTrigger>
          <SelectValue>
            {(value: string) => (value === "All" ? "All Difficulties" : value)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectItem value="All">All Difficulties</SelectItem>
          {DIFFICULTIES.map((difficulty) => (
            <SelectItem key={difficulty} value={difficulty}>
              {difficulty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => {
          if (value) onChange({ ...filters, status: value as CompletionStatus });
        }}
      >
        <SelectTrigger>
          <SelectValue>
            {(value: string) => (value === "All" ? "All Courses" : value)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {COMPLETION_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status === "All" ? "All Courses" : status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
