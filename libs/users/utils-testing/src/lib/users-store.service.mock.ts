import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { users } from './users.mock';

@Injectable()
export class UsersApiServiceMock {
  fetchUsers() {
    return of(users);
  }
  searchUsers() {
    return of([users[1]]);
  }
  deleteUser() {
    return of(void 0) as Observable<void>;
  }
}
