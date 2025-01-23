import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../../../business/services/quiz/quiz.service.service';
import { QuizDto } from '../../../business/dtos/quiz.dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-cards',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './quiz-cards.component.html',
  styleUrl: './quiz-cards.component.scss'
})
export class QuizCardsComponent  implements OnInit{

  quizzes: QuizDto[]  | null = null;

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
      },
    })
  }

  //Permet de fermer la modal avant de basculer sur la nouvelle fenetre pour eviter un conflit d'état avec la modal
  closeModal() {
    const modal = document.querySelector('.modal'); // Sélectionne la modal active
    if (modal) {
      (modal as any).classList.remove('show'); // Supprime la classe "show"
      document.body.classList.remove('modal-open'); // Supprime la classe du body
      document.body.style.overflow = 'auto'; // Réactive le défilement si désactivé
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove(); // Supprime le backdrop
      }
    }
  }

}
