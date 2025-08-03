
import { Route } from '@angular/router';
import { PAGINATION_PARAMS } from '@abc/shared/model';

export const LearningsRoutes: Route[] = [
      {
        path: '',
        loadComponent: () => import('./learnings-shell.component').then(m => m.LearningsShellComponent),
        providers: [{ provide: PAGINATION_PARAMS, useValue: { page: 1, limit: 10 } }],
      },
    ]
