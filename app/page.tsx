"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-white">
      <h2 className="text-2xl font-bold">
        Welcome to Zemen Bazaar Referral MVP
      </h2>
      <p className="text-blue-600">Choose your role to login or signup:</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <Link href="/user/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            User Login
          </Link>
          <Link href="/user/signup" className="bg-green-500 text-white px-4 py-2 rounded">
            User Signup
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link href="/seller/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Seller Login
          </Link>
          <Link href="/seller/signup" className="bg-green-500 text-white px-4 py-2 rounded">
            Seller Signup
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link href="/agent/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Agent Login
          </Link>
          <Link href="/agent/signup" className="bg-green-500 text-white px-4 py-2 rounded">
            Agent Signup
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <Link href="/admin/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
