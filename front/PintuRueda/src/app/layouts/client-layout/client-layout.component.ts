import { Component } from '@angular/core';
import { FooterComponent } from '../../client/components/footer/footer.component';
import { HeaderComponent } from '../../client/components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

  constructor(private router: Router) {}

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    return !currentRoute.includes('login') && !currentRoute.includes('signup');
  }
}
