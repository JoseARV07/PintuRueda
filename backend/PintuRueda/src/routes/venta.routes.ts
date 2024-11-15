import { Router } from 'express';
import { VentaController } from '../controllers/venta.controller'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

export class VentaRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', VentaController.create); // Crear venta
        this.router.get('/', VentaController.getAll); // Obtener todas las ventas
        this.router.get('/:id', VentaController.getById); // Obtener venta por ID
        this.router.put('/:id', VentaController.update); // Actualizar venta
        this.router.delete('/:id', VentaController.delete); // Eliminar venta
    }
}
