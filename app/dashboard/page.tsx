"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import AuthGuard from "@/src/components/AuthGuard";
import Navbar from "@/src/components/Navbar";
import Pagination from "@/src/components/Pagination";

import { fetchPosts } from "@/src/lib/api";
import type { Post } from "@/src/lib/api";

import SkeletonCard from "@/src/components/SkeletonCard";

import { filterPosts } from "@/src/lib/posts";

export default function DashboardPage() {
  const PER_PAGE = 10;

  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    fetchPosts()
      .then((posts) => {
        if (!mounted) return;
        setData(posts);
      })
      .catch((e: any) => {
        if (!mounted) return;
        setError(e?.message || "Unknown error");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredData = useMemo(() => filterPosts(data, query), [data, query]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredData.slice(start, start + PER_PAGE);
  }, [filteredData, page]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />

        <div className="mx-auto max-w-7xl p-4 space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
          </div>

          {!loading && !error && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Showing {filteredData.length} results
              </div>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title or body…"
                className="w-full sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
              />
            </div>
          )}

          {loading && (
            <div className="grid gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-red-600">
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {pageItems.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 text-sm text-zinc-600 dark:text-zinc-300">
                  No results found for:{" "}
                  <span className="font-medium">{query || "-"}</span>
                </div>
              ) : (
                <div className="grid gap-3">
                  {pageItems.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition"
                    >
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Post #{post.id}
                      </div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                        {post.body}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={(p) => setPage(p)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
