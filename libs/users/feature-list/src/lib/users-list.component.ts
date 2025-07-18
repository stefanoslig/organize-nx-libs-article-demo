import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UsersStoreService } from '@abc/users/data-access';
import { AvatarComponent, ModalService } from '@abc/shared/ui';
import { AssignedLearningsModalComponent } from './assigned-learnings-modal/assigned-learnings-modal.component';
import { Learning } from '@abc/shared/model';

@Component({
  selector: 'abc-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [AsyncPipe, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  private readonly usersStoreService = inject(UsersStoreService);
  private readonly modalService = inject(ModalService);

  users$ = this.usersStoreService.users$;

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
