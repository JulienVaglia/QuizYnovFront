import { TestBed } from '@angular/core/testing';

import { QuizMapperService } from './quiz.mapper.service';

describe('QuizMapperService', () => {
  let service: QuizMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
