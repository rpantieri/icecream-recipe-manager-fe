import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes-routes').then(mod => mod.routes) },
    { path: 'ingredients', loadChildren: () => import('./ingredients/ingredients-routes').then(m => m.routes) },
    { path: 'auth', loadChildren: () => import('./auth/auth-routes').then(m => m.routes) }
  ];
