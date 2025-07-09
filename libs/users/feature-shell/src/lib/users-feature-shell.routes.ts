import { Route } from '@angular/router';


export const UsersRoutes: Route[] = [
      {
        path: '',
        loadComponent: () => import('./users-shell.component').then(m => m.UsersShellComponent),
      },
    ]
