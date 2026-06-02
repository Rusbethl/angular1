import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  // Output: Envía el texto escrito hacia el componente padre
  @Output() search = new EventEmitter<string>();

  // Función que se dispara cada vez que escribes una tecla
  onInput(event: any) {
    const textoEscrito = event.target.value;
    this.search.emit(textoEscrito);
  }
}