import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { QuizQuestionsComponent } from './components/quiz/quiz-questions/quiz-questions.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    
    { path: 'quizQuestions', component: QuizQuestionsComponent },
    { path: 'quizQuestions/:id', component: QuizQuestionsComponent },

    //Route a garder en dernier pour éviter les mauvaises redirections
    { path: '**', component: NotfoundComponent },
];
