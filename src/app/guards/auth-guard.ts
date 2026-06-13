import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 1. Verificamos si el código ya se está ejecutando en el navegador del usuario
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    
    if (token) {
      return true; // Tienes el token, te dejamos entrar a Settings
    } else {
      router.navigate(['/login']); // No hay token, te regresamos al Login
      return false;
    }
  }

  // 2. Si el código se está ejecutando en el servidor interno de Angular (SSR),
  // devolvemos 'false' por seguridad. Esto evita que páginas privadas carguen sin login.
  return false; 
};