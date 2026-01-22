const KEY = "theme";

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(KEY) as "light" | "dark") || "light";
}

export function applyTheme(theme: "light" | "dark") {
  localStorage.setItem(KEY, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function initTheme() {
  const t = getTheme();
  document.documentElement.classList.toggle("dark", t === "dark");
}
