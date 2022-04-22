import { User, UserEmbedLeanings } from '@abc/shared/api-types';
import { Store } from '@abc/shared/data-access';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsersApiService } from './users-api.service';

export interface UsersState {
  users: Array<UserEmbedLeanings>;
  searching: boolean;
}

const initialState: UsersState = { users: [], searching: false };

@Injectable({
  providedIn: 'root',
})
export class UsersStoreService extends Store<UsersState> {
  users$ = this.state$.pipe(map((state) => state.users));
  searching$ = this.state$.pipe(map((state) => state.searching));

  constructor(private usersApiService: UsersApiService) {
    super(initialState);
  }

  fetchUsers() {
    this.usersApiService.fetchUsers().subscribe((users) =>
      this.setState({
        ...this.state,
        users,
      })
    );
  }

  searchUsers(query: string) {
    this.setState({
      ...this.state,
      searching: true,
    });

    this.usersApiService.searchUsers(query).subscribe((users) =>
      this.setState({
        ...this.state,
        users,
        searching: false,
      })
    );
  }

  deleteUser(id: number) {
    this.usersApiService.deleteUser(id).subscribe(() => {
      this.setState({
        ...this.state,
      users: this.state.users.filter((user) => user.id !== id),
      });
    });
  }

  addUser(user: Partial<User>) {
    this.usersApiService.addUser(user).subscribe((newUser) => {
      this.setState({
        ...this.state,
        users: [newUser, ...this.state.users],
      });
    });
  }
}
