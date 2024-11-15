import { Injectable } from '@angular/core';
import Api from '../axios';
import { Observable, of } from 'rxjs';

export interface PinturaGet {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo_producto: 'pintura' | 'herramienta';
  fecha_agregado: Date;
  codigo: string;
}

export type PinturaAdd = Omit<PinturaGet, 'id'|'imagen'>;

@Injectable({
  providedIn: 'root'
})
export class PinturaService {
  constructor() {}

  async createPintura(pinturaData: FormData): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.post('/products/', pinturaData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Ensure proper headers for file upload
        }
      });
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al crear pintura:', error);
      return { status: 500, error };
    }
  }
  

  async getAllPinturas(): Promise<{ data: PinturaGet[], status: number, error: any }> {
    try {
      const response = await Api.get('/products?tipo_producto=pintura');
      return { data: response.data as PinturaGet[], status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener todas las pinturas:', error);
      return { data: [], status: 500, error };
    }
  }

  async getPinturaById(id: number): Promise<{ data: PinturaGet | null, status: number, error: any }> {
    try {
      const response = await Api.get(`/products/${id}`);
      return { data: response.data as PinturaGet, status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener pintura por ID:', error);
      return { data: null, status: 500, error };
    }
  }

  async updatePintura(id: number, pinturaData: FormData): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.put(`/products/${id}`, pinturaData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Ensure proper headers for file upload
        }
      });
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al actualizar pintura:', error);
      return { status: 500, error };
    }
  }

  async deletePintura(id: number): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.delete(`/products/${id}`);
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al eliminar pintura:', error);
      return { status: 500, error };
    }
  }
  getPinturas(): Observable<PinturaGet[]> {
    return of([]);
  }
}
