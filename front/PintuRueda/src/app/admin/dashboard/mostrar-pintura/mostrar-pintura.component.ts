import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PinturaGet, PinturaService } from '../../../services/pinturas/pintura.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-mostrar-pintura',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule, DropdownModule],
  templateUrl: './mostrar-pintura.component.html',
  styleUrls: ['./mostrar-pintura.component.css']
})
export class MostrarPinturaComponent implements OnInit {
  public pinturas: PinturaGet[] = [];

  constructor(
    private pinturaService: PinturaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarPinturas();
  }

  async mostrarPinturas() {
    const response = await this.pinturaService.getAllPinturas();
    if (response.status === 200) {
      this.pinturas = response.data.filter((data) => data.tipo_producto!=="herramienta");
    } else {
      this.pinturas = [];
      alert(response.error);
    }
  }

  async eliminar(id: number): Promise<void> {
    const response = await this.pinturaService.deletePintura(id);
    if (response.status === 200) {
      this.mostrarPinturas();
    } else {
      alert('Error al eliminar pintura');
    }
  }
}
