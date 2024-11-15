import { Injectable } from '@angular/core';
import Api from '../axios';
import { Observable, of } from 'rxjs';

export interface CartGet {
  id: number;
  id_user: number;
  estado: string;
  usuario:{
    id: number;
    nombre: string;
    email: string;
  }
}

export type CartAdd = Omit<CartGet, 'id'| 'usuario'>;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  async createCart(cartData: CartAdd): Promise<{data: CartGet | null, status: number, error: any }> {
    try {
      const response = await Api.post('/cart', cartData);
      return { data: response.data as CartGet, status: response.status, error: null };
    } catch (error) {
      console.error('Error al crear carrito:', error);
      return {data: null, status: 500, error };
    }
  }

  async getAllCarts(): Promise<{ data: CartGet[], status: number, error: any }> {
    try {
      const response = await Api.get('/cart');
      return { data: response.data as CartGet[], status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener todos los carritos:', error);
      return { data: [], status: 500, error };
    }
  }

  async getCartById(id: number): Promise<{ data: CartGet | null, status: number, error: any }> {
    try {
      const response = await Api.get(`/cart/${id}`);
      return { data: response.data as CartGet, status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener carrito por ID:', error);
      return { data: null, status: 500, error };
    }
  }

  async updateCart(id: number, cartData: CartAdd): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.put(`/cart/${id}`, cartData);
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
      return { status: 500, error };
    }
  }

  async deleteCart(id: number): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.delete(`/cart/${id}`);
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al eliminar carrito:', error);
      return { status: 500, error };
    }
  }

  async findUserCart(id: number): Promise<{data: CartGet | null, status: number, error: any }> {
    try {
      const response = await Api.get(`/cart/user/${id}`);
      return {data: response.data.cart as CartGet, status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener carrito del usuario:', error);
      return {data: null, status: 500, error };
    }
  }
}
