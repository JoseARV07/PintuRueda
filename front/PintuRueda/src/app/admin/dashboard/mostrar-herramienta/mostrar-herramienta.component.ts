import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HerramientaGet, HerramientaService } from '../../../services/herramientas/herramientas.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-mostrar-herramienta',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule, DropdownModule],
  templateUrl: './mostrar-herramienta.component.html',
  styleUrls: ['./mostrar-herramienta.component.css']
})
export class MostrarHerramientaComponent implements OnInit {
  public herramientas: HerramientaGet[] = [];

  constructor(
    private herramientaService: HerramientaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarHerramientas();
  }

  async mostrarHerramientas() {
    const response = await this.herramientaService.getAllHerramientas();
    if (response.status === 200) {
      this.herramientas = response.data.filter((data) => data.tipo_producto!=="pintura");
    } else {
      this.herramientas = [];
      alert(response.error);
    }
  }

  async eliminar(id: number): Promise<void> {
    const response = await this.herramientaService.deleteHerramienta(id);
    if (response.status === 200) {
      this.mostrarHerramientas();
    } else {
      alert('Error al eliminar herramienta');
    }
  }
}
