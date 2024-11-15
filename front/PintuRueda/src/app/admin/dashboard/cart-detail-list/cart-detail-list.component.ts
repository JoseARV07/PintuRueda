import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDetailService, CartDetailGet } from '../../../services/cart-detail/cart-detail.service'; // Ensure this path is correct for your service
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-detail-list',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './cart-detail-list.component.html',
  styleUrls: ['./cart-detail-list.component.css']
})
export class CartDetailListComponent implements OnInit {
  public cartDetails: CartDetailGet[] = [];

  constructor(
    private cartDetailService: CartDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarDetallesCarrito();
  }

  // Fetch all cart details
  async mostrarDetallesCarrito() {
    const response = await this.cartDetailService.getAllCartDetails();
    if (response.status === 200) {
      this.cartDetails = response.data;
    } else {
      this.cartDetails = [];
      alert(response.error);
    }
  }

  // Delete a cart detail
  async eliminar(id: number): Promise<void> {
    const response = await this.cartDetailService.deleteCartDetail(id);
    if (response.status === 200) {
      this.router.navigateByUrl('admin/dashboard/cart-detail');
      this.mostrarDetallesCarrito();
    }
  }
}
