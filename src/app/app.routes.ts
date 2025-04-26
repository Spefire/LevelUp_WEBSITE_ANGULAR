import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/character-stats/character-stats.component').then(m => m.CharacterStatsComponent)
  },
  {
    path: 'actions',
    loadComponent: () => import('./components/daily-actions/daily-actions.component').then(m => m.DailyActionsComponent)
  }
]; 