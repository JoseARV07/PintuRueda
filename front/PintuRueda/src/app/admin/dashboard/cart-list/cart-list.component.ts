import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CartService, CartGet } from '../../../services/cart/cart.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-mostrar-cart',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule, DropdownModule],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class MostrarCartComponent implements OnInit {
  public carritos: CartGet[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarCarritos();
  }

  async mostrarCarritos() {
    const response = await this.cartService.getAllCarts();
    if (response.status === 200) {
      this.carritos = response.data;
    } else {
      this.carritos = [];
      alert(response.error);
    }
  }

  async eliminar(id: number): Promise<void> {
    const response = await this.cartService.deleteCart(id);
    if (response.status === 200) {
      this.router.navigateByUrl('admin/dashboard/cart');
      this.mostrarCarritos();
    }
  }
}
