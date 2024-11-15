import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { UserGet, UserService } from '../../../services/user/user.service';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-mostrar-cliente',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule,DropdownModule],
  templateUrl: './mostrar-cliente.component.html',
  styleUrl: './mostrar-cliente.component.css'
})
export class MostrarClienteComponent implements OnInit{
  public clientes:UserGet[] = []
  constructor(
    private clienteService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarClientes()
  }

 async mostrarClientes(){
    const response = await this.clienteService.getAllUsers()
    if (response.status === 200) {
      this.clientes = response.data.filter(user => user.role !== 'admin')
    }else{
      this.clientes= response.data
      alert(response.error)
    }
  }

  async eliminar(id:number):Promise<void> {
    const response = await this.clienteService.deleteCliente(id)
    if (response.status === 200) {
      this.router.navigateByUrl('admin/dashboard/clientes')
      this.mostrarClientes()
    }
  }
}
