import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadComponent: () => import('./Pages/recipes/recipes.page').then( m => m.RecipesPage)
  },
  {
    path: 'songs',
    loadComponent: () => import('./Pages/songs/songs.page').then( m => m.SongsPage)
  },
  {
    path: 'humour',
    loadComponent: () => import('./Pages/humour/humour.page').then( m => m.HumourPage)
  },
];
