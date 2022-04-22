import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStoreService } from '@abc/users/data-access';
import { AvatarComponentModule, ModalService } from '@abc/shared/ui';
import { AssignedLearningsModalComponent } from './assigned-learnings-modal/assigned-learnings-modal.component';
import { Learning } from '@abc/shared/api-types';

@Component({
  selector: 'abc-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  users$ = this.usersStoreService.users$;

  constructor(
    private readonly usersStoreService: UsersStoreService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.usersStoreService.fetchUsers();
  }

  openAssignedLearnings(learnings: Array<Learning>) {
    this.modalService.open(AssignedLearningsModalComponent, learnings);
  }

  deleteUser(id: number) {
    this.usersStoreService.deleteUser(id);
  }
}

@NgModule({
  imports: [CommonModule, AvatarComponentModule],
  declarations: [UsersListComponent],
  exports: [UsersListComponent],
})
export class UsersListComponentModule {}
