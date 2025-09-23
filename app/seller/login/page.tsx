"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set role as "seller" in cookie
    const res = await fetch("/api/auth/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "seller" }),
    });

    if (res.ok) {
      // Redirect to Seller Dashboard after login
      router.push("/seller/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
      <h2 className="text-2xl font-bold">Seller Login</h2>

      <form className="flex flex-col space-y-2" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Seller Login
        </button>
      </form>
    </div>
  );
}
