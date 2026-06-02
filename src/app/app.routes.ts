import { Routes } from '@angular/router';
import { Explore } from './explore/explore';
import { Login } from './login/login'; // Fíjate que aquí ya no dice .component
import { authGuard } from './guards/auth-guard';

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
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];