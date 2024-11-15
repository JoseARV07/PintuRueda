import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { CartDetailService } from '../../../services/cart-detail/cart-detail.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

interface productoI{
  id:number,
  nombre:string,
  imagen:string,
  precio:number
}
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  @Input() producto!: productoI;

  constructor(private serviceCart:CartService,private serviceDetalleCart:CartDetailService, private serviceUser:UserService, private router:Router){}

  async agregarAlCarrito(id:number){
    const res=await this.serviceUser.profileUser();
    if(res.authorized){
      const cart=await this.serviceCart.findUserCart(res.user.id);
      if(cart.status==201){
        console.log('====================================');
        console.log("ya tiene ");
        console.log('====================================');
        console.log(cart);
        
        const detalleRes = await this.serviceDetalleCart.createCartDetail({
          id_carrito: cart.data?.id ?? 0,
          id_producto: id,
          cantidad: 1
        });
        
        if(detalleRes.status==201){
          this.router.navigateByUrl("/cart")
        }
      }else{
        console.log('====================================');
        console.log("no tiene ");
        console.log('====================================');
        const cartRes=await this.serviceCart.createCart({id_user:res.user.id,estado:"activo"});
        console.log('====================================');
        console.log(cartRes);
        console.log('====================================');
        if(cartRes.status==201){
          const detalleRes = await this.serviceDetalleCart.createCartDetail({
            id_carrito: cartRes.data?.id ?? 0,
            id_producto: id,
            cantidad: 1
          });

          if(detalleRes.status==201){
            this.router.navigateByUrl("/cart")
          }
        }
        this.router.navigateByUrl("/cart")
      }
    }
  }
}