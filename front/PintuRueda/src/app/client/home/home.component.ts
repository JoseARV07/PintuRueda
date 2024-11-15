import { Component } from '@angular/core';
import { PinturaContentComponent } from '../components/pintura-content/pintura-content.component';
import { HerramientasContentComponent } from '../components/herramientas-content/herramientas-content.component';
import { PikerComponent } from '../components/piker/piker.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PinturaContentComponent,PikerComponent,HerramientasContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
