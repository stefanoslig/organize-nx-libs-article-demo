import { UsersListComponent } from '@abc/users/feature-list';
import { UsersSearchComponent } from '@abc/users/feature-search';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'abc-users-shell',
  templateUrl: './users-shell.component.html',
  styleUrls: ['./users-shell.component.scss'],
  imports: [UsersSearchComponent, UsersListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersShellComponent {}
