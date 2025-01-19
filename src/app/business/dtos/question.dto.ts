import { Answer } from "./answer"

export interface QuestionDto {
    id: string,
    text: string,
    answer: Answer,
    correctAnswerIndex: number,
    quizId: string
}
