import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const result = await this.userService.loginUser(this.loginForm.value);
      if (result.status === 200) {
        alert('Usuario logeado correctamente');
        this.loginForm.reset();
        window.location.href = '/admin/dashboard/manager';
      } else {
        alert('Error al registrar usuario');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
