import { UsersApiService } from '@abc/users/data-access';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { users } from './users.mock';

@Injectable()
export class UsersApiServiceMock extends UsersApiService {
  override fetchUsers() {
    return of(users);
  }
  override searchUsers() {
    return of([users[1]]);
  }
  override deleteUser() {
    return of(void 0) as Observable<void>;
  }
}
