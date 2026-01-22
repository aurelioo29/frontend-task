"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { applyTheme, getTheme } from "../lib/theme";
import { Moon, Sun } from "lucide-react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You’ll need to login again to access the dashboard.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    logout();
    await Swal.fire({
      title: "Logged out",
      text: "See you again 👋",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });

    router.replace("/login");
  };

  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold">
          Mini Dashboard
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {user.email}
            </span>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition flex items-center gap-2 cursor-pointer"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <>
                <Sun size={16} />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon size={16} />
                <span>Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
