import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PAGINATION_PARAMS, SearchBarComponent } from '@abc/shared/ui';
import { LearningsStoreService } from '@abc/learnings/data-access';
import { Router } from '@angular/router';
import { PaginationParams } from '@abc/shared/api-types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'abc-learnings-search',
  templateUrl: './learnings-search.component.html',
  styleUrls: ['./learnings-search.component.scss'],
  imports: [SearchBarComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningsSearchComponent {
  private readonly learningsStoreService = inject(LearningsStoreService);
  private readonly router = inject(Router);
  private readonly paginationParams = inject<PaginationParams>(PAGINATION_PARAMS);

  searching$ = this.learningsStoreService.searching$;

  onSearch(query: string) {
    // We reset the page params
    this.router.navigate(['.', this.paginationParams]);
    this.learningsStoreService.search(query, this.paginationParams);
  }

  onResetSearch() {
    // We reset the page params
    this.router.navigate(['.', this.paginationParams]);
    this.learningsStoreService.fetchLearnings(this.paginationParams);
  }
}