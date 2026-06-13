"use client";

import { useEffect, useState } from "react";

interface Answer {
  id: string;
  answer_text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  question_text: string;
  answers: Answer[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function QuizPage({
  params
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const [quiz, setQuiz] =
    useState<Quiz | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedAnswers, setSelectedAnswers] =
    useState<
      Record<string, string[]>
    >({});

  const [score, setScore] =
    useState<number | null>(
      null
    );

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz =
    async () => {
      try {
        const { id } =
          await params;

        const response =
          await fetch(
            `/api/quizzes/${id}`
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          setQuiz(
            data.quiz
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

  const toggleAnswer = (
    questionId: string,
    answerId: string
  ) => {
    setSelectedAnswers(
      (previous) => {
        const current =
          previous[
            questionId
          ] || [];

        const exists =
          current.includes(
            answerId
          );

        return {
          ...previous,
          [questionId]:
            exists
              ? current.filter(
                  (
                    id
                  ) =>
                    id !==
                    answerId
                )
              : [
                  ...current,
                  answerId
                ]
        };
      }
    );
  };

  const finishQuiz = () => {
    if (!quiz) {
      return;
    }

    let correct = 0;

    for (
      const question of quiz.questions
    ) {
      const selected =
        selectedAnswers[
          question.id
        ] || [];

      const rightAnswers =
        question.answers
          .filter(
            (
              answer
            ) =>
              answer.is_correct
          )
          .map(
            (
              answer
            ) =>
              answer.id
          );

      const isCorrect =
        selected.length ===
          rightAnswers.length &&
        selected.every(
          (
            answerId
          ) =>
            rightAnswers.includes(
              answerId
            )
        );

      if (isCorrect) {
        correct++;
      }
    }

    const result =
      Math.round(
        (correct /
          quiz.questions
            .length) *
          100
      );

    setScore(result);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Quiz not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="card p-8 mb-10">

          <h1 className="text-5xl font-bold mb-4">
            {quiz.title}
          </h1>

          <p className="opacity-70">
            {quiz.description}
          </p>

        </div>

        {quiz.questions.map(
          (
            question,
            questionIndex
          ) => (
            <div
              key={
                question.id
              }
              className="card p-8 mb-8"
            >

              <h2 className="text-2xl font-bold mb-6">
                Question{" "}
                {questionIndex +
                  1}
              </h2>

              <p className="text-lg mb-8">
                {
                  question.question_text
                }
              </p>

              <div className="space-y-4">

                {question.answers.map(
                  (
                    answer
                  ) => (
                    <label
                      key={
                        answer.id
                      }
                      className="flex gap-4 items-center border rounded p-4 cursor-pointer"
                    >

                      <input
                        type="checkbox"
                        checked={
                          (
                            selectedAnswers[
                              question
                                .id
                            ] ||
                            []
                          ).includes(
                            answer.id
                          )
                        }
                        onChange={() =>
                          toggleAnswer(
                            question.id,
                            answer.id
                          )
                        }
                      />

                      <span>
                        {
                          answer.answer_text
                        }
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>
          )
        )}

        {score === null ? (
          <div className="text-center">

            <button
              onClick={
                finishQuiz
              }
              className="primary-btn"
            >
              Finish Quiz
            </button>

          </div>
        ) : (
          <div className="card p-10 text-center">

            <h2 className="text-4xl font-bold mb-6">
              Result
            </h2>

            <p className="text-6xl font-bold mb-4">
              {score}%
            </p>

            <p className="opacity-70">
              You completed
              the quiz.
            </p>

          </div>
        )}

      </div>
    </main>
  );
}