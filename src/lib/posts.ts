import type { Post } from "./api";

export function filterPosts(posts: Post[], query: string): Post[] {
  const q = query.trim().toLowerCase();
  if (!q) return posts;

  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q),
  );
}
