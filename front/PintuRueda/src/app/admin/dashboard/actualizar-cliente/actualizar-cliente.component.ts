import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { UserAdd, UserGet, UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule,DropdownModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css'
})
export class ActualizarClienteComponent implements OnInit{
  public id: number =0;
  rols = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' }
  ];
  
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: UserService,
    private route: ActivatedRoute,

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

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getCliente(this.id);
  }

  async getCliente(id:number){
    const response=await this.clienteService.getUserById(id);    
    this.form.setValue({
      nombre: response.data?.nombre,
      direccion: response.data?.direccion,
      telefono: response.data?.telefono,
      email: response.data?.email,
      password: response.data?.password,
      role: response.data?.role
    });
  }
  async onSubmit() {
    const user:UserAdd = {
      nombre: this.form.get('nombre')?.value,
      email: this.form.get('email')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value,
    }

    const result = await this.clienteService.updateCliente(user,this.id);
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