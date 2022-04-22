import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@abc/users/feature-shell').then(
            (m) => m.UsersFeatureShellModule
          ),
      },
      {
        path: 'learnings',
        loadChildren: () =>
          import('@abc/learnings/feature-shell').then(
            (m) => m.LearningsFeatureShellModule
          ),
      },
    ]),
  ],
})
export class AppRoutingModule {}
