import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HerramientaAdd, HerramientaService } from '../../../services/herramientas/herramientas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-actualizar-herramienta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, CardModule, FileUploadModule, InputTextareaModule],
  templateUrl: './actualizar-herramienta.component.html',
  styleUrls: ['./actualizar-herramienta.component.css'],
  providers: [MessageService]
})
export class ActualizarHerramientaComponent implements OnInit {
  public form: FormGroup;
  public id: number = 0;
  public selectedImage: File | null = null;
  public imageUrl: string | null = null; // To hold the current image URL for preview

  constructor(
    private formBuilder: FormBuilder,
    private herramientaService: HerramientaService,
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
    this.getHerramienta(this.id);
  }

  async getHerramienta(id: number) {
    const response = await this.herramientaService.getHerramientaById(id);
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
    const herramienta: HerramientaAdd = {
      nombre: this.form.get('nombre')?.value,
      categoria: this.form.get('categoria')?.value,
      precio: this.form.get('precio')?.value,
      stock: this.form.get('stock')?.value,
      descripcion: this.form.get('descripcion')?.value,
      codigo: this.form.get('codigo')?.value,
      tipo_producto: "herramienta",
      fecha_agregado: new Date(Date.now())
    };
    const formData = new FormData();
    formData.append('nombre', herramienta.nombre);
    formData.append('categoria', herramienta.categoria);
    formData.append('precio', herramienta.precio.toString());
    formData.append('stock', herramienta.stock.toString());
    formData.append('descripcion', herramienta.descripcion);
    formData.append('codigo', herramienta.codigo);
    formData.append('tipo_producto', herramienta.tipo_producto);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    const result = await this.herramientaService.updateHerramienta(this.id, formData);
    if (result.status === 200) {
      this.router.navigateByUrl('admin/dashboard/herramientas');
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: result.error });
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/herramientas');
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
