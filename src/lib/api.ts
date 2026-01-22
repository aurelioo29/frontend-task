export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPostById(id: number): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}
