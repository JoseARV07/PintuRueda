import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HerramientaAdd, HerramientaService } from '../../../services/herramientas/herramientas.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-herramienta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, CardModule, FileUploadModule, InputTextareaModule],
  templateUrl: './crear-herramienta.component.html',
  styleUrls: ['./crear-herramienta.component.css'],
  providers: [MessageService]
})
export class CrearHerramientaComponent implements OnInit {
  public form: FormGroup;
  public selectedImage: File | null = null;
  public imagePreview: string | null = null;  // For image preview

  constructor(
    private formBuilder: FormBuilder,
    private herramientaService: HerramientaService,
    private router: Router,
    private messageService: MessageService
  ) { 
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
      codigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

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
      const result = await this.herramientaService.createHerramienta(formData);
      if (result.status === 201) {
        this.router.navigateByUrl('admin/dashboard/herramientas');
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.error });
      }
    }else{
      alert("debe selecionar una imagen")
    }

 
  }

  onImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;  // Assign image URL for preview
      };
      reader.readAsDataURL(file);  // Read file as data URL
    }
  }

  cancel() {
    this.router.navigateByUrl('admin/dashboard/herramientas');
  }

  get nombre() { return this.form.get('nombre'); }
  get categoria() { return this.form.get('categoria'); }
  get precio() { return this.form.get('precio'); }
  get stock() { return this.form.get('stock'); }
  get descripcion() { return this.form.get('descripcion'); }
  get codigo() { return this.form.get('codigo'); }
}
