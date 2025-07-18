import { Learning, PaginationParams, UserEmbedLeanings } from '@abc/shared/model';
import { Store } from '@abc/shared/data-access';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { LearningsApiService } from './learnings-api.service';

export interface LearningsState {
  learnings: Array<Learning>;
  searching: boolean;
  paginationTotalCount: number;
  users: Array<UserEmbedLeanings>;
}

const initialState: LearningsState = {
  learnings: [],
  searching: false,
  paginationTotalCount: 0,
  users: []
};

@Injectable({
  providedIn: 'root',
})
export class LearningsStoreService extends Store<LearningsState> {
  private learningsApiService = inject(LearningsApiService);

  learnings$ = this.state$.pipe(map((state) => state.learnings));
  usersWithLearnings$ = this.state$.pipe(map((state) => state.users));
  searching$ = this.state$.pipe(map((state) => state.searching));
  paginationTotalCount$ = this.state$.pipe(
    map((state) => state.paginationTotalCount)
  );

  constructor() {
    super(initialState);
  }

  fetchLearnings(paginationParams: PaginationParams) {
    this.learningsApiService
      .fetchLearnings(paginationParams)
      .subscribe((response) =>
        this.setState({
          ...this.state,
          learnings: response.body?.data ?? [],
          paginationTotalCount: +(response.body?.pages ?? 0),
        })
      );
  }

  search(query: string, paginationParams: PaginationParams) {
    this.setState({
      ...this.state,
      searching: true,
    });
    this.learningsApiService
      .searchLearnings(query, paginationParams)
      .subscribe((response) =>
        this.setState({
          ...this.state,
          learnings: response.body?.data ?? [],
          paginationTotalCount: +(response.body?.pages ?? 0),
          searching: false,
        })
      );
  }

  deleteLearning(id: number) {
    this.learningsApiService.deleteLearning(id).subscribe(() => {
      this.setState({
        ...this.state,
        learnings: this.state.learnings.filter(
          (learning) => learning.id !== id
        ),
      });
    });
  }

  assignLearning(learningId: number, userId: number) {
    this.learningsApiService
      .assignLearning(learningId, userId)
      .subscribe(() => {
        this.setState({
          ...this.state,
          learnings: this.state.learnings.map((item) => {
            if (item.id !== learningId) {
              return item;
            }

            return {
              ...item,
              userId,
            };
          }),
        });
      });
  }

  fetchUsersWithLearnings() {
    this.learningsApiService.fetchUsersWithLearnings().subscribe((users) =>
      this.setState({
        ...this.state,
        users,
      })
    );
  }
}
