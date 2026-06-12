export type ReactionType =
| "good"
| "normal"
| "upset"
| "angry";

export interface Reaction {
id: string;

quizId: string;

userId: string;

type: ReactionType;

createdAt: string;
}

export interface ReactionCounts {
good: number;

normal: number;

upset: number;

angry: number;
}

export interface CreateReactionRequest {
quizId: string;

type: ReactionType;
}

export interface ReactionResponse {
success: boolean;

message: string;

reactions?: ReactionCounts;
}
