import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../../../business/services/quiz/quiz.service.service';
import { QuizDto } from '../../../business/dtos/quiz.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-cards',
  imports: [CommonModule],
  templateUrl: './quiz-cards.component.html',
  styleUrl: './quiz-cards.component.scss'
})
export class QuizCardsComponent  implements OnInit{

  quizzes: QuizDto[]  | null = null;
  errorMessage: string = '';

  constructor ( private quizService: QuizServiceService) {}

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes() {
    this.quizService.getAllQuizzes().subscribe({
      next: (data: QuizDto[]) => {
        this.quizzes = data;       
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des quiz :', error);
        this.errorMessage = 'Une erreur est survenue lors du chargement des quiz.';
      },
    })
  }

}
