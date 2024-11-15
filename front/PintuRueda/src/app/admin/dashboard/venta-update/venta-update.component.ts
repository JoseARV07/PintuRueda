import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService, VentaAdd } from '../../../services/venta/venta.service';
import { UserService } from '../../../services/user/user.service';
import { PinturaService } from '../../../services/pinturas/pintura.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-venta-update',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    InputTextareaModule,
    DropdownModule],
  templateUrl: './venta-update.component.html',
  styleUrls: ['./venta-update.component.css'],
})
export class VentaUpdateComponent implements OnInit {
  public form: FormGroup;
  public users: { nombre: string; id: number }[] = [];
  public productos: { nombre: string; id: number; precio: number }[] = [];
  public precioTotal: number = 0;
  private ventaId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.ventaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUsers();
    this.loadProductos();
    this.loadVentaData();
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

  async loadVentaData() {
    const result = await this.ventaService.getVentaById(this.ventaId);
    if (result.status === 200) {
      const venta = result.venta;
      this.form.patchValue({
        id_user: venta?.id_user,
        id_producto: venta?.id_producto,
        cantidad: venta?.cantidad,
      });
      this.updatePrecioTotal();
    } else {
      alert(result.error);
    }
  }

  onProductoChange() {
    this.updatePrecioTotal();
  }

  updatePrecioTotal() {
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

    const result = await this.ventaService.updateVenta(this.ventaId, venta);
    if (result.status === 200) {
      this.router.navigateByUrl('admin/dashboard/ventas');
    } else {
      alert(result.error);
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/ventas');
  }
}
