import { Injectable } from '@angular/core';
import Api from '../axios';

export interface VentaGet {
  id: number;
  id_user: number;
  id_producto: number;
  cantidad: number;
  precioTotal: number;
}

export type VentaAdd = Omit<VentaGet, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() {}

  async createVenta(ventaData: VentaAdd): Promise<{ status: number, venta?: VentaGet, error?: any }> {
    try {
      const response = await Api.post('/sale', ventaData);
      return { status: response.status, venta: response.data };
    } catch (error) {
      console.error('Error al crear la venta:', error);
      return { status: 500, error };
    }
  }

  async getAllVentas(): Promise<{ status: number, ventas: VentaGet[], error?: any }> {
    try {
      const response = await Api.get('/sale');
      return { status: response.status, ventas: response.data as VentaGet[] };
    } catch (error) {
      console.error('Error al obtener todas las ventas:', error);
      return { status: 500, ventas: [], error };
    }
  }

  async getVentaById(id: number): Promise<{ status: number, venta?: VentaGet, error?: any }> {
    try {
      const response = await Api.get(`/sale/${id}`);
      return { status: response.status, venta: response.data as VentaGet };
    } catch (error) {
      console.error('Error al obtener venta por ID:', error);
      return { status: 500, error };
    }
  }

  async updateVenta(id: number, ventaData: VentaAdd): Promise<{ status: number, error?: any }> {
    try {
      const response = await Api.put(`/sale/${id}`, ventaData);
      return { status: response.status };
    } catch (error) {
      console.error('Error al actualizar venta:', error);
      return { status: 500, error };
    }
  }

  async deleteVenta(id: number): Promise<{ status: number, error?: any }> {
    try {
      const response = await Api.delete(`/sale/${id}`);
      return { status: response.status };
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      return { status: 500, error };
    }
  }
}
