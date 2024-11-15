import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDetailService, CartDetailAdd } from '../../../services/cart-detail/cart-detail.service';
import { PinturaService } from '../../../services/pinturas/pintura.service';
import { CartService } from '../../../services/cart/cart.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-cart-detail-update',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './cart-detail-update.component.html',
  styleUrls: ['./cart-detail-update.component.css']
})
export class CartDetailUpdateComponent implements OnInit {
  form: FormGroup;
  products: { nombre: string, id: number }[] = [];
  cartOptions: { nombre: string, id: number }[] = [];
  cartDetailId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private cartDetailService: CartDetailService,
    private cartService: CartService,
    private productService: PinturaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id_carrito: ['', [Validators.required]],
      id_producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cartDetailId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProducts();
    this.loadCarts();
    if (this.cartDetailId) {
      this.loadCartDetail(this.cartDetailId);
    }
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
  async loadCarts() {
    const result = await this.cartService.getAllCarts();
    if (result.status === 200) {
      this.cartOptions = result.data.map(cart => ({
        nombre: `Cart #${cart.id} ${cart.usuario.nombre}`,
        id: cart.id
      }));
    } else {
      alert(result.error);
    }
  }

  // Load the details of the cart detail to be updated
  async loadCartDetail(id: number) {
    const result = await this.cartDetailService.getCartDetailById(id);
    if (result.status === 200) {
      this.form.patchValue({
        id_carrito: result.data?.id_carrito,
        id_producto: result.data?.id_producto,
        cantidad: result.data?.cantidad
      });
    } else {
      alert(result.error);
    }
  }

  // Submit the form to update the cart detail
  async onSubmit() {
    if (this.cartDetailId) {
      const updatedCartDetail: CartDetailAdd = {
        id_carrito: this.form.get('id_carrito')?.value,
        id_producto: this.form.get('id_producto')?.value,
        cantidad: this.form.get('cantidad')?.value
      };

      const result = await this.cartDetailService.updateCartDetail(this.cartDetailId, updatedCartDetail);
      if (result.status === 200) {
        this.router.navigateByUrl('admin/dashboard/cart-detail');
      } else {
        alert(result.error);
      }
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
