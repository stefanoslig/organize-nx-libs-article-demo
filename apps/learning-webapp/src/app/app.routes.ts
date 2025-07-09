import { Route } from '@angular/router';

export const appRoutes: Route[] = [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@abc/users/feature-shell').then(
            (m) => m.UsersRoutes
          ),
      },
      {
        path: 'learnings',
        loadChildren: () =>
          import('@abc/learnings/feature-shell').then(
            (m) => m.LearningsRoutes
          ),
      },
    ]
  
