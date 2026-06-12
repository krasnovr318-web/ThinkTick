"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ReactionBar from "@/components/ReactionBar";

type Answer = {
  id: string;
  answer_text: string;
};

type Question = {
  id: string;
  question_text: string;
  answers: Answer[];
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export default function QuizPage() {
  const params = useParams();

  const [quiz, setQuiz] =
    useState<Quiz | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswers, setSelectedAnswers] =
    useState<Record<string, string[]>>(
      {}
    );

  const [finished, setFinished] =
    useState(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  async function loadQuiz() {
    try {
      const response =
        await fetch(
          `/api/quizzes/${params.id}`
        );

      const data =
        await response.json();

      if (data.success) {
        setQuiz(data.quiz);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function toggleAnswer(
    questionId: string,
    answerId: string
  ) {
    setSelectedAnswers((prev) => {
      const current =
        prev[questionId] || [];

      const exists =
        current.includes(answerId);

      return {
        ...prev,

        [questionId]: exists
          ? current.filter(
              (id) => id !== answerId
            )
          : [...current, answerId]
      };
    });
  }

  function nextQuestion() {
    if (!quiz) return;

    if (
      currentQuestion <
      quiz.questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    } else {
      setFinished(true);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        Loading...
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="p-6">
        Quiz not found.
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">

          <div className="card text-center">

            <h1 className="text-4xl font-bold mb-4">
              Quiz Completed!
            </h1>

            <p className="mb-6">
              Thanks for completing
              the quiz.
            </p>

            <ReactionBar
              quizId={quiz.id}
              userId="demo-user"
            />

          </div>

        </div>
      </main>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <div className="card mb-6">

          <h1 className="text-4xl font-bold">
            {quiz.title}
          </h1>

          <p className="opacity-80 mt-2">
            {quiz.description}
          </p>

        </div>

        <div className="card">

          <div className="mb-4">

            Question
            {" "}
            {currentQuestion + 1}
            {" "}
            /
            {" "}
            {quiz.questions.length}

          </div>

          <h2 className="text-2xl font-semibold mb-6">
            {question.question_text}
          </h2>

          <div className="space-y-3">

            {question.answers.map(
              (answer) => (
                <label
                  key={answer.id}
                  className="flex gap-3 items-center p-3 border rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedAnswers[
                        question.id
                      ]?.includes(
                        answer.id
                      ) || false
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

          <div className="flex justify-between mt-8">

            <button
              onClick={
                previousQuestion
              }
              disabled={
                currentQuestion === 0
              }
              className="primary-btn"
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              className="primary-btn"
            >
              {currentQuestion ===
              quiz.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}