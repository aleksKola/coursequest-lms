import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="font-semibold" >CourseQuest</Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton afterSwitchSessionUrl="/sign-in" showName />
      </div>
    </header>
  );
}
