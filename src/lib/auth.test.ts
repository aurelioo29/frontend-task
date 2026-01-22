import { describe, it, expect } from "vitest";
import { login } from "./auth";

describe("Mock login", () => {
  it("returns user for valid credentials", () => {
    const user = login("admin@test.com", "password123");
    expect(user).not.toBeNull();
    expect(user?.email).toBe("admin@test.com");
  });

  it("returns null for invalid credentials", () => {
    const user = login("wrong@test.com", "nope");
    expect(user).toBeNull();
  });
});
