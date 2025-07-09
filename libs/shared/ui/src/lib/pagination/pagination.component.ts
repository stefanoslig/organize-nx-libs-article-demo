import { PaginationParams } from '@abc/shared/api-types';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { PAGINATION_PARAMS } from './pagination.token';

@Component({
  selector: 'abc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  private readonly paginationParams = inject<PaginationParams>(PAGINATION_PARAMS);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @Output() pageChanged = new EventEmitter<PaginationParams>();
  @Input() paginationTotalCount!: number;

  page = this.paginationParams.page;
  limit = this.paginationParams.limit;

  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.subscribeToRouteParams();
  }

  nextPage() {
    if (this.page < this.paginationTotalCount) {
      this.router.navigate(['.', { page: ++this.page, limit: this.limit }]);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.router.navigate(['.', { page: --this.page, limit: this.limit }]);
    }
  }

  private subscribeToRouteParams() {
    this.route.paramMap
      .pipe(
        map((param) => {
          this.page = +(param.get('page') || 1);
          this.limit = +(param.get('limit') || 10);
          return {
            page: this.page,
            limit: this.limit,
          };
        }),
        tap((params) => this.pageChanged.emit(params)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }
}
