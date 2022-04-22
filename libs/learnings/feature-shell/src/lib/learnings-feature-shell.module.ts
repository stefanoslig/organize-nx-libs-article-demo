import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningsShellComponent } from './learnings-shell.component';
import { RouterModule } from '@angular/router';
import { PAGINATION_PARAMS } from '@abc/shared/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LearningsShellComponent,
      },
    ]),
  ],
  providers: [{ provide: PAGINATION_PARAMS, useValue: { page: 1, limit: 10 } }],
})
export class LearningsFeatureShellModule {}
