import { CategoryDto } from "./category.dto";

export interface QuizDto {
    id: string,
    name: string,
    description: string,
    categoryId: string,
    category: CategoryDto,
    difficulty: number,
    createdAt: Date
}
