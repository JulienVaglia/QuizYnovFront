import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizDto } from '../../dtos/quiz.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private http: HttpClient) { }

  public getAllQuizzes(): Observable<QuizDto[]> {
    return this.http.get<QuizDto[]>( environment.API_Url + 'quiz')
  }

}
