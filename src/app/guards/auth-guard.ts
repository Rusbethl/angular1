import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Aquí va tu lógica para verificar si el usuario tiene acceso.
  // Por ejemplo, checar si existe un token guardado:
  const hasToken = typeof window !== 'undefined' && localStorage.getItem('token');

  if (hasToken) {
    return true; // El usuario tiene permiso, lo dejamos pasar a 'explore'
  } else {
    // No tiene permiso, lo redirigimos a la ruta de 'login'
    router.navigate(['/login']);
    return false;
  }
};