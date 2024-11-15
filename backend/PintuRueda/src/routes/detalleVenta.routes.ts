import { Router } from 'express';
import { SaleDetailController } from '../controllers/detalleVenta.controller'; // Ajusta la ruta según tu estructura

export class SaleDetailRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', SaleDetailController.create);
        this.router.get('/', SaleDetailController.getAll);
        this.router.get('/:id', SaleDetailController.getById);
        this.router.put('/:id', SaleDetailController.update);
        this.router.delete('/:id', SaleDetailController.delete);
    }
}
