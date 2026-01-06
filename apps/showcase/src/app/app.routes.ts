import { Route } from '@angular/router';

import { WelcomeComponent } from '@basenative/ui-glass';

export const appRoutes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'docs',
    loadChildren: () => import('@basenative/docs').then((m) => m.docsRoutes),
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./signal-store-demo/demo/signal-store-demo.component').then(
        (m) => m.SignalStoreDemoComponent,
      ),
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
  {
    path: 'greenput-consent',
    loadComponent: () =>
      import('./greenput-showcase/greenput-showcase.component').then(
        (m) => m.GreenputShowcaseComponent,
      ),
  },
];
