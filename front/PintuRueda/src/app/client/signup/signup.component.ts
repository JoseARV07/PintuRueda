import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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
      const result = await this.userService.registerUser({...this.signupForm.value,role:'user'});
      if (result.status===201) {
        alert('Usuario registrado correctamente');
        this.signupForm.reset();
        window.location.href = '/login';
      }else{
        alert('Error al registrar el usuario');
      }
    } else {
      console.log('Form is invalid');
      alert('Error al registrar el usuario');
    }
  }
}
