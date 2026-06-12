import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
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
        message: "Internal server error"
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
    const body = await request.json();

    const {
      title,
      description,
      authorId,
      questions
    } = body;

    if (
      !title ||
      !authorId ||
      !questions ||
      questions.length === 0
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

    const { data: quiz, error: quizError } =
      await supabase
        .from("quizzes")
        .insert({
          title,
          description,
          author_id: authorId
        })
        .select()
        .single();

    if (quizError) {
      return NextResponse.json(
        {
          success: false,
          message:
            quizError.message
        },
        {
          status: 500
        }
      );
    }

    for (
      let questionIndex = 0;
      questionIndex < questions.length;
      questionIndex++
    ) {
      const question =
        questions[questionIndex];

      const {
        data: questionData,
        error: questionError
      } = await supabase
        .from("questions")
        .insert({
          quiz_id: quiz.id,
          question_text:
            question.question,
          position:
            questionIndex + 1
        })
        .select()
        .single();

      if (
        questionError ||
        !questionData
      ) {
        continue;
      }

      for (const answer of question.answers) {
        await supabase
          .from("answers")
          .insert({
            question_id:
              questionData.id,
            answer_text:
              answer.text,
            is_correct:
              answer.isCorrect
          });
      }
    }

    return NextResponse.json({
      success: true,
      quizId: quiz.id
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}