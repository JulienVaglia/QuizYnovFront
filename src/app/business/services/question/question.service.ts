import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDto } from '../../dtos/question.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsByQuizId( quizId : string ): Observable<QuestionDto[]> {
      return this.http.get<QuestionDto[]>( environment.API_Url + 'quiz/' + quizId + '/questions')
    }
}
