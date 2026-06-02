import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Verificamos si estamos en el navegador para acceder a localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    
    // Si hay un token, clonamos la petición y le añadimos el encabezado de autorización
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }

  // Si no hay token, la dejamos pasar normal
  return next(req);
};