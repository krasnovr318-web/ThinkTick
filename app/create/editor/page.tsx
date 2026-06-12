"use client";

import { useState } from "react";
import Link from "next/link";

type Answer = {
text: string;
isCorrect: boolean;
};

type Question = {
question: string;
answers: Answer[];
};

export default function EditorPage() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const [questions, setQuestions] = useState<Question[]>([
{
question: "",
answers: [
{ text: "", isCorrect: false },
{ text: "", isCorrect: false }
]
}
]);

const updateQuestion = (
questionIndex: number,
value: string
) => {
const copy = [...questions];
copy[questionIndex].question = value;
setQuestions(copy);
};

const updateAnswer = (
questionIndex: number,
answerIndex: number,
value: string
) => {
const copy = [...questions];
copy[questionIndex].answers[answerIndex].text = value;
setQuestions(copy);
};

const toggleCorrectAnswer = (
questionIndex: number,
answerIndex: number
) => {
const copy = [...questions];

```
copy[questionIndex]
  .answers[answerIndex]
  .isCorrect =
  !copy[questionIndex]
    .answers[answerIndex]
    .isCorrect;

setQuestions(copy);
```

};

const addAnswer = (questionIndex: number) => {
const copy = [...questions];

```
copy[questionIndex].answers.push({
  text: "",
  isCorrect: false
});

setQuestions(copy);
```

};

const addQuestion = () => {
if (questions.length >= 31) return;

```
setQuestions([
  ...questions,
  {
    question: "",
    answers: [
      {
        text: "",
        isCorrect: false
      },
      {
        text: "",
        isCorrect: false
      }
    ]
  }
]);
```

};

const removeQuestion = (
questionIndex: number
) => {
if (questions.length === 1) return;

```
const copy = questions.filter(
  (_, index) => index !== questionIndex
);

setQuestions(copy);
```

};

const saveQuiz = () => {
console.log({
title,
description,
questions
});

```
alert(
  "Quiz saved! Database connection will be added later."
);
```

};

return ( <main className="min-h-screen p-6"> <div className="max-w-5xl mx-auto">

```
    <Link
      href="/create"
      className="inline-block mb-8"
    >
      ← Back
    </Link>

    <h1 className="text-4xl font-bold mb-8">
      Quiz Editor
    </h1>

    <div className="card mb-8">

      <input
        className="w-full p-3 border rounded mb-4"
        placeholder="Quiz title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full p-3 border rounded"
        rows={4}
        placeholder="Quiz description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

    </div>

    {questions.map(
      (question, questionIndex) => (
        <div
          key={questionIndex}
          className="card mb-8"
        >
          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-semibold">
              Question {questionIndex + 1}
            </h2>

            <button
              onClick={() =>
                removeQuestion(
                  questionIndex
                )
              }
            >
              <img
                src="/pic/trashcan.png"
                alt="Delete"
                width={32}
                height={32}
              />
            </button>

          </div>

          <input
            className="w-full p-3 border rounded mb-4"
            placeholder="Write your question"
            value={question.question}
            onChange={(e) =>
              updateQuestion(
                questionIndex,
                e.target.value
              )
            }
          />

          <div className="space-y-3">

            {question.answers.map(
              (
                answer,
                answerIndex
              ) => (
                <div
                  key={answerIndex}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={
                      answer.isCorrect
                    }
                    onChange={() =>
                      toggleCorrectAnswer(
                        questionIndex,
                        answerIndex
                      )
                    }
                  />

                  <input
                    className="flex-1 p-3 border rounded"
                    placeholder={`Answer ${
                      answerIndex + 1
                    }`}
                    value={answer.text}
                    onChange={(e) =>
                      updateAnswer(
                        questionIndex,
                        answerIndex,
                        e.target.value
                      )
                    }
                  />
                </div>
              )
            )}

          </div>

          <button
            onClick={() =>
              addAnswer(questionIndex)
            }
            className="primary-btn mt-4"
          >
            Add Answer
          </button>

        </div>
      )
    )}

    <div className="flex flex-wrap gap-4">

      <button
        onClick={addQuestion}
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

    <div className="mt-6 opacity-70">
      Questions:
      {" "}
      {questions.length}
      {" "}
      / 31
    </div>

  </div>
</main>
```

);
}
