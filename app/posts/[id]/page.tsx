"use client";

import AuthGuard from "@/src/components/AuthGuard";
import Navbar from "@/src/components/Navbar";
import { fetchPostById, Post } from "@/src/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    fetchPostById(id)
      .then((p) => mounted && setPost(p))
      .catch((e: any) => mounted && setError(e?.message || "Unknown error"))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />

        <div className="mx-auto max-w-7xl p-4 sm:p-6 space-y-6">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Detail View
            </div>
          </div>

          {/* Content */}
          {loading && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                <Loader2 className="animate-spin" size={18} />
                <span className="text-sm">Loading post…</span>
              </div>

              {/* skeleton-ish blocks */}
              <div className="mt-5 space-y-3 animate-pulse">
                <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-10/12 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
                  <AlertTriangle size={18} />
                </div>

                <div className="space-y-1">
                  <div className="font-semibold">Something went wrong</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    {error}
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition"
                    >
                      Reload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && post && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Post Detail
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      ID: <span className="font-medium">#{post.id}</span>
                    </div>
                  </div>

                  <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
                    {post.title}
                  </h1>

                  <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                    {post.body}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                  <div className="font-semibold">Metadata</div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Post ID
                      </span>
                      <span className="font-medium">#{post.id}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        User ID
                      </span>
                      <span className="font-medium">{post.userId}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Tip: Use the search on dashboard to find posts quickly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
