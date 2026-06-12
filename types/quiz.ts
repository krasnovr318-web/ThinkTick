export type ReactionType =
| "good"
| "normal"
| "upset"
| "angry";

export interface QuizAnswer {
id: string;

text: string;

isCorrect: boolean;
}

export interface QuizQuestion {
id: string;

question: string;

answers: QuizAnswer[];
}

export interface Quiz {
id: string;

title: string;

description: string;

authorId: string;

createdAt: string;

updatedAt: string;

questions: QuizQuestion[];

reactions: {
good: number;
normal: number;
upset: number;
angry: number;
};
}

export interface CreateQuizRequest {
title: string;

description: string;

questions: QuizQuestion[];
}

export interface UpdateQuizRequest {
id: string;

title: string;

description: string;

questions: QuizQuestion[];
}
