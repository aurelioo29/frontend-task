import { describe, it, expect } from "vitest";
import { filterPosts } from "./posts";
import type { Post } from "./api";

const sample: Post[] = [
  { userId: 1, id: 1, title: "Hello World", body: "This is a post" },
  { userId: 1, id: 2, title: "React Testing", body: "Vitest is fast" },
  { userId: 2, id: 3, title: "Next.js", body: "App router is cool" },
];

describe("filterPosts", () => {
  it("returns all when query empty", () => {
    const result = filterPosts(sample, "");
    expect(result).toHaveLength(3);
  });

  it("filters by title", () => {
    const result = filterPosts(sample, "react");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters by body", () => {
    const result = filterPosts(sample, "router");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it("is case-insensitive and trims spaces", () => {
    const result = filterPosts(sample, "  HELLO ");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});
