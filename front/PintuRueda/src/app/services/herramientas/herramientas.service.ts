import { Injectable } from '@angular/core';
import Api from '../axios';
import { Observable, of } from 'rxjs';

export interface HerramientaGet {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo_producto: 'herramienta' | 'pintura';
  fecha_agregado: Date;
  codigo: string;
}

export type HerramientaAdd = Omit<HerramientaGet, 'id'|'imagen'>;

@Injectable({
  providedIn: 'root'
})
export class HerramientaService {
  constructor() {}

  // Crear herramienta con FormData (para manejo de archivos)
  async createHerramienta(herramientaData: FormData): Promise<{ status: number, error: any }> {
    try {
      console.log('====================================');
      console.log({nombre:herramientaData.get('nombre'),
        categoria:herramientaData.get('categoria'),
        imagen:herramientaData.get('image'),
      });
      console.log('====================================');
      const response = await Api.post('/products/', herramientaData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al crear herramienta:', error);
      return { status: 500, error };
    }
  }

  // Obtener todas las herramientas
  async getAllHerramientas(): Promise<{ data: HerramientaGet[], status: number, error: any }> {
    try {
      const response = await Api.get('/products?tipo_producto=herramienta');
      return { data: response.data as HerramientaGet[], status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener todas las herramientas:', error);
      return { data: [], status: 500, error };
    }
  }

  // Obtener herramienta por ID
  async getHerramientaById(id: number): Promise<{ data: HerramientaGet | null, status: number, error: any }> {
    try {
      const response = await Api.get(`/products/${id}`);
      return { data: response.data as HerramientaGet, status: response.status, error: null };
    } catch (error) {
      console.error('Error al obtener herramienta por ID:', error);
      return { data: null, status: 500, error };
    }
  }

  // Actualizar herramienta con FormData (para manejo de archivos)
  async updateHerramienta(id: number, herramientaData: FormData): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.put(`/products/${id}`, herramientaData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al actualizar herramienta:', error);
      return { status: 500, error };
    }
  }

  // Eliminar herramienta por ID
  async deleteHerramienta(id: number): Promise<{ status: number, error: any }> {
    try {
      const response = await Api.delete(`/products/${id}`);
      return { status: response.status, error: null };
    } catch (error) {
      console.error('Error al eliminar herramienta:', error);
      return { status: 500, error };
    }
  }

  // Obtener herramientas (usado para carga inicial de la lista, puede devolver un Observable vacío)
  getHerramientas(): Observable<HerramientaGet[]> {
    return of([]);  // Se puede cambiar por una implementación real si es necesario
  }
}
