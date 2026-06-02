import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Componente de Angular Material

@Component({
  selector: 'app-settings-card',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './settings-card.html',
  styleUrl: './settings-card.css'
})
export class SettingsCard {
  // Inputs: Reciben datos desde el padre
  @Input() settingTitle: string = '';
  @Input() settingDescription: string = '';
  @Input() isChecked: boolean = false;

  // Output: Envía eventos hacia el padre
  @Output() toggleChange = new EventEmitter<boolean>();

  // Función que se ejecuta al mover el interruptor
  onToggle(event: any) {
    this.toggleChange.emit(event.checked);
  }
}