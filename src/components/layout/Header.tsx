import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <span className="font-semibold">CourseQuest</span>
      <UserButton afterSwitchSessionUrl="/sign-in" showName />
    </header>
  );
}
