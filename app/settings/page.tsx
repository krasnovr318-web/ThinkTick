"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const colors = [
{ name: "Beige", value: "#d6c0a8" },
{ name: "Gray", value: "#6b7280" },
{ name: "Green", value: "#22c55e" },
{ name: "Blue", value: "#3b82f6" },
{ name: "Red", value: "#ef4444" },
{ name: "Pink", value: "#ec4899" },
{ name: "Purple", value: "#8b5cf6" },
{ name: "Cyan", value: "#06b6d4" }
];

export default function SettingsPage() {
const [darkMode, setDarkMode] =
useState(false);

const [primaryColor, setPrimaryColor] =
useState("#d6c0a8");

useEffect(() => {
const savedTheme =
localStorage.getItem("theme");


const savedColor =
  localStorage.getItem("primaryColor");

if (savedTheme === "dark") {
  document.documentElement.classList.add(
    "dark"
  );

  setDarkMode(true);
}

if (savedColor) {
  document.documentElement.style.setProperty(
    "--primary-color",
    savedColor
  );

  setPrimaryColor(savedColor);
}


}, []);

const toggleTheme = () => {
const html = document.documentElement;


if (darkMode) {
  html.classList.remove("dark");

  localStorage.setItem(
    "theme",
    "light"
  );
} else {
  html.classList.add("dark");

  localStorage.setItem(
    "theme",
    "dark"
  );
}

setDarkMode(!darkMode);


};

const changeColor = (color: string) => {
setPrimaryColor(color);


document.documentElement.style.setProperty(
  "--primary-color",
  color
);

localStorage.setItem(
  "primaryColor",
  color
);


};

return ( <main className="min-h-screen p-6"> <div className="max-w-4xl mx-auto">


    <Link
      href="/"
      className="inline-block mb-8"
    >
      ← Back
    </Link>

    <div className="flex items-center gap-4 mb-10">

      <img
        src="/pic/setting.png"
        alt="Settings"
        width={80}
        height={80}
      />

      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="opacity-70">
          Customize ThinkTick
        </p>
      </div>

    </div>

    <div className="card mb-8">

      <h2 className="text-2xl font-semibold mb-4">
        Theme
      </h2>

      <button
        onClick={toggleTheme}
        className="primary-btn"
      >
        {darkMode
          ? "Switch to Light Mode"
          : "Switch to Dark Mode"}
      </button>

    </div>

    <div className="card">

      <h2 className="text-2xl font-semibold mb-4">
        Primary Color
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() =>
              changeColor(color.value)
            }
            className="p-4 rounded-xl border text-center"
            style={{
              backgroundColor:
                color.value
            }}
          >
            {color.name}
          </button>
        ))}

      </div>

      <div className="mt-6">
        Current Color:
        <span
          className="ml-2 font-bold"
          style={{
            color: primaryColor
          }}
        >
          {primaryColor}
        </span>
      </div>

    </div>

  </div>
</main>


);
}
