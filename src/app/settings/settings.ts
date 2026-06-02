import { Component } from '@angular/core';
import { Layout } from '../layout/layout';
import { SettingsCard } from '../settings-card/settings-card';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [Layout, SettingsCard], // Importamos el layout y el componente hijo
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  
  // Función que recibe la información del Output del hijo
  onSettingChanged(settingName: string, newValue: boolean) {
    console.log(`La configuración de "${settingName}" cambió a: ${newValue}`);
  }
}