import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStoreService } from '@abc/users/data-access';
import { ModalRef, ModalService, SearchBarModule } from '@abc/shared/ui';
import {
  AddUserModalComponent,
  ModalData,
} from './add-user-modal/add-user-modal.component';
import { User } from '@abc/shared/api-types';
import { filter, take } from 'rxjs';

@Component({
  selector: 'abc-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersSearchComponent {
  searching$ = this.usersStoreService.searching$;

  private _modalRef!: ModalRef;

  constructor(
    private readonly usersStoreService: UsersStoreService,
    private readonly modalService: ModalService
  ) {}

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

@NgModule({
  imports: [CommonModule, SearchBarModule],
  declarations: [UsersSearchComponent],
  exports: [UsersSearchComponent],
})
export class UsersSearchComponentModule {}
