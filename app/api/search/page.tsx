"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import SearchBar from "@/components/SearchBar";

interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function SearchPage() {
  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [quizzes, setQuizzes] =
    useState<Quiz[]>([]);

  const [filteredQuizzes, setFilteredQuizzes] =
    useState<Quiz[]>([]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  useEffect(() => {
    const query =
      search.toLowerCase();

    const filtered =
      quizzes.filter(
        (quiz) =>
          quiz.title
            .toLowerCase()
            .includes(query) ||
          quiz.id
            .toLowerCase()
            .includes(query)
      );

    setFilteredQuizzes(filtered);
  }, [search, quizzes]);

  const loadQuizzes =
    async () => {
      try {
        const response =
          await fetch(
            "/api/quizzes"
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          setQuizzes(
            data.quizzes
          );

          setFilteredQuizzes(
            data.quizzes
          );
        }
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <img
            src="/pic/search.png"
            alt="Search"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Search Quizzes
          </h1>

          <p className="opacity-70">
            Find quizzes by title
            or ID.
          </p>

        </div>

        {/* Search */}
        <div className="mb-10">

          <SearchBar
            value={search}
            onChange={
              setSearch
            }
            placeholder="Search by title or ID..."
          />

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">
              Loading...
            </h2>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          filteredQuizzes.length ===
            0 && (
            <div className="text-center py-12">

              <h2 className="text-2xl font-bold mb-2">
                Nothing found
              </h2>

              <p className="opacity-70">
                Try another search.
              </p>

            </div>
          )}

        {/* Results */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredQuizzes.map(
            (quiz) => (
              <div
                key={quiz.id}
                className="card p-6"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {quiz.title}
                </h2>

                <p className="opacity-70 mb-4">
                  {quiz.description}
                </p>

                <p className="text-sm opacity-50 mb-6">
                  ID: {quiz.id}
                </p>

                <Link
                  href={`/quiz/${quiz.id}`}
                  className="primary-btn block text-center"
                >
                  Open Quiz
                </Link>

              </div>
            )
          )}

        </div>

      </div>

    </main>
  );
}