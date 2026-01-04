import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@basenative/ui-glass').then((m) => m.WelcomeComponent),
  },
  {
    path: 'docs',
    loadChildren: () => import('@basenative/docs').then((m) => m.docsRoutes),
  },

  {
    path: 'status',
    loadComponent: () =>
      import('@basenative/features/showcase').then((m) => m.StatusPage),
  },
  {
    path: 'media',
    loadComponent: () =>
      import('@basenative/features/showcase').then((m) => m.MediaPage),
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('@basenative/features/showcase').then((m) => m.EditorComponent),
  },
  {
    path: 'desktop',
    loadComponent: () =>
      import('@basenative/features/showcase').then((m) => m.DesktopComponent),
  },
];
