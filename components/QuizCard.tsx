"use client";

import Link from "next/link";

interface QuizCardProps {
  id: string;
  title: string;
  description?: string;
  author?: string;
  createdAt?: string;
  likes?: number;
  dislikes?: number;
}

export default function QuizCard({
  id,
  title,
  description,
  author,
  createdAt,
  likes = 0,
  dislikes = 0
}: QuizCardProps) {
  return (
    <div className="card p-6 flex flex-col h-full">

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="opacity-70 mb-6 flex-1">
        {description ||
          "No description provided."}
      </p>

      <div className="space-y-2 mb-6 text-sm opacity-70">

        <div>
          <strong>ID:</strong>{" "}
          {id}
        </div>

        {author && (
          <div>
            <strong>Author:</strong>{" "}
            {author}
          </div>
        )}

        {createdAt && (
          <div>
            <strong>Created:</strong>{" "}
            {new Date(
              createdAt
            ).toLocaleDateString()}
          </div>
        )}

      </div>

      <div className="flex items-center justify-between mb-6">

        <div className="flex gap-4">

          <span>
            👍 {likes}
          </span>

          <span>
            👎 {dislikes}
          </span>

        </div>

      </div>

      <Link
        href={`/quiz/${id}`}
        className="primary-btn text-center"
      >
        Open Quiz
      </Link>

    </div>
  );
}