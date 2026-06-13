import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const {
      data,
      error
    } = await supabase
      .from("quizzes")
      .select(`
        *,
        questions (
          *,
          answers (*)
        )
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quiz not found"
        },
        {
          status: 404
        }
      );
    }

    return NextResponse.json({
      success: true,
      quiz: data
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

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const body =
      await request.json();

    const {
      title,
      description
    } = body;

    const {
      data,
      error
    } = await supabase
      .from("quizzes")
      .update({
        title,
        description
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to update quiz"
        },
        {
          status: 500
        }
      );
    }

    return NextResponse.json({
      success: true,
      quiz: data
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

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    const {
      data: questions
    } = await supabase
      .from("questions")
      .select("id")
      .eq("quiz_id", id);

    if (questions) {
      for (const question of questions) {
        await supabase
          .from("answers")
          .delete()
          .eq(
            "question_id",
            question.id
          );
      }

      await supabase
        .from("questions")
        .delete()
        .eq(
          "quiz_id",
          id
        );
    }

    const { error } =
      await supabase
        .from("quizzes")
        .delete()
        .eq("id", id);

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
        "Quiz deleted successfully"
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