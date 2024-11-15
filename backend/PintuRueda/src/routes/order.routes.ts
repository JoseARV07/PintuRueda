import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

export class OrderRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', OrderController.create);
        this.router.get('/', OrderController.getAll);
        this.router.get('/:id', OrderController.getById);
        this.router.put('/:id', OrderController.update);
        this.router.delete('/:id', OrderController.delete);
    }
}
