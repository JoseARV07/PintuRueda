import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';
import {ToastModule} from 'primeng/toast';
import { UserAdd, UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule,TreeSelectModule,DropdownModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent implements OnInit{
  rols = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: UserService,
    //private messageService: MessageService,

    private router: Router,
  ) { 
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  public form: FormGroup;

  ngOnInit(): void {}

  async onSubmit() {
    const user:UserAdd = {
      nombre: this.form.get('nombre')?.value,
      email: this.form.get('email')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value,
    }
    const result = await this.clienteService.createCliente(user);
    if (result.status === 201) {
      this.router.navigateByUrl('admin/dashboard/clientes');
    } else {
      alert(result.error);
      this.router.navigateByUrl('admin/dashboard/clientes');
    }
  }

  cancel(){
    this.router.navigateByUrl('admin/dashboard/clientes');
  }

  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get telefono() { return this.form.get('telefono'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get role() { return this.form.get('role')?.value; }
}