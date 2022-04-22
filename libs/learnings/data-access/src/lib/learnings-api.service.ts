import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Learning, PaginationParams } from '@abc/shared/api-types';
import { API_URL } from '@abc/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class LearningsApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private readonly apiUrl: string
  ) {}

  fetchLearnings(
    paginationParams: PaginationParams
  ): Observable<HttpResponse<Array<Learning>>> {
    const params = new HttpParams()
      .set('_page', paginationParams.page)
      .set('_limit', paginationParams.limit);

    return this.http.get<Array<Learning>>(`${this.apiUrl}/learnings`, {
      observe: 'response',
      params,
    });
  }

  searchLearnings(
    query: string,
    paginationParams: PaginationParams
  ): Observable<HttpResponse<Array<Learning>>> {
    const params = new HttpParams()
      .set('q', query)
      .set('_page', paginationParams.page)
      .set('_limit', paginationParams.limit);

    return this.http.get<Array<Learning>>(`${this.apiUrl}/learnings`, {
      observe: 'response',
      params,
    });
  }

  deleteLearning(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/learnings/${id}`);
  }

  assignLearning(learningId: number, userId: number): Observable<Learning> {
    return this.http.patch<Learning>(`${this.apiUrl}/learnings/${learningId}`, {
      userId,
    });
  }
}
