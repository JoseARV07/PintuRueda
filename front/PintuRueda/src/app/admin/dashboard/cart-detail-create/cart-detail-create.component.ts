import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartDetailService, CartDetailAdd } from '../../../services/cart-detail/cart-detail.service';
import { PinturaService, PinturaGet } from '../../../services/pinturas/pintura.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-detail-create',
  standalone: true,
  imports: [ReactiveFormsModule,CardModule, ButtonModule, DropdownModule],
  templateUrl: './cart-detail-create.component.html',
  styleUrls: ['./cart-detail-create.component.css']
})
export class CartDetailCreateComponent implements OnInit {
  form: FormGroup;
  products: { nombre: string, id: number }[] = [];
  cartOptions: {  nombre: string, id: number}[] = []; // Assuming cart data will be loaded

  constructor(
    private formBuilder: FormBuilder,
    private cartDetailService: CartDetailService,
    private cartService: CartService,
    private productService: PinturaService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id_carrito: ['', [Validators.required]],
      id_producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCarts();
  }

  // Load available products
  async loadProducts() {
    const result = await this.productService.getAllPinturas();
    if (result.status === 200) {
      this.products = result.data.map(product => ({
        nombre: product.nombre,
        id: product.id
      }));
    } else {
      alert(result.error);
    }
  }

  // Load available carts
// Load available carts
async loadCarts() {
  const result = await this.cartService.getAllCarts();
  if (result.status === 200) {
    this.cartOptions = result.data.map(cart => ({
      nombre:`Cart #${cart.id} ${cart.usuario.nombre}`,
      id: cart.id
    }));
  } else {
    alert(result.error);
  }
}


  // Submit the form to create a cart detail
  async onSubmit() {
    const cartDetailData: CartDetailAdd = {
      id_carrito: this.form.get('id_carrito')?.value,
      id_producto: this.form.get('id_producto')?.value,
      cantidad: this.form.get('cantidad')?.value
    };

    const result = await this.cartDetailService.createCartDetail(cartDetailData);
    if (result.status === 201) {
      this.router.navigateByUrl('admin/dashboard/cart-detail');
    } else {
      alert(result.error);
    }
  }

  // Cancel the operation
  cancel() {
    this.router.navigateByUrl('admin/dashboard/cart-detail');
  }

  get id_carrito() { return this.form.get('id_carrito'); }
  get id_producto() { return this.form.get('id_producto'); }
  get cantidad() { return this.form.get('cantidad'); }
}
