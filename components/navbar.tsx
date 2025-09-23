"use client";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const role = useAuth();

  return (
    <header className="p-4 bg-blue-600 text-white">
      <nav className="flex justify-evenly items-center font-semibold">
        <h1 className="font-bold">Zemen Bazaar Referral</h1>
        <Link href="/">Home</Link>
        <Link href="/user/login">User</Link>
        <Link href="/seller/login">Seller</Link>
        <Link href="/agent/login">Agent</Link>
        {role === "admin" && <Link href="/admin/dashboard">Admin</Link>}
      </nav>
    </header>
  );
}


