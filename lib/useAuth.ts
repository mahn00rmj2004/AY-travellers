"use client";

import { useEffect, useState } from "react";

export interface AuthUser {
  id?: string;
  email?: string;
  fullName?: string;
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (raw && token) {
        setUser(JSON.parse(raw) as AuthUser);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading };
}
