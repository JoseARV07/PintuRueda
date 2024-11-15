import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
interface UserGet {
  id: number
  nombre: string
  email: string
  password: string
  role: string
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  title = 'PintuRueda';
  user!:UserGet;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getProfile()
  }

  async getProfile(){
    const result = await this.userService.profileUser();
    if (result.authorized) {
      this.user = result.user;
    }
  }
}