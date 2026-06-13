import {
  NextRequest,
  NextResponse
} from "next/server";

import { supabase }
  from "@/lib/supabase";

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const {
      user_id,
      quiz_id,
      reaction
    } = body;

    if (
      !user_id ||
      !quiz_id ||
      !reaction
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing data"
        },
        {
          status: 400
        }
      );
    }

    if (
      reaction !== "like" &&
      reaction !==
        "dislike"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid reaction"
        },
        {
          status: 400
        }
      );
    }

    const {
      data: existing
    } = await supabase
      .from(
        "reactions"
      )
      .select("*")
      .eq(
        "user_id",
        user_id
      )
      .eq(
        "quiz_id",
        quiz_id
      )
      .single();

    if (existing) {
      await supabase
        .from(
          "reactions"
        )
        .update({
          reaction
        })
        .eq(
          "id",
          existing.id
        );
    } else {
      await supabase
        .from(
          "reactions"
        )
        .insert({
          user_id,
          quiz_id,
          reaction
        });
    }

    return NextResponse.json({
      success: true
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