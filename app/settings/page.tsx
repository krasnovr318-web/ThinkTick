"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function SettingsPage() {
  const [theme, setTheme] =
    useState("light");

  const [accent, setAccent] =
    useState("blue");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    const savedAccent =
      localStorage.getItem(
        "accent"
      );

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute(
        "data-theme",
        savedTheme
      );
    }

    if (savedAccent) {
      setAccent(savedAccent);
      document.documentElement.setAttribute(
        "data-accent",
        savedAccent
      );
    }
  }, []);

  const changeTheme = (
    value: string
  ) => {
    setTheme(value);

    localStorage.setItem(
      "theme",
      value
    );

    document.documentElement.setAttribute(
      "data-theme",
      value
    );
  };

  const changeAccent = (
    value: string
  ) => {
    setAccent(value);

    localStorage.setItem(
      "accent",
      value
    );

    document.documentElement.setAttribute(
      "data-accent",
      value
    );
  };

  return (
    <AuthGuard>
      <main className="min-h-screen px-6 py-12">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl font-bold mb-10">
            Settings
          </h1>

          <div className="card p-8 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Theme
            </h2>

            <div className="flex gap-4">

              <button
                onClick={() =>
                  changeTheme(
                    "light"
                  )
                }
                className="primary-btn"
              >
                Light
              </button>

              <button
                onClick={() =>
                  changeTheme(
                    "dark"
                  )
                }
                className="primary-btn"
              >
                Dark
              </button>

            </div>

          </div>

          <div className="card p-8">

            <h2 className="text-2xl font-bold mb-6">
              Accent Color
            </h2>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  changeAccent(
                    "blue"
                  )
                }
                className="primary-btn"
              >
                Blue
              </button>

              <button
                onClick={() =>
                  changeAccent(
                    "green"
                  )
                }
                className="primary-btn"
              >
                Green
              </button>

              <button
                onClick={() =>
                  changeAccent(
                    "purple"
                  )
                }
                className="primary-btn"
              >
                Purple
              </button>

            </div>

          </div>

        </div>

      </main>
    </AuthGuard>
  );
}