import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { LearningsStoreService } from '@abc/learnings/data-access';
import { PaginationParams } from '@abc/shared/model';
import { DropdownComponent, DropdownTriggerDirective, PaginationComponent } from '@abc/shared/ui';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'abc-learnings-list',
  templateUrl: './learnings-list.component.html',
  styleUrls: ['./learnings-list.component.scss'],
  imports: [
    AsyncPipe, 
    NgClass,
    DropdownComponent,
    PaginationComponent,
    DropdownTriggerDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningsListComponent implements OnInit {
  private readonly learningsStoreService = inject(LearningsStoreService);

  learnings$ = this.learningsStoreService.learnings$;
  usersWithLearnings$ = this.learningsStoreService.usersWithLearnings$;
  paginationTotalCount$ = this.learningsStoreService.paginationTotalCount$;

  ngOnInit() {
    this.learningsStoreService.fetchUsersWithLearnings();
  }

  deleteLearning(id: number) {
    this.learningsStoreService.deleteLearning(id);
  }

  assignLearning(learningId: number, userId: number) {
    this.learningsStoreService.assignLearning(learningId, userId);
  }

  onPageChanged(params: PaginationParams) {
    this.learningsStoreService.fetchLearnings(params);
  }
}

