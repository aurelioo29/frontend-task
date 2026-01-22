"use client";

import { login } from "@/src/lib/auth";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const { setUser } = useAuth();

  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = login(email, password);
    if (!user) {
      setError("Invalid credentials. Try admin@test.com / 123456");
      setLoading(false);
      return;
    }

    setUser(user);
    router.replace(next);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border p-6 space-y-4"
      >
        <div>
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-gray-500">Mock auth. No FBI required.</p>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <input
            className="w-full rounded-xl border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm">Password</label>

          <div className="relative">
            <input
              className="w-full rounded-xl border px-3 py-2 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-600 hover:text-black cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-black text-white py-2 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Login"}
        </button>

        <p className="text-xs text-gray-500">
          Demo: <span className="font-medium">admin@test.com</span> /{" "}
          <span className="font-medium">123456</span>
        </p>
      </form>
    </div>
  );
}
