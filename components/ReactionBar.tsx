"use client";

import { useState } from "react";

type Props = {
  quizId: string;
  userId: string;

  initialCounts?: {
    good: number;
    normal: number;
    upset: number;
    angry: number;
  };
};

export default function ReactionBar({
  quizId,
  userId,
  initialCounts = {
    good: 0,
    normal: 0,
    upset: 0,
    angry: 0
  }
}: Props) {
  const [counts, setCounts] =
    useState(initialCounts);

  const sendReaction = async (
    type:
      | "good"
      | "normal"
      | "upset"
      | "angry"
  ) => {
    try {
      const response =
        await fetch(
          "/api/reactions",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              quizId,
              userId,
              type
            })
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      const statsResponse =
        await fetch(
          `/api/reactions?quizId=${quizId}`
        );

      const statsData =
        await statsResponse.json();

      if (statsData.success) {
        setCounts(
          statsData.reactions
        );
      }
    } catch {
      alert(
        "Failed to send reaction"
      );
    }
  };

  return (
    <div className="card">

      <h3 className="text-xl font-semibold mb-4">
        Reactions
      </h3>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={() =>
            sendReaction("good")
          }
          className="flex items-center gap-2 hover:scale-105 transition"
        >
          <img
            src="/pic/good reaction.png"
            alt="Good"
            width={40}
            height={40}
          />

          <span>
            {counts.good}
          </span>
        </button>

        <button
          onClick={() =>
            sendReaction("normal")
          }
          className="flex items-center gap-2 hover:scale-105 transition"
        >
          <img
            src="/pic/normal reaction.png"
            alt="Normal"
            width={40}
            height={40}
          />

          <span>
            {counts.normal}
          </span>
        </button>

        <button
          onClick={() =>
            sendReaction("upset")
          }
          className="flex items-center gap-2 hover:scale-105 transition"
        >
          <img
            src="/pic/upset reaction.png"
            alt="Upset"
            width={40}
            height={40}
          />

          <span>
            {counts.upset}
          </span>
        </button>

        <button
          onClick={() =>
            sendReaction("angry")
          }
          className="flex items-center gap-2 hover:scale-105 transition"
        >
          <img
            src="/pic/angry reaction.png"
            alt="Angry"
            width={40}
            height={40}
          />

          <span>
            {counts.angry}
          </span>
        </button>

      </div>

    </div>
  );
}