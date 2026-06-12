import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

const VALID_REACTIONS = [
  "good",
  "normal",
  "upset",
  "angry"
];

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      quizId,
      userId,
      type
    } = body;

    if (
      !quizId ||
      !userId ||
      !type
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields"
        },
        {
          status: 400
        }
      );
    }

    if (
      !VALID_REACTIONS.includes(type)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid reaction type"
        },
        {
          status: 400
        }
      );
    }

    const {
      data: existingReaction
    } = await supabase
      .from("reactions")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("user_id", userId)
      .single();

    if (existingReaction) {
      const {
        error: updateError
      } = await supabase
        .from("reactions")
        .update({
          reaction_type: type
        })
        .eq(
          "id",
          existingReaction.id
        );

      if (updateError) {
        return NextResponse.json(
          {
            success: false,
            message:
              updateError.message
          },
          {
            status: 500
          }
        );
      }

      return NextResponse.json({
        success: true,
        message:
          "Reaction updated"
      });
    }

    const { error } =
      await supabase
        .from("reactions")
        .insert({
          quiz_id: quizId,
          user_id: userId,
          reaction_type: type
        });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.message
        },
        {
          status: 500
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Reaction added"
    });

  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}

export async function GET(
  request: NextRequest
) {
  try {
    const quizId =
      request.nextUrl.searchParams.get(
        "quizId"
      );

    if (!quizId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quiz ID required"
        },
        {
          status: 400
        }
      );
    }

    const { data, error } =
      await supabase
        .from("reactions")
        .select("reaction_type")
        .eq("quiz_id", quizId);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.message
        },
        {
          status: 500
        }
      );
    }

    const statistics = {
      good: 0,
      normal: 0,
      upset: 0,
      angry: 0
    };

    data.forEach(
      (reaction: {
        reaction_type: string;
      }) => {
        if (
          reaction.reaction_type in
          statistics
        ) {
          statistics[
            reaction.reaction_type as keyof typeof statistics
          ]++;
        }
      }
    );

    return NextResponse.json({
      success: true,
      reactions: statistics
    });

  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}