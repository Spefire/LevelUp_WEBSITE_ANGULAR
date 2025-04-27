import { Routes } from '@angular/router';

import { PageTitles } from '@src/models/pages.model';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/character/character.page').then(m => m.CharacterPage),
    title: PageTitles.character + ' - ' + PageTitles.app,
  },
  {
    path: 'quetes',
    loadComponent: () => import('./pages/quests/quests.page').then(m => m.QuestsPage),
    title: PageTitles.quests + ' - ' + PageTitles.app,
  },
  {
    path: 'donjons',
    loadComponent: () => import('./pages/dungeons/dungeons.page').then(m => m.DungeonsPage),
    title: PageTitles.dungeons + ' - ' + PageTitles.app,
  },
  {
    path: 'inventaire',
    loadComponent: () => import('./pages/inventory/inventory.page').then(m => m.InventoryPage),
    title: PageTitles.inventory + ' - ' + PageTitles.app,
  },
  {
    path: 'parametres',
    loadComponent: () => import('./pages/params/params.page').then(m => m.ParamsPage),
    title: PageTitles.params + ' - ' + PageTitles.app,
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/legacy/legacy.page').then(m => m.LegacyPage),
    title: PageTitles.legacy + ' - ' + PageTitles.app,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
