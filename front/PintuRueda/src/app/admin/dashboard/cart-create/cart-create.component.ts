import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { CartService, CartAdd } from '../../../services/cart/cart.service';
import { UserService, UserGet } from '../../../services/user/user.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-cart',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule,CardModule,ButtonModule],
  templateUrl: './cart-create.component.html',
  styleUrls: ['./cart-create.component.css']
})
export class CrearCartComponent implements OnInit {
  form: FormGroup;
  users: { nombre: string }[] = [];
  estadoOptions = [
    { label: 'Activo', value: 'activo' },
    { label: 'Finalizado', value: 'finalizado' }
  ];




  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      id_user: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    const result = await this.userService.getAllUsers();
    if (result.status === 200) {
      // Filtrar los usuarios que no son administradores
      this.users = result.data.filter(user => user.role !== 'admin').map(user => ({
        nombre: user.nombre,
        id: user.id
      }));
    } else {
      alert(result.error);
    }
  }

  async onSubmit() {
    const cartData: CartAdd = {
      id_user: this.form.get('id_user')?.value,
      estado: this.form.get('estado')?.value
    };

    const result = await this.cartService.createCart(cartData);
    if (result.status === 201) {
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
