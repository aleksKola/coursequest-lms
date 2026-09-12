import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href="/" className="font-semibold" >CourseQuest</Link>
      <UserButton afterSwitchSessionUrl="/sign-in" showName />
    </header>
  );
}
