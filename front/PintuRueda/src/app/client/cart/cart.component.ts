import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartDetailGet, CartDetailService } from '../../services/cart-detail/cart-detail.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private cartDetailService: CartDetailService,private userService:UserService, private router: Router) { }
  cartData: CartDetailGet[] = [];
  ngOnInit(): void {
    this.mostrarDetallesCarrito();
  }

  async mostrarDetallesCarrito() {
    try {
      const response = await this.cartDetailService.getAllCartDetails();
      if(response.status===200){
        const user=await this.userService.profileUser();
        if(!user.authorized){
          const cart=(await this.cartService.getAllCarts()).data.filter(usuario=>usuario.id===user.user.id)[0];
          this.cartData = response.data.filter(carrito=>carrito.id_carrito==cart.id)
          console.log('====================================');
          console.log(this.cartData);
          console.log('====================================');
        }
      }

    } catch (error) {
      console.error('Error al obtener detalles del carrito:', error);
    }
  }

  
}
