import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponentModule } from '@abc/users/feature-list';
import { UsersSearchComponentModule } from '@abc/users/feature-search';

@Component({
  selector: 'abc-users-shell',
  templateUrl: './users-shell.component.html',
  styleUrls: ['./users-shell.component.scss'],
})
export class UsersShellComponent {}

@NgModule({
  imports: [CommonModule, UsersSearchComponentModule, UsersListComponentModule],
  declarations: [UsersShellComponent],
  exports: [UsersShellComponent],
})
export class UsersShellComponentModule {}
