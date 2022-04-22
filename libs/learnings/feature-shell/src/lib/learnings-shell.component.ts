import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningsListComponentModule } from '@abc/learnings/feature-list';
import { LearningsSearchComponentModule } from '@abc/learnings/feature-search';

@Component({
  selector: 'abc-learnings-shell',
  templateUrl: './learnings-shell.component.html',
  styleUrls: ['./learnings-shell.component.scss'],
})
export class LearningsShellComponent {}

@NgModule({
  imports: [
    CommonModule,
    LearningsListComponentModule,
    LearningsSearchComponentModule,
  ],
  declarations: [LearningsShellComponent],
  exports: [LearningsShellComponent],
})
export class UsersShellComponentModule {}
