"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Quiz = {
id: number;
title: string;
createdAt: string;
likes: number;
};

const mockQuizzes: Quiz[] = [
{
id: 1001,
title: "World History",
createdAt: "2025-07-01",
likes: 120
},
{
id: 1002,
title: "Basic Mathematics",
createdAt: "2025-07-15",
likes: 250
},
{
id: 1003,
title: "Video Games",
createdAt: "2025-06-20",
likes: 180
},
{
id: 1004,
title: "Chemistry",
createdAt: "2025-08-01",
likes: 75
}
];

export default function SearchPage() {
const [search, setSearch] = useState("");
const [sortBy, setSortBy] = useState("popularity");

const filteredQuizzes = useMemo(() => {
const filtered = mockQuizzes.filter(
(quiz) =>
quiz.title
.toLowerCase()
.includes(search.toLowerCase()) ||
String(quiz.id).includes(search)
);

```
if (sortBy === "popularity") {
  return filtered.sort(
    (a, b) => b.likes - a.likes
  );
}

if (sortBy === "date") {
  return filtered.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

return filtered;
```

}, [search, sortBy]);

return ( <main className="min-h-screen p-6"> <div className="max-w-5xl mx-auto">

```
    <Link
      href="/"
      className="inline-block mb-8"
    >
      ← Back
    </Link>

    <h1 className="text-4xl font-bold mb-2">
      Search Quizzes
    </h1>

    <p className="opacity-70 mb-8">
      Search by quiz ID or title.
    </p>

    <div className="card mb-8">

      <input
        type="text"
        placeholder="Quiz ID or title..."
        className="w-full p-3 border rounded mb-4"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        className="w-full p-3 border rounded"
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value)
        }
      >
        <option value="popularity">
          Sort by popularity
        </option>

        <option value="date">
          Sort by date
        </option>
      </select>

    </div>

    <div className="grid gap-4">

      {filteredQuizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="card"
        >
          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-xl font-semibold">
                {quiz.title}
              </h2>

              <p className="opacity-70">
                ID: {quiz.id}
              </p>

              <p className="opacity-70">
                Created: {quiz.createdAt}
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">

                <img
                  src="/pic/good reaction.png"
                  alt="Likes"
                  width={28}
                  height={28}
                />

                <span>
                  {quiz.likes}
                </span>

              </div>
            </div>

          </div>
        </div>
      ))}

      {filteredQuizzes.length === 0 && (
        <div className="card text-center">
          No quizzes found.
        </div>
      )}

    </div>

  </div>
</main>
```

);
}
