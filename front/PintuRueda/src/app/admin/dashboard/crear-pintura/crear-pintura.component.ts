import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  PinturaAdd,
  PinturaService,
} from '../../../services/pinturas/pintura.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-crear-pintura',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    InputTextareaModule,
  ],
  templateUrl: './crear-pintura.component.html',
  styleUrls: ['./crear-pintura.component.css'],
  providers: [MessageService],
})
export class CrearPinturaComponent implements OnInit {
  public form: FormGroup;
  public selectedImage: File | null = null;
  public imagePreview: string | null = null; // Para previsualizar la imagen

  constructor(
    private formBuilder: FormBuilder,
    private pinturaService: PinturaService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
      codigo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    const pintura: PinturaAdd = {
      nombre: this.form.get('nombre')?.value,
      categoria: this.form.get('categoria')?.value,
      precio: this.form.get('precio')?.value,
      stock: this.form.get('stock')?.value,
      descripcion: this.form.get('descripcion')?.value,
      codigo: this.form.get('codigo')?.value,
      tipo_producto: 'pintura',
      fecha_agregado: new Date(Date.now()),
    };

    const formData = new FormData();
    formData.append('nombre', pintura.nombre);
    formData.append('categoria', pintura.categoria);
    formData.append('precio', pintura.precio.toString());
    formData.append('stock', pintura.stock.toString());
    formData.append('descripcion', pintura.descripcion);
    formData.append('codigo', pintura.codigo);
    formData.append('tipo_producto', pintura.tipo_producto);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
      const result = await this.pinturaService.createPintura(formData);
      if (result.status === 201) {
        this.router.navigateByUrl('admin/dashboard/pinturas');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: result.error,
        });
      }
    }else{
      alert("Debe seleccionar una imagen");
    }
  }

  onImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Asigna la URL de la imagen cargada para previsualizar
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/pinturas');
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get categoria() {
    return this.form.get('categoria');
  }
  get precio() {
    return this.form.get('precio');
  }
  get stock() {
    return this.form.get('stock');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get codigo() {
    return this.form.get('codigo');
  }
}
