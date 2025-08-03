import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LearningsSearchComponent} from '@abc/learnings/feature-search';
import {LearningsListComponent} from '@abc/learnings/feature-list';

@Component({
  selector: 'abc-learnings-shell',
  templateUrl: './learnings-shell.component.html',
  styleUrls: ['./learnings-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LearningsSearchComponent,LearningsListComponent ]
})
export class LearningsShellComponent {}
