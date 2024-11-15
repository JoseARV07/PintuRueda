import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PinturaAdd, PinturaService } from '../../../services/pinturas/pintura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-actualizar-pintura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, CardModule, FileUploadModule,InputTextareaModule],
  templateUrl: './actualizar-pintura.component.html',
  styleUrls: ['./actualizar-pintura.component.css'],
  providers: [MessageService]
})
export class ActualizarPinturaComponent implements OnInit {
  public form: FormGroup;
  public id: number = 0;
  public selectedImage: File | null = null;
  public imageUrl: string | null = null; // To hold the current image URL for preview

  constructor(
    private formBuilder: FormBuilder,
    private pinturaService: PinturaService,
    private route: ActivatedRoute,
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
      imagen: [''] // For storing the image URL if needed for updates
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getPintura(this.id);
  }

  async getPintura(id: number) {
    const response = await this.pinturaService.getPinturaById(id);
    this.form.setValue({
      nombre: response.data?.nombre,
      categoria: response.data?.categoria,
      precio: response.data?.precio,
      stock: response.data?.stock,
      descripcion: response.data?.descripcion,
      imagen: response.data?.imagen, // Assuming the response includes the image URL
      codigo: response.data?.codigo
    });
    this.imageUrl = response.data?.imagen || null; // Set the image URL for preview
  }

  async onSubmit() {
    const pintura: PinturaAdd = {
      nombre: this.form.get('nombre')?.value,
      categoria: this.form.get('categoria')?.value,
      precio: this.form.get('precio')?.value,
      stock: this.form.get('stock')?.value,
      descripcion: this.form.get('descripcion')?.value,
      codigo: this.form.get('codigo')?.value,
      tipo_producto: "pintura",
      fecha_agregado: new Date(Date.now())
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
    }
    const result = await this.pinturaService.updatePintura(this.id, formData);
    if (result.status === 200) {
      this.router.navigateByUrl('admin/dashboard/pinturas');
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: result.error });
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/pinturas');
  }

  // Image upload handler (for preview)
  onImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.selectedImage = file;
      this.imageUrl = URL.createObjectURL(file); // Create an object URL for preview
    } else {
      console.log('No se seleccionó ninguna imagen');
    }
  }

  // Getters for easier access in the template
  get nombre() { return this.form.get('nombre'); }
  get categoria() { return this.form.get('categoria'); }
  get precio() { return this.form.get('precio'); }
  get stock() { return this.form.get('stock'); }
  get descripcion() { return this.form.get('descripcion'); }
  get codigo() { return this.form.get('codigo'); }
}
