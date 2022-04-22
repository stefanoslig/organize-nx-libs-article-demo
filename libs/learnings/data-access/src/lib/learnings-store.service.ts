import { Learning, PaginationParams } from '@abc/shared/api-types';
import { Store } from '@abc/shared/data-access';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LearningsApiService } from './learnings-api.service';

export interface LearningsState {
  learnings: Array<Learning>;
  searching: boolean;
  paginationTotalCount: number;
}

const initialState: LearningsState = {
  learnings: [],
  searching: false,
  paginationTotalCount: 0,
};

@Injectable({
  providedIn: 'root',
})
export class LearningsStoreService extends Store<LearningsState> {
  learnings$ = this.state$.pipe(map((state) => state.learnings));
  searching$ = this.state$.pipe(map((state) => state.searching));
  paginationTotalCount$ = this.state$.pipe(
    map((state) => state.paginationTotalCount)
  );

  constructor(private learningsApiService: LearningsApiService) {
    super(initialState);
  }

  fetchLearnings(paginationParams: PaginationParams) {
    this.learningsApiService
      .fetchLearnings(paginationParams)
      .subscribe((response) =>
        this.setState({
          ...this.state,
          learnings: response.body ?? [],
          paginationTotalCount: +(response.headers.get('X-Total-Count') ?? 0),
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
          learnings: response.body ?? [],
          paginationTotalCount: +(response.headers.get('X-Total-Count') ?? 0),
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
}
