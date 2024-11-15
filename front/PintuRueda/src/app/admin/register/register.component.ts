import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const result = await this.userService.registerUser({...this.signupForm.value,role:'admin'});
      if (result.status===201) {
        alert('Usuario registrado correctamente');
        this.signupForm.reset();
        window.location.href = '/admin/login';
      }else{
        alert('Error al registrar el usuario');
      }
    } else {
      console.log('Form is invalid');
      alert('Error al registrar el usuario');
    }
  }
}
