"use client";

import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, user, router, pathname]);

  if (!isReady) return <div className="p-6">Loading session…</div>;
  if (!user) return null;

  return <>{children}</>;
}
