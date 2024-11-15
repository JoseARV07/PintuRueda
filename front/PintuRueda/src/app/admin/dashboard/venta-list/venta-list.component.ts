import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { VentaService, VentaGet } from '../../../services/venta/venta.service'; // Make sure the path matches your structure

@Component({
  selector: 'app-venta-list',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.css']
})
export class VentaListComponent implements OnInit {
  public ventas: VentaGet[] = [];

  constructor(
    private ventaService: VentaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarVentas();
  }

  async mostrarVentas() {
    const response = await this.ventaService.getAllVentas();
    if (response.status === 200) {
      this.ventas = response.ventas;
    } else {
      this.ventas = [];
      alert(response.error);
    }
  }

  async eliminar(id: number): Promise<void> {
    const response = await this.ventaService.deleteVenta(id);
    if (response.status === 200) {
      this.mostrarVentas();  // Refresh the list after deletion
    } else {
      alert(response.error);
    }
  }
}
