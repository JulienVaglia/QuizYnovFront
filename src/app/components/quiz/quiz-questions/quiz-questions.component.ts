import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../business/services/question/question.service';
import { QuestionDto } from '../../../business/dtos/question.dto';
import { FormsModule } from '@angular/forms';
import { QuizServiceService } from '../../../business/services/quiz/quiz.service.service';
import { QuizDto } from '../../../business/dtos/quiz.dto';

@Component({
  selector: 'app-quiz-questions',
  imports: [
    FormsModule
  ],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.scss'
})
export class QuizQuestionsComponent implements OnInit {

  quizId: string | null = null;
  quiz: QuizDto | null = null;
  questions: QuestionDto[] | null = null;
  answers: { id: string; questionId: string; text: string; index: number }[] | null = null;

  // Stockage des réponses de l'utilisateur
  selectedAnswers: { [questionId: string]: number } = {};
  score: number | null = null;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private quizService: QuizServiceService) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId) {
      console.log('Quiz ID:', this.quizId);
      this.getQuestionsByQuizId();
      this.getQuizzByQuizzId(this.quizId);
    } else {
      console.log('Aucun ID fourni dans l\'URL');
    }
  }

  getQuestionsByQuizId() {
    if (this.quizId) {
      this.questionService.getQuestionsByQuizId(this.quizId).subscribe({
        next: (data: QuestionDto[]) => {
          this.questions = data;
          console.table(this.questions);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des questions :', error);
        },
      })
    }
  }

  getQuizzByQuizzId(quizId: string) {
    this.quizService.getQuizzById(quizId).subscribe({
      next: (data: QuizDto) => {
        this.quiz = data;
        console.log("Nom du quiz : " + this.quiz.name);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du nom du quiz :', error);
      },
    })
  }

  // Méthode appelée lorsque l'utilisateur sélectionne une réponse
  onAnswerSelected(questionId: string, answerIndex: number): void {
    this.selectedAnswers[questionId] = answerIndex; // Enregistre la réponse sélectionnée
    console.log('Réponses sélectionnées :', this.selectedAnswers);
  }


  submitQuiz() {
    if (!this.questions) return;
    let correctAnswersCount = 0;

    // Compare chaque réponse sélectionnée avec l'index de la bonne réponse
    this.questions.forEach((question: QuestionDto) => {
      if (this.selectedAnswers[question.id] === question.correctAnswerIndex) {
        correctAnswersCount++;
      }
    });

    // Calcule le score final sur 5 car 5 questions par Quiz
    this.score = correctAnswersCount;

    // Calcule le pourcentage de réussite
    const percentage = Math.round((correctAnswersCount / this.questions.length) * 100);

    // Affiche un message avec le score et le pourcentage
    alert(`Votre score est de ${this.score} / ${this.questions.length} soit : ${percentage}% de réussite`);
  }

}
