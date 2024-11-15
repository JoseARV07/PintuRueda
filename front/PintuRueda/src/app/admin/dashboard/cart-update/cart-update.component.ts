import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CartService, CartGet } from '../../../services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-actualizar-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, CardModule, ButtonModule],
  templateUrl: './cart-update.component.html',
  styleUrls: ['./cart-update.component.css']
})
export class ActualizarCartComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  users: { nombre: string, id: number }[] = [];
  estadoOptions = [
    { label: 'Activo', value: 'activo' },
    { label: 'Finalizado', value: 'finalizado' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      id_user: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadUsers();
    this.getCart(this.id);
  }

  async loadUsers() {
    const result = await this.userService.getAllUsers();
    if (result.status === 200) {
      this.users = result.data.filter(user => user.role !== 'admin').map(user => ({
        nombre: user.nombre,
        id: user.id
      }));
    } else {
      alert(result.error);
    }
  }

  async getCart(id: number) {
    const result = await this.cartService.getCartById(id);
    if (result.status === 200 && result.data) {
      this.form.setValue({
        id_user: result.data.id_user,
        estado: result.data.estado
      });
    } else {
      alert(result.error);
    }
  }

  async onSubmit() {
    const cartData = {
      id_user: this.form.get('id_user')?.value,
      estado: this.form.get('estado')?.value
    };
    
    const result = await this.cartService.updateCart(this.id, cartData);
    if (result.status === 200) {
      this.router.navigateByUrl('admin/dashboard/cart');
    } else {
      alert(result.error);
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/cart');
  }

  get id_user() { return this.form.get('id_user'); }
  get estado() { return this.form.get('estado'); }
}
