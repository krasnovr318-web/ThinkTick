"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AuthGuard from "@/components/AuthGuard";
import QuizCard from "@/components/QuizCard";

interface User {
  id: string;
  username: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] =
    useState<User | null>(null);

  const [quizzes, setQuizzes] =
    useState<Quiz[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const savedUser =
          localStorage.getItem(
            "user"
          );

        if (!savedUser) {
          return;
        }

        const currentUser =
          JSON.parse(
            savedUser
          );

        setUser(
          currentUser
        );

        const response =
          await fetch(
            "/api/quizzes"
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          const ownQuizzes =
            data.quizzes.filter(
              (
                quiz: any
              ) =>
                quiz.author_id ===
                currentUser.id
            );

          setQuizzes(
            ownQuizzes
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

  if (loading) {
    return (
      <AuthGuard>
        <main className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Loading...
          </h1>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen px-6 py-12">

        <div className="max-w-6xl mx-auto">

          {/* Profile Card */}
          <div className="card p-8 mb-10">

            <div className="flex flex-col md:flex-row items-center gap-8">

              <img
                src="/pic/create-test-profile.png"
                alt="Profile"
                width={120}
                height={120}
              />

              <div>

                <h1 className="text-5xl font-bold mb-3">
                  {user?.username}
                </h1>

                <p className="opacity-70 text-lg">
                  Welcome to
                  ThinkTick
                </p>

              </div>

            </div>

          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="card p-8 text-center">

              <h2 className="text-5xl font-bold mb-4">
                {
                  quizzes.length
                }
              </h2>

              <p className="opacity-70">
                Created
                Quizzes
              </p>

            </div>

            <div className="card p-8 text-center">

              <h2 className="text-5xl font-bold mb-4">
                0
              </h2>

              <p className="opacity-70">
                Completed
                Quizzes
              </p>

            </div>

            <div className="card p-8 text-center">

              <h2 className="text-5xl font-bold mb-4">
                0%
              </h2>

              <p className="opacity-70">
                Average
                Score
              </p>

            </div>

          </div>

          {/* My Quizzes */}
          <div>

            <h2 className="text-4xl font-bold mb-8">
              My Quizzes
            </h2>

            {quizzes.length ===
            0 ? (
              <div className="card p-10 text-center">

                <h3 className="text-2xl font-bold mb-4">
                  No quizzes yet
                </h3>

                <p className="opacity-70 mb-6">
                  Create your
                  first quiz.
                </p>

                <Link
                  href="/create"
                  className="primary-btn inline-block"
                >
                  Create Quiz
                </Link>

              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {quizzes.map(
                  (
                    quiz
                  ) => (
                    <QuizCard
                      key={
                        quiz.id
                      }
                      id={
                        quiz.id
                      }
                      title={
                        quiz.title
                      }
                      description={
                        quiz.description
                      }
                      createdAt={
                        quiz.created_at
                      }
                    />
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </main>
    </AuthGuard>
  );
}