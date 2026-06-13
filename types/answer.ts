export interface Answer {
  id: string;
  question_id: string;

  answer_text: string;

  is_correct: boolean;

  answer_order: number;
}

export interface CreateAnswer {
  answer_text: string;

  is_correct: boolean;

  answer_order: number;
}

export interface AnswerSubmission {
  question_id: string;

  answer_ids: string[];
}