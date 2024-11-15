import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../services/user/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule,ButtonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {
  items: MenuItem[]=[];

  constructor(private userService:UserService,private router: Router) { }


  ngOnInit(): void {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/admin/dashboard/clientes'
      },
      {
        label: 'Pinturas',
        icon: 'pi pi-palette',
         routerLink: '/admin/dashboard/pinturas'
      },
      {
        label: 'Herramientas',
        icon: 'pi pi-wrench',
         routerLink: '/admin/dashboard/herramientas'
      },
      {
        label: 'Carritos',
        icon: 'pi pi-fw pi-shopping-cart',
         routerLink: '/admin/dashboard/cart'
      },
      {
        label:'Carrito Detalle',
        icon:'pi pi-fw pi-cart-plus',
        routerLink: '/admin/dashboard/cart-detail'
      },
      {
        label:'Ventas',
        icon:'pi pi-fw pi-dollar',
        routerLink: '/admin/dashboard/ventas'
      }

    ];
  }

  async logout() {
   const response=await this.userService.logoutUser();
   if (response.status === 200) {
     this.router.navigateByUrl('/admin/login');
   }
  }
}
