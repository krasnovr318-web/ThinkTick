import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } =
      await supabase
        .from("quizzes")
        .select(`
          *,
          users (
            username
          )
        `)
        .order(
          "created_at",
          {
            ascending: false
          }
        );

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
      quizzes: data
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

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const {
      title,
      description,
      author_id,
      questions
    } = body;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quiz title is required"
        },
        {
          status: 400
        }
      );
    }

    if (
      !questions ||
      questions.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quiz must contain questions"
        },
        {
          status: 400
        }
      );
    }

    const {
      data: quiz,
      error: quizError
    } = await supabase
      .from("quizzes")
      .insert({
        title,
        description,
        author_id
      })
      .select()
      .single();

    if (
      quizError ||
      !quiz
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            quizError?.message
        },
        {
          status: 500
        }
      );
    }

    for (
      let i = 0;
      i < questions.length;
      i++
    ) {
      const question =
        questions[i];

      const {
        data:
          createdQuestion,
        error:
          questionError
      } =
        await supabase
          .from(
            "questions"
          )
          .insert({
            quiz_id:
              quiz.id,
            question_text:
              question.question_text,
            question_order:
              i + 1
          })
          .select()
          .single();

      if (
        questionError ||
        !createdQuestion
      ) {
        continue;
      }

      for (
        let j = 0;
        j <
        question.answers
          .length;
        j++
      ) {
        const answer =
          question.answers[
            j
          ];

        await supabase
          .from(
            "answers"
          )
          .insert({
            question_id:
              createdQuestion.id,
            answer_text:
              answer.answer_text,
            is_correct:
              answer.is_correct,
            answer_order:
              j + 1
          });
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Quiz created successfully",
      quizId: quiz.id
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