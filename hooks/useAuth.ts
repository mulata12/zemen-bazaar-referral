"use client";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRole() {
      const res = await fetch("/api/auth/role");
      const data = await res.json();
      setRole(data.role);
    }
    fetchRole();
  }, []);

  return role;
}
