export type AuthUser = { email: string };

const AUTH_KEY = "auth_user";

const MOCK_EMAIL = "admin@test.com";
const MOCK_PASSWORD = "password123";

export function login(email: string, password: string): AuthUser | null {
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) return { email };

  return null;
}

export function saveUser(user: AuthUser) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function clearUser() {
  localStorage.removeItem(AUTH_KEY);
}
