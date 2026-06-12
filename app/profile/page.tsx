"use client";

import Link from "next/link";

const myQuizzes = [
{
id: 1001,
title: "World History",
good: 120,
normal: 15,
upset: 3,
angry: 1
},
{
id: 1002,
title: "Basic Mathematics",
good: 250,
normal: 20,
upset: 2,
angry: 0
}
];

export default function ProfilePage() {
const totalGood = myQuizzes.reduce(
(sum, quiz) => sum + quiz.good,
0
);

const totalBad = myQuizzes.reduce(
(sum, quiz) => sum + quiz.upset + quiz.angry,
0
);

return ( <main className="min-h-screen p-6"> <div className="max-w-6xl mx-auto">


    <Link
      href="/"
      className="inline-block mb-8"
    >
      ← Back
    </Link>

    <div className="flex items-center gap-4 mb-10">

      <img
        src="/pic/create-test-profile.png"
        alt="Profile"
        width={80}
        height={80}
      />

      <div>
        <h1 className="text-4xl font-bold">
          Profile
        </h1>

        <p className="opacity-70">
          Username: DemoUser
        </p>
      </div>

    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-10">

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">
          Statistics
        </h2>

        <p>
          Quizzes Created:
          {" "}
          {myQuizzes.length}
        </p>

        <p>
          Good Reactions:
          {" "}
          {totalGood}
        </p>

        <p>
          Bad Reactions:
          {" "}
          {totalBad}
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">
          Reactions
        </h2>

        <div className="flex items-center gap-3 mb-2">
          <img
            src="/pic/good reaction.png"
            alt="Good"
            width={30}
            height={30}
          />
          <span>{totalGood}</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <img
            src="/pic/upset reaction.png"
            alt="Upset"
            width={30}
            height={30}
          />
          <span>
            {
              myQuizzes.reduce(
                (sum, quiz) =>
                  sum + quiz.upset,
                0
              )
            }
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/pic/angry reaction.png"
            alt="Angry"
            width={30}
            height={30}
          />
          <span>
            {
              myQuizzes.reduce(
                (sum, quiz) =>
                  sum + quiz.angry,
                0
              )
            }
          </span>
        </div>

      </div>

    </div>

    <h2 className="text-3xl font-bold mb-6">
      My Quizzes
    </h2>

    <div className="grid gap-4">

      {myQuizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="card"
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-xl font-semibold">
                {quiz.title}
              </h3>

              <p className="opacity-70">
                ID: {quiz.id}
              </p>
            </div>

            <div className="flex gap-3">

              <Link
                href={`/create/editor?id=${quiz.id}`}
                className="hover:scale-105 transition"
              >
                <img
                  src="/pic/pencil.png"
                  alt="Edit"
                  width={36}
                  height={36}
                />
              </Link>

              <button
                className="hover:scale-105 transition"
              >
                <img
                  src="/pic/trashcan.png"
                  alt="Delete"
                  width={36}
                  height={36}
                />
              </button>

            </div>

          </div>
        </div>
      ))}

    </div>

  </div>
</main>


);
}
