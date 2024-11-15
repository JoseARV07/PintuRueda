import { Component, OnInit } from '@angular/core';
import { PinturaService } from '../../../services/pinturas/pintura.service';
import { CardComponent } from '../card/card.component';
export interface Pintura {
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
  selector: 'app-pintura-content',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './pintura-content.component.html',
  styleUrl: './pintura-content.component.css'
})
export class PinturaContentComponent implements OnInit {
  pinturas: Pintura[]=[];
  constructor(private pinturaService: PinturaService) {}

  ngOnInit(): void {
    this.getPinturas();
  }

  async getPinturas():Promise<void> {
    const res= await this.pinturaService.getAllPinturas();
    if(res.status==200){
      this.pinturas = res.data.filter((data) => data.tipo_producto!=="herramienta");
    }
  }
}
