import { Component } from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import { AsideComponent } from '../aside/aside.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent,AsideComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
