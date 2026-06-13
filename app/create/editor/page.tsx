"use client";

import {
  useEffect,
  useState
} from "react";

interface Answer {
  answer_text: string;
  is_correct: boolean;
}

interface Question {
  question_text: string;
  answers: Answer[];
}

export default function EditorPage() {
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription
  ] = useState("");

  const [userId, setUserId] =
    useState("");

  const [questions, setQuestions] =
    useState<Question[]>([
      {
        question_text: "",
        answers: [
          {
            answer_text: "",
            is_correct: false
          },
          {
            answer_text: "",
            is_correct: false
          }
        ]
      }
    ]);

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (savedUser) {
      const user =
        JSON.parse(savedUser);

      setUserId(user.id);
    }
  }, []);

  const addQuestion = () => {
    if (questions.length >= 31) {
      alert(
        "Maximum number of questions is 31."
      );
      return;
    }

    setQuestions([
      ...questions,
      {
        question_text: "",
        answers: [
          {
            answer_text: "",
            is_correct: false
          },
          {
            answer_text: "",
            is_correct: false
          }
        ]
      }
    ]);
  };

  const removeQuestion = (
    questionIndex: number
  ) => {
    const updated =
      questions.filter(
        (_, index) =>
          index !==
          questionIndex
      );

    setQuestions(updated);
  };

  const updateQuestion = (
    questionIndex: number,
    value: string
  ) => {
    const updated =
      [...questions];

    updated[
      questionIndex
    ].question_text =
      value;

    setQuestions(updated);
  };

  const addAnswer = (
    questionIndex: number
  ) => {
    const updated =
      [...questions];

    updated[
      questionIndex
    ].answers.push({
      answer_text: "",
      is_correct: false
    });

    setQuestions(updated);
  };

  const removeAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const updated =
      [...questions];

    if (
      updated[
        questionIndex
      ].answers.length <= 2
    ) {
      alert(
        "Question must have at least 2 answers."
      );
      return;
    }

    updated[
      questionIndex
    ].answers =
      updated[
        questionIndex
      ].answers.filter(
        (_, index) =>
          index !==
          answerIndex
      );

    setQuestions(updated);
  };

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const updated =
      [...questions];

    updated[
      questionIndex
    ].answers[
      answerIndex
    ].answer_text =
      value;

    setQuestions(updated);
  };

  const toggleCorrectAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const updated =
      [...questions];

    updated[
      questionIndex
    ].answers[
      answerIndex
    ].is_correct =
      !updated[
        questionIndex
      ].answers[
        answerIndex
      ].is_correct;

    setQuestions(updated);
  };

  const saveQuiz =
    async () => {
      if (
        !title.trim()
      ) {
        alert(
          "Enter quiz title."
        );
        return;
      }

      if (!userId) {
        alert(
          "You must login."
        );
        return;
      }

      for (
        const question of questions
      ) {
        if (
          !question.question_text.trim()
        ) {
          alert(
            "Every question must have text."
          );
          return;
        }

        const correct =
          question.answers.filter(
            (
              answer
            ) =>
              answer.is_correct
          );

        if (
          correct.length ===
          0
        ) {
          alert(
            "Every question must have at least one correct answer."
          );
          return;
        }
      }

      try {
        const response =
          await fetch(
            "/api/quizzes",
            {
              method:
                "POST",
              headers:
                {
                  "Content-Type":
                    "application/json"
                },
              body:
                JSON.stringify(
                  {
                    title,
                    description,
                    author_id:
                      userId,
                    questions
                  }
                )
            }
          );

        const data =
          await response.json();

        if (
          !data.success
        ) {
          alert(
            data.message
          );
          return;
        }

        alert(
          "Quiz created successfully!"
        );

        setTitle("");
        setDescription("");

        setQuestions([
          {
            question_text:
              "",
            answers: [
              {
                answer_text:
                  "",
                is_correct:
                  false
              },
              {
                answer_text:
                  "",
                is_correct:
                  false
              }
            ]
          }
        ]);

      } catch (
        error
      ) {
        console.error(
          error
        );

        alert(
          "Failed to save quiz."
        );
      }
    };

  return (
    <main className="min-h-screen px-6 py-12">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">

          <img
            src="/pic/create-test.png"
            alt="Editor"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Quiz Editor
          </h1>

          <p className="opacity-70">
            Build your quiz
            from scratch.
          </p>

        </div>

        <div className="card p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Quiz Information
          </h2>

          <input
            type="text"
            placeholder="Quiz title"
            className="w-full p-3 border rounded mb-4"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded min-h-32"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

        </div>

        {questions.map(
          (
            question,
            questionIndex
          ) => (
            <div
              key={
                questionIndex
              }
              className="card p-8 mb-8"
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Question{" "}
                  {questionIndex +
                    1}
                </h2>

                {questions.length >
                  1 && (
                  <button
                    onClick={() =>
                      removeQuestion(
                        questionIndex
                      )
                    }
                    className="px-4 py-2 border rounded"
                  >
                    Delete
                  </button>
                )}

              </div>

              <input
                type="text"
                placeholder="Enter question..."
                className="w-full p-3 border rounded mb-6"
                value={
                  question.question_text
                }
                onChange={(e) =>
                  updateQuestion(
                    questionIndex,
                    e.target
                      .value
                  )
                }
              />

              <div className="space-y-4">

                {question.answers.map(
                  (
                    answer,
                    answerIndex
                  ) => (
                    <div
                      key={
                        answerIndex
                      }
                      className="flex gap-4 items-center"
                    >

                      <input
                        type="checkbox"
                        checked={
                          answer.is_correct
                        }
                        onChange={() =>
                          toggleCorrectAnswer(
                            questionIndex,
                            answerIndex
                          )
                        }
                      />

                      <input
                        type="text"
                        placeholder={`Answer ${
                          answerIndex +
                          1
                        }`}
                        className="flex-1 p-3 border rounded"
                        value={
                          answer.answer_text
                        }
                        onChange={(e) =>
                          updateAnswer(
                            questionIndex,
                            answerIndex,
                            e.target
                              .value
                          )
                        }
                      />

                      <button
                        onClick={() =>
                          removeAnswer(
                            questionIndex,
                            answerIndex
                          )
                        }
                        className="px-4 py-2 border rounded"
                      >
                        Delete
                      </button>

                    </div>
                  )
                )}

              </div>

              <button
                onClick={() =>
                  addAnswer(
                    questionIndex
                  )
                }
                className="primary-btn mt-6"
              >
                Add Answer
              </button>

            </div>
          )
        )}

        <div className="flex flex-wrap gap-4 justify-center">

          <button
            onClick={
              addQuestion
            }
            className="primary-btn"
          >
            Add Question
          </button>

          <button
            onClick={saveQuiz}
            className="primary-btn"
          >
            Save Quiz
          </button>

        </div>

      </div>

    </main>
  );
}