import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGINATION_PARAMS, SearchBarModule } from '@abc/shared/ui';
import { LearningsStoreService } from '@abc/learnings/data-access';
import { Router } from '@angular/router';
import { PaginationParams } from '@abc/shared/api-types';

@Component({
  selector: 'abc-learnings-search',
  templateUrl: './learnings-search.component.html',
  styleUrls: ['./learnings-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningsSearchComponent {
  searching$ = this.learningsStoreService.searching$;

  constructor(
    private readonly learningsStoreService: LearningsStoreService,
    private readonly router: Router,
    @Inject(PAGINATION_PARAMS)
    private readonly paginationParams: PaginationParams
  ) {}

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

@NgModule({
  imports: [CommonModule, SearchBarModule],
  declarations: [LearningsSearchComponent],
  exports: [LearningsSearchComponent],
})
export class LearningsSearchComponentModule {}
