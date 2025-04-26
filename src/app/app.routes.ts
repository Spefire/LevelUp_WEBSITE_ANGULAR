import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/character/character.page').then(m => m.CharacterPage),
  },
  {
    path: 'quests',
    loadComponent: () => import('./pages/quests/quests.page').then(m => m.QuestsPage),
  },
  {
    path: 'dungeons',
    loadComponent: () => import('./pages/dungeons/dungeons.page').then(m => m.DungeonsPage),
  },
  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory.page').then(m => m.InventoryPage),
  },
  {
    path: 'params',
    loadComponent: () => import('./pages/params/params.page').then(m => m.ParamsPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
