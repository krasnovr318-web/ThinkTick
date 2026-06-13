"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      return;
    }

    try {
      setUser(
        JSON.parse(savedUser)
      );
    } catch {
      localStorage.removeItem(
        "user"
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const linkClass = (
    href: string
  ) => {
    return pathname === href
      ? "font-bold underline"
      : "opacity-80 hover:opacity-100";
  };

  return (
    <header className="border-b backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          ThinkTick
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">

          <Link
            href="/"
            className={linkClass("/")}
          >
            Home
          </Link>

          <Link
            href="/create"
            className={linkClass(
              "/create"
            )}
          >
            Create
          </Link>

          <Link
            href="/search"
            className={linkClass(
              "/search"
            )}
          >
            Search
          </Link>

          {user && (
            <>
              <Link
                href="/profile"
                className={linkClass(
                  "/profile"
                )}
              >
                Profile
              </Link>

              <Link
                href="/settings"
                className={linkClass(
                  "/settings"
                )}
              >
                Settings
              </Link>
            </>
          )}

        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <span className="font-medium">
                {user.username}
              </span>

              <button
                onClick={logout}
                className="primary-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="primary-btn"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}