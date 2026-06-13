export interface Question {
  id: string;
  quiz_id: string;

  question_text: string;

  question_order: number;

  created_at: string;
}

export interface CreateQuestion {
  question_text: string;

  question_order: number;
}

export interface QuestionWithAnswers {
  id: string;
  quiz_id: string;

  question_text: string;

  question_order: number;

  created_at: string;

  answers: {
    id: string;
    answer_text: string;
    is_correct: boolean;
    answer_order: number;
  }[];
}