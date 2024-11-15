import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api from '../axios';

export interface UserGet {
  id: number
  nombre: string
  email: string
  telefono: string
  direccion: string
  password: string
  role: string
}

export type UserAdd=Omit<UserGet, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async registerUser(user: UserAdd) {
    try {
      const response = await Api.post('/auth/register', user);
      return response;
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      throw error;
    }
  }

  async loginUser(user:{email: string, password: string}) {
    try {
      const response = await Api.post('/auth/login', user);
      return response;  
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      const response = await Api.get('/auth/logout');
      return response;  
    } catch (error) {
      console.error('Error cerrar sesión:', error);
      throw error;
    }
  }

  async profileUser():Promise<{authorized: boolean, message:string, user: UserGet }> {
    try {
      const response = await Api.get('/auth/profile');
      return response.data;  
    } catch (error) {
      console.error('Error obtener perfil:', error);
      throw error;
    }
  }


  async getAllUsers():Promise<{data: UserGet[],status: number, error: any}> {
    try {
      const response = await Api.get('/auth/');
      return {data: response.data.users as UserGet[], status: response.status, error: null};  
    } catch (error) {
      console.error('Error obtener todos los usuarios:', error);
      return {data: [], status: 500, error: error};
    }
  }

  async getUserById(id: number):Promise<{data: UserGet |null,status: number, error: any}> {
    try {
      const response = await Api.get(`/auth/${id}`);
      return {data: response.data.user as UserGet, status: response.status, error: null};  
    } catch (error) {
      console.error('Error obtener el usuario por ID:', error);
      return {data: null, status: 500, error: error};
    }
  }

  async deleteCliente(id: number):Promise<{status: number, error: any}> {
    try {
      const response = await Api.delete(`/auth/${id}`);
      return { status: response.status, error: null};  
    } catch (error) {
      console.error('Error borrar el usuario:', error);
      return { status: 500, error: error};
    }
  }

  async createCliente(user: UserAdd): Promise<{status: number, error: any}> {
    try {
      const response = await Api.post('/auth/', user);
      return { status: response.status, error: null};  
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return { status: 500, error: error};
    }
  }

  async updateCliente(user: UserAdd, id: number): Promise<{status: number, error: any}> {
    try {
      const response = await Api.put(`/auth/${id}`, user);
      return { status: response.status, error: null};  
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return { status: 500, error: error};
    }
  }
}
