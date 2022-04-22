import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserEmbedLeanings } from '@abc/shared/api-types';
import { API_URL } from '@abc/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private readonly apiUrl: string
  ) {}

  fetchUsers(): Observable<Array<UserEmbedLeanings>> {
    const params = new HttpParams().set('_embed', 'learnings');

    return this.http.get<Array<UserEmbedLeanings>>(`${this.apiUrl}/users`, {
      params,
    });
  }

  searchUsers(query: string): Observable<Array<UserEmbedLeanings>> {
    const params = new HttpParams().set('_embed', 'learnings').set('q', query);

    return this.http.get<Array<UserEmbedLeanings>>(`${this.apiUrl}/users`, {
      params,
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  addUser(user: Partial<User>): Observable<UserEmbedLeanings> {
    return this.http.post<UserEmbedLeanings>(`${this.apiUrl}/users`, { ...user });
  }
}
