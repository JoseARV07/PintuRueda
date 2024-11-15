import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { VentaService, VentaAdd } from '../../../services/venta/venta.service';
import { UserService, UserGet } from '../../../services/user/user.service';
import { PinturaService } from '../../../services/pinturas/pintura.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-venta-create',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    InputTextareaModule,
  DropdownModule],
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css'],
})
export class VentaCreateComponent implements OnInit {
  public form: FormGroup;
  public users: { nombre: string; id: number }[] = [];
  public productos: { nombre: string; id: number; precio: number }[] = [];
  public precioTotal: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ventaService: VentaService,
    private userService: UserService,
    private productoService: PinturaService
  ) {
    this.form = this.formBuilder.group({
      id_user: ['', [Validators.required]],
      id_producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProductos();
  }

  async loadUsers() {
    const result = await this.userService.getAllUsers();
    if (result.status === 200) {
      this.users = result.data.map((user) => ({
        nombre: user.nombre,
        id: user.id,
      }));
    } else {
      alert(result.error);
    }
  }

  async loadProductos() {
    const result = await this.productoService.getAllPinturas();
    if (result.status === 200) {
      this.productos = result.data.map((producto) => ({
        nombre: producto.nombre,
        id: producto.id,
        precio: producto.precio,
      }));
    } else {
      alert(result.error);
    }
  }

  onProductoChange() {
    const selectedProductoId = this.form.get('id_producto')?.value;
    const cantidad = this.form.get('cantidad')?.value || 0;
    const producto = this.productos.find((p) => p.id === selectedProductoId);
    this.precioTotal = producto ? producto.precio * cantidad : 0;
  }

  async onSubmit() {
    const venta: VentaAdd = {
      id_user: this.form.get('id_user')?.value,
      id_producto: this.form.get('id_producto')?.value,
      cantidad: this.form.get('cantidad')?.value,
      precioTotal: this.precioTotal
    };

    const result = await this.ventaService.createVenta(venta);
    if (result.status === 201) {
      this.router.navigateByUrl('admin/dashboard/ventas');
    } else {
      alert(result.error);
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/ventas');
  }
}
