import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizQuestionsComponent } from '../quiz/quiz-questions/quiz-questions.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
