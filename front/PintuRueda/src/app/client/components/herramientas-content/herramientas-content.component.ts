import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { HerramientaService } from '../../../services/herramientas/herramientas.service';

export interface Herramienta {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
  categoria: string;
  stock: number;
  codigo: string;
}
@Component({
  selector: 'app-herramientas-content',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './herramientas-content.component.html',
  styleUrl: './herramientas-content.component.css'
})
export class HerramientasContentComponent  implements OnInit {
  herramientas: Herramienta[]=[];
  constructor(private herramientasService: HerramientaService) {}


  ngOnInit(): void {
    this.getHerramientas();
  }

  async getHerramientas():Promise<void> {
    const res= await this.herramientasService.getAllHerramientas();
    if(res.status==200){
      this.herramientas = res.data.filter((data) => data.tipo_producto!=="pintura");
    }
  }
}