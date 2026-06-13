export interface QuizResult {
  id: string;

  quiz_id: string;

  user_id: string | null;

  score: number;

  total_questions: number;

  created_at: string;
}

export interface CreateQuizResult {
  quiz_id: string;

  user_id: string | null;

  score: number;

  total_questions: number;
}

export interface QuizStatistics {
  attempts: number;

  average_score: number;

  best_score: number;

  worst_score: number;

  last_attempt_at: string | null;
}