import { Routes } from '@angular/router';

import { PageTitles } from '@src/models/pages.model';
import { AuthGuard } from '@src/utils/auth.guard';

export const routes: Routes = [
  {
    path: 'connexion',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    title: PageTitles.login + ' - ' + PageTitles.app,
  },
  {
    path: 'inscription',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignUpPage),
    title: PageTitles.signup + ' - ' + PageTitles.app,
  },
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    title: PageTitles.dashboard + ' - ' + PageTitles.app,
    canActivate: [AuthGuard],
  },
  {
    path: 'character',
    loadComponent: () => import('./pages/character/character.page').then(m => m.CharacterPage),
    title: PageTitles.character + ' - ' + PageTitles.app,
    canActivate: [AuthGuard],
  },
  {
    path: 'quetes',
    loadComponent: () => import('./pages/quests/quests.page').then(m => m.QuestsPage),
    title: PageTitles.quests + ' - ' + PageTitles.app,
    canActivate: [AuthGuard],
  },
  {
    path: 'donjons',
    loadComponent: () => import('./pages/dungeons/dungeons.page').then(m => m.DungeonsPage),
    title: PageTitles.dungeons + ' - ' + PageTitles.app,
    canActivate: [AuthGuard],
  },
  {
    path: 'parametres',
    loadComponent: () => import('./pages/params/params.page').then(m => m.ParamsPage),
    title: PageTitles.params + ' - ' + PageTitles.app,
    canActivate: [AuthGuard],
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
