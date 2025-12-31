import { Route } from '@angular/router';

export const docsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./docs/docs').then((m) => m.Docs),
    children: [
      {
        path: '',
        redirectTo: 'philosophies',
        pathMatch: 'full',
      },
      {
        path: 'philosophies',
        loadComponent: () =>
          import('./pages/philosophies/philosophies').then(
            (m) => m.PhilosophiesPage,
          ),
      },
      {
        path: 'tokens',
        loadComponent: () =>
          import('./pages/tokens/tokens').then((m) => m.TokensPage),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./pages/components/components').then((m) => m.ComponentsPage),
      },
    ],
  },
];
