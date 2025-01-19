import { Answer } from "./answer"

export interface QuestionDto {
    id: string,
    text: string,
    answer: string[],
    correctAnswerIndex: number,
    quizId: string
}
