import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- 1. Importamos el módulo de rutas

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule], // <-- 2. Lo agregamos a los imports
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
}