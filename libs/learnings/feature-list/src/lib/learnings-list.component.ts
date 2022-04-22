import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningsStoreService } from '@abc/learnings/data-access';
import {
  DropdownComponentModule,
  DropdownTriggerDirectiveModule,
  PaginationModule,
} from '@abc/shared/ui';
import { UsersStoreService } from '@abc/users/data-access';
import { PaginationParams } from '@abc/shared/api-types';

@Component({
  selector: 'abc-learnings-list',
  templateUrl: './learnings-list.component.html',
  styleUrls: ['./learnings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningsListComponent implements OnInit {
  learnings$ = this.learningsStoreService.learnings$;
  users$ = this.usersStoreService.users$;
  paginationTotalCount$ = this.learningsStoreService.paginationTotalCount$;

  constructor(
    private readonly learningsStoreService: LearningsStoreService,
    private readonly usersStoreService: UsersStoreService
  ) {}

  ngOnInit() {
    this.usersStoreService.fetchUsers();
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

@NgModule({
  imports: [
    CommonModule,
    DropdownTriggerDirectiveModule,
    DropdownComponentModule,
    PaginationModule,
  ],
  declarations: [LearningsListComponent],
  exports: [LearningsListComponent],
})
export class LearningsListComponentModule {}
