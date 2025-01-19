import { Component } from '@angular/core';
import { QuizCardsComponent } from '../../components/quiz/quiz-cards/quiz-cards.component';


@Component({
  selector: 'app-home',
  imports: [QuizCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{}
