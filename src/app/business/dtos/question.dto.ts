export interface QuestionDto {
    id: string,
    text: string,
    answers: string[],
    correctAnswerIndex: number,
    quizId: string
}
