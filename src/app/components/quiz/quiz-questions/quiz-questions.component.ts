import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../business/services/question/question.service';
import { QuestionDto } from '../../../business/dtos/question.dto';
import { FormsModule } from '@angular/forms';

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
  questions: QuestionDto[] | null = null;
  answers: { id: string; questionId: string; text: string; index: number }[] | null = null;

  // Stockage des réponses de l'utilisateur
  selectedAnswers: { [questionId: string]: number } = {};
  score: number | null = null;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId) {
      console.log('Quiz ID:', this.quizId);
      this.getQuestionsByQuizId();
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

          // Extraire toutes les réponses de chaque question
          this.answers = [];
          this.questions.forEach((question) => {
            question.answer.forEach((answer: any, index: any) => {
              this.answers!.push({
                id: `${question.id}-${index}`, // ID unique pour chaque réponse
                questionId: question.id, // ID de la question à laquelle la réponse appartient
                text: answer,
                index: index,
              });
            });
          });
          console.log("Questions :" + this.questions);
          console.log('Réponses :', this.answers);
          
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des questions :', error);
        },
      })
    }
  }

  submitQuiz() {
    if (!this.questions) return;

    let correctAnswersCount = 0;

    // Compare chaque réponse sélectionnée avec l'index de la bonne réponse
    this.questions.forEach((question) => {
      if (this.selectedAnswers[question.id] === question.correctAnswerIndex) {
        correctAnswersCount++;
      }
    });

    // Calcule le score final sur 5 car 5 questions par Quiz
    this.score = correctAnswersCount;
    console.log(`Score : ${this.score} / ${this.questions.length}`);

    // Affiche dans un message le score
    alert(`Votre score est de ${this.score} / ${this.questions.length}`);
  }

}
