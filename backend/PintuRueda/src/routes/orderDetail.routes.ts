import { Router } from 'express';
import { OrderDetailController } from '../controllers/orderDetail.controller';

export class OrderDetailRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', OrderDetailController.create);
        this.router.get('/', OrderDetailController.getAll);
        this.router.get('/:id', OrderDetailController.getById);
        this.router.put('/:id', OrderDetailController.update);
        this.router.delete('/:id', OrderDetailController.delete);
    }
}
