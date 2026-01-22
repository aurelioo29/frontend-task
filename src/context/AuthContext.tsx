"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthUser, clearUser, getUser, saveUser } from "../lib/auth";

type AuthCtx = {
  user: AuthUser | null;
  isReady: boolean;
  setUser: (u: AuthUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setUserState(getUser());
    setReady(true);
  }, []);

  const setUser = (u: AuthUser | null) => {
    setUserState(u);
    if (u) saveUser(u);
    else clearUser();
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, isReady, setUser, logout }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
