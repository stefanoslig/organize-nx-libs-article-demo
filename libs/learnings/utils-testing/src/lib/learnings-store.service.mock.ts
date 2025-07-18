import { Learning } from '@abc/shared/model';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { learnings } from './learnings.mock';

@Injectable()
export class LearningsApiServiceMock {
  fetchLearnings() {
    return of({
      body: learnings,
      headers: new Map<string, string>([['X-Total-Count', '0']]),
    } as unknown as HttpResponse<Learning[]>);
  }
  searchLearnings() {
    return of({
      body: [learnings[1]],
      headers: new Map<string, string>([['X-Total-Count', '0']]),
    } as unknown as HttpResponse<Learning[]>);
  }
  deleteLearning() {
    return of(void 0) as Observable<void>;
  }
  assignLearning() {
    return of({ ...learnings[0], userId: 8 });
  }
}
