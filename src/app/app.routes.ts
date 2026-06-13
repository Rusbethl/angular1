import { Routes } from '@angular/router';
import { Explore } from './explore/explore';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';
import { Settings } from './settings/settings'; // <-- 1. Importamos tu componente Settings

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'explore',
    component: Explore,
    canActivate: [authGuard]
  },
  {
    path: 'settings',               // <-- 2. Declaramos la ruta
    component: Settings,            // <-- 3. Le asignamos el componente
    canActivate: [authGuard]        // <-- 4. La protegemos con el guardián
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];