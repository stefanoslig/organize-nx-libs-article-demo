import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Learning, PaginationParams, UserEmbedLeanings } from '@abc/shared/model';
import { LearningResponse } from '@abc/learnings/model';
import { API_URL } from '@abc/shared/model';

@Injectable({
  providedIn: 'root',
})
export class LearningsApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);


  fetchLearnings(
    paginationParams: PaginationParams
  ): Observable<HttpResponse<LearningResponse>> {
    const params = new HttpParams()
      .set('_page', paginationParams.page)
      .set('_per_page', paginationParams.limit);

    return this.http.get<LearningResponse>(`${this.apiUrl}/learnings`, {
      observe: 'response',
      params,
    });
  }

  searchLearnings(
    query: string,
    paginationParams: PaginationParams
  ): Observable<HttpResponse<LearningResponse>> {
    const params = new HttpParams()
      .set('q', query)
      .set('_page', paginationParams.page)
      .set('_per_page', paginationParams.limit);

    return this.http.get<LearningResponse>(`${this.apiUrl}/learnings`, {
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

  fetchUsersWithLearnings(): Observable<Array<UserEmbedLeanings>> {
      const params = new HttpParams().set('_embed', 'learnings');
  
      return this.http.get<Array<UserEmbedLeanings>>(`${this.apiUrl}/users`, {
        params,
      });
    }
}
