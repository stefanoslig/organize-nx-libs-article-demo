import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UsersStoreService } from '@abc/users/data-access';
import { ModalRef, ModalService, SearchBarComponent } from '@abc/shared/ui';
import {
  AddUserModalComponent,
  ModalData,
} from './add-user-modal/add-user-modal.component';
import { filter, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { User } from '@abc/users/model';

@Component({
  selector: 'abc-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss'],
  imports: [AsyncPipe, SearchBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersSearchComponent {
  private readonly usersStoreService = inject(UsersStoreService);
  private readonly modalService = inject(ModalService);

  searching$ = this.usersStoreService.searching$;

  private _modalRef!: ModalRef;

  onSearch(query: string) {
    if (!query) {
      this.usersStoreService.fetchUsers();
    } else {
      this.usersStoreService.searchUsers(query);
    }
  }

  openAddUser() {
    this._modalRef = this.modalService.open(AddUserModalComponent);
    this.subscribeToAddUserModal();
  }

  private subscribeToAddUserModal() {
    this._modalRef
      .afterClosed<ModalData>()
      .pipe(
        filter((data) => data.action === 'addUser'),
        take(1)
      )
      .subscribe((data) =>
        this.usersStoreService.addUser(data.value as Partial<User>)
      );
  }
}
