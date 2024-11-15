import { Injectable } from '@angular/core';
import Api from '../axios';
import { Observable, of } from 'rxjs';

export interface CartDetailGet {
  id: number;
  id_carrito: number;
  id_producto: number;
  cantidad: number;
  subtotal: number;
  producto: { id: number; nombre: string; precio: number, imagen: string };  // Assuming Producto model has 'nombre' and 'precio'
  carrito: { id: number; id_user: number; estado: string };  // Assuming Carrito model has 'id_user' and 'estado'
}

export type CartDetailAdd = Omit<CartDetailGet, 'id' | 'subtotal' | 'producto' | 'carrito'>;

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  constructor() {}

  // Helper function to fetch the product price by id from backend
  private async getProductPrice(productId: number): Promise<number> {
    try {
      const response = await Api.get(`/products/${productId}`);
      return response.data?.precio || 0;  // Assuming product's price field is 'precio'
    } catch (error) {
      console.error('Error al obtener el precio del producto:', error);
      return 0; // Return 0 if there is an error fetching the price
    }
  }

  // Function to calculate the subtotal based on quantity and product price
  private calculateSubtotal(cantidad: number, productPrice: number): number {
    return cantidad * productPrice;
  }

  // Create a cart detail with calculated subtotal
  async createCartDetail(cartDetailData: CartDetailAdd): Promise<{ status: number, error: any }> {
    try {
      const productPrice = await this.getProductPrice(cartDetailData.id_producto);
      const subtotal = this.calculateSubtotal(cartDetailData.cantidad, productPrice);

      console.log({ ...cartDetailData, subtotal });
      

      const response = await Api.post('/cart-detail', { ...cartDetailData, subtotal });
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al crear detalle del carrito:', error);
      return { status: 500, error };
    }
  }

  // Get all cart details with associated product and cart data
  async getAllCartDetails(): Promise<{ data: CartDetailGet[], status: number, error: any }> {
    try {
      const response = await Api.get('/cart-detail');
      return { data: response.data as CartDetailGet[], status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener todos los detalles del carrito:', error);
      return { data: [], status: 500, error };
    }
  }

  // Get cart detail by ID
  async getCartDetailById(id: number): Promise<{ data: CartDetailGet | null, status: number, error: any }> {
    try {
      const response = await Api.get(`/cart-detail/${id}`);
      return { data: response.data as CartDetailGet, status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener detalle del carrito por ID:', error);
      return { data: null, status: 500, error };
    }
  }

  // Update a cart detail with recalculated subtotal
  async updateCartDetail(id: number, cartDetailData: CartDetailAdd): Promise<{ status: number, error: any }> {
    try {
      const productPrice = await this.getProductPrice(cartDetailData.id_producto);
      const subtotal = this.calculateSubtotal(cartDetailData.cantidad, productPrice);

      const response = await Api.put(`/cart-detail/${id}`, { ...cartDetailData, subtotal });
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al actualizar detalle del carrito:', error);
      return { status: 500, error };
    }
  }

  // Delete a cart detail
  async deleteCartDetail(id: number): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.delete(`/cart-detail/${id}`);
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al eliminar detalle del carrito:', error);
      return { status: 500, error };
    }
  }
}
