"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export function NavAuthButtons() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div style={{ width: "160px" }} />;

  if (isSignedIn) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link href="/dashboard" className="button ghost hp-btn-ghost-nav">
          My courses
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Link href="/sign-in" className="button ghost hp-btn-ghost-nav">
        Log in
      </Link>
      <Link href="/courses" className="button hp-btn-teal-nav">
        Enrol now
      </Link>
    </div>
  );
}
