"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/src/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) router.replace("/login");
    else router.replace("/dashboard");
  }, [router]);

  return <div className="p-6">Redirecting…</div>;
}
