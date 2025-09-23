"use server";

import { cookies } from "next/headers";

export function setRoleCookie(role: string) {
  cookies().set("role", role, {
    httpOnly: true,
    path: "/",
  });
}

export function getRoleCookie(): string | undefined {
  return cookies().get("role")?.value;
}

export function clearRoleCookie() {
  cookies().delete("role");
}


