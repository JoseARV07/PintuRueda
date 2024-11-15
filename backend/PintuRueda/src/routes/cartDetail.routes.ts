import { Router } from 'express';
import { CartDetailController } from '../controllers/cartDetail.controller';

export class CartDetailRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', CartDetailController.create);
        this.router.get('/', CartDetailController.getAll);
        this.router.get('/:id', CartDetailController.getById);
        this.router.put('/:id', CartDetailController.update);
        this.router.delete('/:id', CartDetailController.delete);
    }
}
