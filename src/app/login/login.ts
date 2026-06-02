import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth'; // Asegúrate de que la ruta apunte a tu servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = ''; // Variable para mostrar errores en pantalla si fallan las credenciales

  // Inyectamos el servicio de autenticación
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.username && this.password) {
      const credentials = { username: this.username, password: this.password };

      // Llamamos a Django para validar
      this.authService.login(credentials).subscribe({
        next: (response) => {
          // Si Django dice que está OK, nos devolverá un token real
          console.log('¡Login exitoso!');
          this.authService.saveToken(response.access || response.token); 
          this.router.navigate(['/explore']); // Redirige al catálogo
        },
        error: (err) => {
          // Si el usuario o la contraseña están mal, Django arroja un error HTTP 401
          console.error('Error en el login', err);
          this.errorMessage = 'Usuario o contraseña incorrectos.';
          alert('Usuario o contraseña incorrectos. No puedes pasar.');
        }
      });
    } else {
      alert('Por favor, llena ambos campos.');
    }
  }
}