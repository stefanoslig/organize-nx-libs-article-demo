import { PaginationParams } from '@abc/shared/api-types';
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Output,
  EventEmitter,
  OnInit,
  Input,
  Inject,
} from '@angular/core';
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
  @Output() pageChanged = new EventEmitter<PaginationParams>();
  @Input() paginationTotalCount!: number;

  page = this.paginationParams.page;
  limit = this.paginationParams.limit;

  private unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(PAGINATION_PARAMS)
    private readonly paginationParams: PaginationParams,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

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

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
